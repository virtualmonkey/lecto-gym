import React, { Fragment } from 'react';
import './index.scss';

const Footer = () => (
  <Fragment>
    <footer className="footer" data-test="footer">
      <small className="footer__text" data-test="footer-text">
        © 2023 <b>LectoGym</b>. Todos los derechos reservados.
      </small>
    </footer>
  </Fragment>
);

export default Footer;