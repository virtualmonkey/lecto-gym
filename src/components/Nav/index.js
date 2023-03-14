import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import './index.scss';
import logo from '../../utils/images/logo.svg';

import * as authActions from '../../redux/actions/auth';
import * as selectors from '../../redux/rootReducer';


const Nav = ({
  isAuthenticated,
  authUser,
  onSignOut
}) => {
  const canAccessDashboard = isAuthenticated && authUser && (authUser.has_completed_initial_test && authUser.has_completed_tutorial);
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
        { canAccessDashboard && (
            <Link
              className='navbar__link'
              to="/dashboard"
            >
              Dashboard
            </Link>
          )}
        {/* TODO: get rid of this before PR */}
        {isAuthenticated && (
          <Link
            className='navbar__link'
            to="/initial-test-intro"
          >
            Initial Test
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