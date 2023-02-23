import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './index.scss'

import * as authActions from '../../redux/actions/auth';
import * as selectors from '../../redux/rootReducer';
import Footer from "../../components/Footer";

const SignUp = ({
  history,
  isLoading,
  error = null,
  isAuthenticated,
  onSubmit,
}) => {
  const [name, changeName] = useState('')
  const [email, changeEmail] = useState('');
  const [password, changePassword] = useState('');
  const [passwordConfirmation, changePasswordConfirmation] = useState('');
  const passwordMismatch = password !== passwordConfirmation;

  const handleOnNameChange = (event) => {
    event.target.setCustomValidity((event.target.value !== '') ? '' : 'Por favor llena este campo');

    changeName(event.target.value)
  };

  const handleOnEmailChange = (event) => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (event.target.value === ''){
      event.target.setCustomValidity((event.target.value !== '') ? '' : 'Por favor llena este campo');
    } else if (event.target.value) {
      event.target.setCustomValidity((regex.test(event.target.value)) ? '' : 'Por favor ingresa un email')
    }
   
    changeEmail(event.target.value)
  };

  const handleOnPasswordChange = (event) => {
    const regex =  new RegExp(new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$'));

    if (event.target.value === ''){
      event.target.setCustomValidity((event.target.value !== '') ? '' : 'Por favor llena este campo');
    } else if (event.target.value) {
      event.target.setCustomValidity((regex.test(event.target.value)) ? '' : 'La contraseña debe contener una letra, un número, y tener al menos 8 caracteres')
    }
   
    changePassword(event.target.value)
  };

  const handleOnPasswordConfirmationChange = (event) => {
    event.target.setCustomValidity((event.target.value !== '') ? '' : 'Por favor llena este campo');

    changePasswordConfirmation(event.target.value)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ name, email, password, passwordConfirmation });
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/tutorial");
    }
  }, [isAuthenticated, history]);

  return (
    <Fragment>
      <div className="page-container">
        <div className="signup">
          <div className="signup__form-container">
            <h1 className="signup__title">
              Regístrate en LectoGym
            </h1>
            <form onSubmit={handleSubmit} className="signup__form">
              <div className="signup__field-container">
                <input
                  required
                  placeholder="Nombre"
                  className="signup__input"
                  type="text"
                  onChange={(event) => handleOnNameChange(event)}
                />
              </div>
              <div className="signup__field-container">
                <input
                  required
                  placeholder="Correo electrónico"
                  className="signup__input"
                  type="email"
                  onChange={(event) => handleOnEmailChange(event)}
                />
              </div>
              <div className="signup__field-container">
                <input
                  required
                  placeholder="Contraseña"
                  className="signup__input"
                  type="password"
                  onChange={(event) => handleOnPasswordChange(event)}
                />
              </div>
              <div className="signup__field-container">
                <input
                  required
                  placeholder="Confirmar contraseña"
                  className="signup__input"
                  type="password"
                  onChange={(event) => handleOnPasswordConfirmationChange(event)}
                />
              </div>
              {
                (passwordMismatch) && (
                  <div className="signup__error-message">
                    {'Las contraseñas deben coincidir'}
                  </div>
                )
              }
              {error && (
                  <div className="signup__error-message">
                    {'Ha ocurrido un error, intenta de nuevo'}
                  </div>
                ) 
              }
              <button
                disabled={(passwordMismatch)}
                className="signup__button"
                type="submit"
              >
                {(isLoading === true) ? '...' : 'Registrarse'}
              </button>
            </form>
            <div className="signup__question">
              ¿Ya tienes una cuenta?
            </div>
            <Link
              className="signup__link"
              to="/login"
              title="Signin"
            >
              Ingresar
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isLoading: selectors.getIsAuthenticating(state),
  error: selectors.getAuthenticatingError(state),
  isAuthenticated: selectors.isAuthenticated(state),
});

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (authUser) => dispatch(authActions.startSignUp(authUser)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));
