import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import './index.scss';
import logo from '../../utils/images/logo.svg';

import * as authActions from '../../redux/auth/auth.actions';
import * as selectors from '../../redux/rootReducer';

// TODO: show link to final-test-intro when user can access it, and make sure it's gone when authUser.has_completed_final_test = true
const Nav = ({
  isAuthenticated,
  authUser,
  onSignOut
}) => {
  const canAccessDashboard = isAuthenticated && authUser && (authUser.has_completed_initial_test && authUser.has_completed_tutorial);
  const canAccessResults = isAuthenticated && authUser && authUser.has_completed_final_test === true;
  return (
    <nav className='navbar'>
      <div className='navbar__left'>
        <Link
          className='navbar__link'
          to={(canAccessDashboard) ? "/dashboard" : "/"}
        >
          <img src={logo} alt='lectogym-logo' />
        </Link>
      </div>
      <div className='navbar__right'>
        {!isAuthenticated && (
          <Link
            className='navbar__link'
            to="/login"
          >
            Ingresar
          </Link>
        )}
        {!isAuthenticated && (
          <Link
            className='navbar__link'
            to="/signup"
          >
            Regístrate
          </Link>
        )}
        {canAccessDashboard && (
            <Link
              className='navbar__link'
              to="/dashboard"
            >
              Dashboard
            </Link>
          )}
        {canAccessResults && (
          <Link
            className='navbar__link'
            to="/results"
          >
            Ver resultados
          </Link>
        )}
        {isAuthenticated && (
          <Link
            className='navbar__link'
            to="/final-test-intro"
          >
            Take Final Test
          </Link>
        )}
        {isAuthenticated && (
          <Link
            className='navbar__link navbar__link--warning'
            to="/"
            onClick={() => onSignOut()}
          >
            Cerrar sesión
          </Link>
        )}
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: selectors.isAuthenticated(state),
  authUser: selectors.getAuthUser(state),
});

const mapDispatchToProps = dispatch => ({
  onSignOut: () => dispatch(authActions.completeSignOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);