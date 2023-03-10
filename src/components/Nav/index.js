import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import './index.scss';
import logo from '../../utils/images/logo.svg';

import * as authActions from '../../redux/actions/auth';
import * as selectors from '../../redux/rootReducer';

const Nav = ({
  isAuthenticated,
  onSignOut
}) => {
  return (
    <nav className='navbar'>
      <div className='navbar__left'>
        <Link
          className='navbar__link'
          to="/"
          title="Home"
        >
          <img src={logo} alt='lectogym-logo' />
        </Link>
      </div>
      <div className='navbar__right'>
        {!isAuthenticated && (
          <Link
            className='navbar__link'
            to="/login"
            title="Login"
          >
            Ingresar
          </Link>
        )}
        {!isAuthenticated && (
          <Link
            className='navbar__link'
            to="/signup"
            title="SignUp"
          >
            Regístrate
          </Link>
        )}
        {isAuthenticated && (
          <Link
            className='navbar__link'
            to="/dashboard"
            title="Dashboard"
          >
            Dashboard
          </Link>
        )}
        {isAuthenticated && (
          <Link
            className='navbar__link navbar__link--warning'
            to="/"
            title="Sign Out"
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
});

const mapDispatchToProps = dispatch => {
  return {
    onSignOut: () => dispatch(authActions.completeSignOut()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);