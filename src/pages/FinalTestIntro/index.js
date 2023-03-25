import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import './index.scss';

import * as selectors from '../../redux/rootReducer';

const FinalTestIntro = ({
  authUser,
}) => {
  const history = useHistory();

  useEffect(() => {
    if (authUser.has_completed_final_test) {
      history.push("/results");
    }
  }, [authUser, history]);

  return (
    <Fragment>
      <div className="page-container--final-test-intro">
        <div className="final-test-intro">
          <h1 className="final-test-intro__title">
            Prueba de diagnóstico final
          </h1>
          <div className='final-test-intro__instructions-container'>
            <div className="final-test-intro__instructions-title">
              Instrucciones
            </div>
            <div className="final-test-intro__instructions">
              <p>¡Felicidades! Has completado el curso. Para este punto, tu capacidad de lectura y tu comprensión lectora 
                deberían ser mucho mejores que hace unas semanas.
              </p>
              <p>
                Ahora deberás realizar una prueba similar a la que hiciste cuando te registraste. 
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
              className="final-test-intro__next"
              to="/final-test-lecture"
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

export default connect(mapStateToProps, null)(FinalTestIntro);