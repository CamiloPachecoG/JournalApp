import React, { useEffect, useState } from 'react';
import {
    HashRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';

import { firebase } from '../firebase/firebase-config';

import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadNotes } from '../actions/notes';
import { LoadingPage } from '../components/auth/LoadingPage';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [ checking, setChecking ] = useState(true);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    //para mantener el uid, onAuth.. es un observador que estara pendiente si esta autenticado
    useEffect(() => {
        firebase.auth().onAuthStateChanged( ( user ) => {

            //Si el obj user tiene algo? pregunta si existe el uid
            if ( user?.uid ){
                dispatch( login( user.uid, user.displayName, user.photoURL ) );
                setIsLoggedIn( true );

                dispatch( startLoadNotes( user.uid ) );
            } else {
                setIsLoggedIn( false );
            }

            setChecking( false );

        })
    }, [ dispatch, setChecking, setIsLoggedIn ])

    if ( checking ) {
        return (
            //<h1> Wait...</h1> //Hacer comoponente de loading
            <LoadingPage />
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        isAuthenticated ={ isLoggedIn }
                        path="/auth"
                        component={ AuthRouter }
                    />

                    <PrivateRoute
                        exact
                        isAuthenticated ={ isLoggedIn }
                        path="/"
                        component={ JournalScreen }
                    />

                    <Redirect to="/auth/login" />

                </Switch>
            </div>
        </Router>
        
    )
}
