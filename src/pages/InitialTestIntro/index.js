import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import './index.scss';

import * as selectors from '../../redux/rootReducer';

const InitialTestIntro = ({
  authUser,
}) => {
  const history = useHistory();

  useEffect(() => {
    if (authUser.has_completed_initial_test) {
      history.push("/dashboard");
    }
  }, [authUser, history]);

  return (
    <Fragment>
      <div className="page-container--initial-test-intro">
        <div className="initial-test-intro">
          <h1 className="initial-test-intro__title">
            Prueba de diagnóstico
          </h1>
          <div className='initial-test-intro__instructions-container'>
            <div className="initial-test-intro__instructions-title">
              Instrucciones
            </div>
            <div className="initial-test-intro__instructions">
              <p> Para poder mejorar tu capacidad de lectura y comprensión lectora, primero debemos saber
                en qué nivel te encuentras actualmente. Para ello deberás realizar una breve prueba de diagnóstico.
              </p>
              <p>
                A continuación se te presentará una lectura corta. Una vez que la completes se te harán algunas preguntas
                de opción múltiple respecto a ella. Finalmente, se te mostrarán tus resultados.
              </p>
              <p>
                Haz click en el botón de abajo cuando estés listo(a).
              </p>
            </div>
            <hr></hr>
            <Link
              className="initial-test-intro__next"
              to="/initial-test-lecture"
            >
              Empezar lectura
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  authUser: selectors.getAuthUser(state),
});

export default connect(mapStateToProps, null)(InitialTestIntro);