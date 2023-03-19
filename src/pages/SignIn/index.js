import React, { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import './index.scss'

import * as authActions from '../../redux/auth/auth.actions';
import * as selectors from '../../redux/rootReducer';
import Footer from "../../components/Footer";

const SignIn = ({
  isLoading,
  error = null,
  authUser,
  signInUser,
}) => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => signInUser(data);

  useEffect(() => {
    if (authUser) {
      // TODO: logic to show final-test-intro
      if (!authUser.has_completed_tutorial) history.push('/tutorial');
      else if (!authUser.has_completed_initial_test) history.push('/initial-test-intro');
      else history.push('/dashboard');
    }
  }, [authUser, history]);

  return (
    <Fragment>
      <div className="page-container--signin">
        <div className="signin">
          {error && (
            <div className="signin__error-message">
              {'Ha ocurrido un error, por favor intenta de nuevo'}
            </div>
          )
          }
          <div className="signin__form-container">
            <h1 className="signin__title">
              Ingresa a LectoGym
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="signin__form">
              <div className="signin__field-container">
                <input
                  {...register("email", {
                    required: true,
                    pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                  })}
                  placeholder="Correo electrónico"
                  className="signin__input signin__input--first"
                  type="text"
                />
                {errors.email?.type === "required" && (
                  <div className="signin__input-error">
                    Por favor llena este campo
                  </div>
                )
                }
                {errors.email?.type === "pattern" && (
                  <div className="signin__input-error">
                    Por favor ingresa un email válido
                  </div>
                )
                }
              </div>
              <div className="signin__field-container">
                <input
                  {...register('password', { required: true })}
                  placeholder="Contraseña"
                  className="signin__input"
                  type="password"
                />
                {errors.password?.type === "required" && (
                  <div className="signin__input-error">
                    Por favor llena este campo
                  </div>
                )}
              </div>
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

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  isLoading: selectors.getIsAuthenticating(state),
  error: selectors.getAuthenticatingError(state),
  authUser: selectors.getAuthUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  signInUser: (authUser) => dispatch(authActions.startSignIn(authUser))
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));