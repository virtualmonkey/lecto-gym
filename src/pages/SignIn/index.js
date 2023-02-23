import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';
import './index.scss'

import * as authActions from '../../redux/actions/auth';
import * as selectors from '../../redux/rootReducer';
import Footer from "../../components/Footer";

const SignIn = ({
  history,
  isLoading,
  error = null,
  isAuthenticated,
  onSubmit,
}) => {
  const [email, changeEmail] = useState("");
  const [password, changePassword] = useState("");

  const handleOnEmailChange = (event) => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (event.target.value === ''){
      event.target.setCustomValidity((event.target.value !== '') ? '' : 'Por favor llena este campo');
    } else if (event.target.value) {
      event.target.setCustomValidity((regex.test(event.target.value)) ? '' : 'Por favor ingresa un email')
    }
   
    changeEmail(event.target.value);
  };

  const handleOnPasswordChange = (event) => {
    if (event.target.value === ''){
      event.target.setCustomValidity((event.target.value !== '') ? '' : 'Por favor llena este campo');
    }
   
    changePassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ email, password });
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/dashboard");
    }
  }, [isAuthenticated, history]);

  return (
    <Fragment>
      <div className="page-container">
        <div className="signin">
          <div className="signin__form-container">
            <h1 className="signin__title">
              Ingresa a LectoGym
            </h1>
            <form onSubmit={handleSubmit} className="signin__form">
              <div className="signin__field-container">
                <input
                  placeholder="Correo electrónico"
                  className="signin__input"
                  type="email"
                  onChange={(event) => handleOnEmailChange(event)}
                />
              </div>
              <div className="signin__field-container">
                <input
                  placeholder="Contraseña"
                  className="signin__input"
                  type="password"
                  onChange={(event) => handleOnPasswordChange(event)}
                />
              </div>
              {error && (
                <div className="signin__error-message">
                  {'Ha ocurrido un error, intenta de nuevo'}
                </div>
              )
              }
              <button
                className="signin__button"
                type="submit"
              >
                {(isLoading === true) ? '...' : 'Ingresar'}
              </button>
            </form>
            <div className="signin__question">
              ¿Aún no tienes una cuenta?
            </div>
            <Link
              className="signin__link"
              to="/signup"
              title="Signup"
            >
              Crear una cuenta
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
    onSubmit: (authUser) => dispatch(authActions.startSignIn(authUser))
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));