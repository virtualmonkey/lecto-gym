import React, { Fragment, useEffect } from 'react';
import { useForm } from "react-hook-form";
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
  signUpUser,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  const onSubmit = (data) => signUpUser(data);

  const passwordValue = watch('password');
  const passwordConfirmationValue = watch('passwordConfirmation');

  const passwordMismatch = passwordValue !== passwordConfirmationValue;

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/tutorial");
    }
  }, [isAuthenticated, history]);

  return (
    <Fragment>
      <div className="page-container">
        <div className="signup">
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
          <div className="signup__form-container">
            <h1 className="signup__title">
              Regístrate en LectoGym
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="signup__form">
              <div className="signup__field-container">
                <input
                  {...register("name", {
                    required: true,
                  })}
                  placeholder="Nombre"
                  className="signup__input signin__input--first"
                  type="text"
                />
                {errors.name?.type === "required" && (
                  <div className="signin__input-error">
                    Por favor llena este campo
                  </div>
                )
                }
              </div>
              <div className="signup__field-container">
                <input
                  {...register("email", {
                    required: true,
                    pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                  })}
                  placeholder="Correo electrónico"
                  className="signup__input"
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
              <div className="signup__field-container">
                <input
                  {...register("password", {
                    required: true,
                    minLength: 8,
                    pattern: /^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$/,
                  })}
                  placeholder="Contraseña"
                  className="signup__input"
                  type="password"
                />
                {(
                    (errors.password?.type === "pattern" || 
                    errors.password?.type === "minLength") ||
                    errors.password?.type === "required"
                  ) && (
                  <div className="signin__input-error">
                    La contraseña debe contener una letra, un número, y tener al menos 8 caracteres
                  </div>
                )
                }
              </div>
              <div className="signup__field-container">
                <input
                  {...register("passwordConfirmation", {
                    required: true,
                  })}
                  placeholder="Confirmar contraseña"
                  className="signup__input"
                  type="password"
                />
                {errors.passwordConfirmation?.type === "required" && (
                  <div className="signin__input-error">
                    Por favor llena este campo
                  </div>
                )
                }
              </div>
              <button
                disabled={passwordMismatch}
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

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  isLoading: selectors.getIsAuthenticating(state),
  error: selectors.getAuthenticatingError(state),
  isAuthenticated: selectors.isAuthenticated(state),
});

const mapDispatchToProps = (dispatch) => {
  return {
    signUpUser: (authUser) => dispatch(authActions.startSignUp(authUser)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));
