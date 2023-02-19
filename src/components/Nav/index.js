import React from 'react';
import './index.scss';
import logo from '../../utils/images/logo.svg';
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className='navbar'>
      <div className='navbar__left'>
        <img src={logo} alt='lectogym-logo'/>
      </div>
      <div className='navbar__right'>
        {/* TODO: Update this section to show links based on auth status
            unAuthed: show login, and register
            authered: show dashboard, and logout
        */}
        <Link
          className='navbar__link'
          to="/"
          title="Home"
        >
          Home
        </Link>
        <Link
          className='navbar__link'
          to="/login"
          title="Login"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Nav;