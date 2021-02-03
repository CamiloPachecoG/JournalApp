import React from 'react';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '../../hooks/useForm';
import { setError, removeError } from '../../actions/ui';
import { startRegisterEmailPassword } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();

    const { msgError } = useSelector( state => state.ui );

    const { loading } = useSelector( state => state.ui );

    const [ formValues, handleInputChange ] = useForm({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();

        if ( isFormValid() ){
            dispatch( startRegisterEmailPassword( email, password, name ) );
        }
        
    }

    const isFormValid = () => {

        if ( name.trim().length === 0 ) {
            dispatch( setError('Error: Name is required') );
            return false;

        } else if ( !validator.isEmail( email ) ) {
            dispatch( setError('Error: Email is not valid') );
            return false;

        } else if ( password !== password2 || password.length < 6 ) {
            dispatch( setError('Error: Password tiene que ser igual y tener mas de 5 caracteres') );
            return false;
        }

        dispatch( removeError() );
        return true;
    }

    return (
    
        <>
            <h3 className="auth__title">Register</h3>

            <form onSubmit={ handleRegister }>

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
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={ name }
                    onChange={ handleInputChange }
                />

                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input mt-1"
                    autoComplete="off"
                    value={ email }
                    onChange={ handleInputChange }
                />

                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input mt-1"
                    value={ password }
                    onChange={ handleInputChange }
                />

                <input 
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    className="auth__input mt-1"
                    value={ password2 }
                    onChange={ handleInputChange }
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5 mt-1"
                    disabled ={ loading }
                >
                    Register
                </button>
                

                <Link 
                    to="/auth/login"
                    className="link"
                >
                    Alredy registered?
                </Link>

            </form>
        </>
    )
}
