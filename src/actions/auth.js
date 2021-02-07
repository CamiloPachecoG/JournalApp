import Swal from 'sweetalert2';

import { facebookAuthProvider, firebase, googleAuthProvider } from '../firebase/firebase-config';
import { types } from '../types/types';
import { noteLogout } from './notes';
import { finishLoading, starLoading } from './ui';

export const startLoginEmailPassword = ( email, password ) => {
    return (dispatch) => {

        dispatch( starLoading() ); // true

        firebase.auth().signInWithEmailAndPassword( email, password )
            .then( ( { user } ) => {
                dispatch( login( user.uid, user.displayName ) );
                dispatch( finishLoading() ); // false
            })
            .catch( e => {
                //console.log(e);
                dispatch( finishLoading() ); // false
                Swal.fire('error', e.message, 'error');
            })
    }
}

export const startRegisterEmailPassword = ( email, password, name ) => {
    return (dispatch) => {

        dispatch( starLoading() ); // true

        firebase.auth().createUserWithEmailAndPassword( email, password )
            .then( async( { user } ) => {

                await user.updateProfile({ displayName: name});
                dispatch( login( user.uid, user.displayName ) );
                dispatch( finishLoading() ); // false
            })
            .catch( e => {
                //console.log(e);
                dispatch( finishLoading() ); // false
                Swal.fire('error', e.message, 'error');
            })
    }
}

export const startGoogleLogin = () => {
    return (dispatch) => {
        
        firebase.auth().signInWithPopup( googleAuthProvider )
            .then( ( { user } ) => {
                dispatch( login( user.uid, user.displayName, user.photoURL ) );
            })
            .catch( e => {
                //console.log(e);
                Swal.fire('error', e.message, 'error');
            })
    }
}

export const startFacebookLogin = () => {
    return (dispatch) => {
        
        firebase.auth().signInWithPopup( facebookAuthProvider )
            .then( ( { user } ) => {
                dispatch( login( user.uid, user.displayName ) );
            })
            .catch( e => {
                //console.log(e);
                Swal.fire('error', e.message, 'error');
            })
    }
}

export const login = (uid, displayName, photoURL) => ({
    type: types.login,
    payload: {
        uid,
        displayName,
        photoURL
    }
});

export const startLogout = () => {
    return async( dispatch ) => {
        await firebase.auth().signOut();

        dispatch( logout() );
        dispatch( noteLogout() );
    }
}

export const logout = () => ({
    type: types.logout
});


// FALTA HACER FUNCIONAR EL FACEBOOK LOGIN Y SI LA PERSONA NO SUBE IMAGEN EN EL DIARIO TENER UNA DEFAULT NO_IMAGE
// CENTRAR EL NOMBRE Y LA IMAGEN DE GOOGLE LOGIN EN EL NAVBAR
// HACER LA PAGINA RESPONSIVE ?