import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import './index.scss';
import logo from '../../utils/images/logo.svg';

import * as authActions from '../../redux/actions/auth';
import * as selectors from '../../redux/rootReducer';

const Nav = ({
  authUser,
  onSignOut
}) => {
  return (
    <nav className='navbar'>
      <div className='navbar__left'>
        <Link
          className='navbar__link'
          to="/"
        >
          <img src={logo} alt='lectogym-logo' />
        </Link>
      </div>
      <div className='navbar__right'>
        {!authUser && (
          <Link
            className='navbar__link'
            to="/login"
          >
            Ingresar
          </Link>
        )}
        {!authUser && (
          <Link
            className='navbar__link'
            to="/signup"
          >
            Regístrate
          </Link>
        )}
        {authUser && (
          <Link
            className='navbar__link'
            to="/dashboard"
          >
            Dashboard
          </Link>
        )}
        {/* TODO: get rid of this before PR */}
        {authUser && (
          <Link
            className='navbar__link'
            to="/initial-test-intro"
          >
            Initial Test
          </Link>
        )}
        {authUser && (
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
  authUser: selectors.getAuthUser(state),
});

const mapDispatchToProps = dispatch => {
  return {
    onSignOut: () => dispatch(authActions.completeSignOut()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);