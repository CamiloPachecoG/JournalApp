import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import { setError, removeError } from '../../actions/ui';

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const { msgError } = useSelector( state => state.ui );

    const { loading } = useSelector( state => state.ui );

    const [ formValues, handleInputChange ] = useForm({
        email: 'prueba@gmail.com',
        password: '123Prueba'
    });

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        if ( isFormValid() ) {
            dispatch( startLoginEmailPassword( email, password ) );
        }
    }

    const handleGoogleLogin = () => {
        dispatch( startGoogleLogin() );
    }

    // const handleFacebookLogin = () => {
    //     dispatch( startFacebookLogin() );
    // }

    const isFormValid = () => {

        if ( email.length === 0 ) {
            dispatch( setError('Error: Email is required') );
            return false;

        } else if ( password.length === 0 ) {
            dispatch( setError('Error: Password is required') );
            return false;

        }
        dispatch( removeError() );
        return true;
    }

    return (
        <>
            <h3 className="auth__title">Sign In</h3>

            <form onSubmit={ handleLogin }>

                {
                    msgError &&
                    (
                        <div className="auth__alert-error">
                            { msgError } 
                        </div>
                    )

                }

                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value = { email }
                    onChange= { handleInputChange }
                />

                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input mt-1"
                    value = { password }
                    onChange= { handleInputChange }                
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={ loading }
                >
                    Sign In
                </button>
                
                <div className="auth__social-networks">
                    <p>Login with social networks</p>

                    <div 
                        className="google-btn"
                        onClick={ handleGoogleLogin }
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>

                    {/* <div 
                        className="facebook-btn"
                        onClick={ handleFacebookLogin }
                    >
                        <div className="facebook-icon-wrapper">
                            <img className="facebook-icon" src="https://upload.wikimedia.org/wikipedia/commons/c/c2/F_icon.svg" alt="facebook button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with Facebook</b>
                        </p>
                    </div> */}

                </div>

                <Link 
                    to="/auth/register"
                    className="link"
                >
                    Create new account
                </Link>

            </form>
        </>
    )
}
