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
  const [username, changeUsername] = useState("");
  const [password, changePassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ username, password });
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
                  type="text"
                  onChange={(event) => changeUsername(event.target.value)}
                />
              </div>
              <div className="signin__field-container">
                <input
                  placeholder="Contraseña"
                  className="signin__input"
                  type="password"
                  onChange={(event) => changePassword(event.target.value)}
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