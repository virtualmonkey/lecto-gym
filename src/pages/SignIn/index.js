import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';

import * as authActions from '../../redux/actions/auth';
import * as selectors from '../../redux/rootReducer';

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

  // TODO: update this route to the dashboard route
  useEffect(() => {
    if (isAuthenticated) {
      history.push("/dashboard");
    }
  }, [isAuthenticated, history]);

  return (
    <Fragment>
      <div className="page-container">
        <div className="signin">
          {/*  TODO: add logic to show error message */}
          <h1 className="signin__title">
            Ingresa a LectoGym
          </h1>
          <div className="signin__form-container">
            <form onSubmit={handleSubmit} className="signing__form">
              <div className="signin__field-container">
                <label className="signin__label">
                  Nombre de usuario
                </label>
                <input 
                  className="signing__input"
                  type="text"
                  onChange={(event) => changeUsername(event.target.value)}
                />
              </div>
              <div className="signin__field-container">
                <label className="signin__label">
                  Password
                </label>
                <input 
                  className="signing__input"
                  type="password"
                  onChange={(event) => changePassword(event.target.value)}
                />
              </div>
              <button 
                className="signing__button"
                type="submit"
              >
                Ingresar
              </button>
            </form>
          </div>
          <div className="signing__question">
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