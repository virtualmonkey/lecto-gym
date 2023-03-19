import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import './index.scss';

import * as testsActions from '../../redux/tests/tests.actions';
import * as selectors from '../../redux/rootReducer';

const Tutorial = ({
  authUser,
  submitTutorialError,
  submitTutorial
}) => {
  const history = useHistory();

  useEffect(() => {
    if (authUser !== null) {
      if (authUser.has_completed_tutorial) {
        history.push("/initial-test-intro");
      }
    }
  }, [authUser, history]);

  return (
    <Fragment>
      <div className="page-container--tutorial">
        <div className="tutorial">
          <h1 className="tutorial__title">
            Bienvenido a LectoGym
          </h1>
          <div className='tutorial__instructions-container'>
            <div className="tutorial__instructions-title">
              Video tutorial
            </div>
            <div className="tutorial__instructions">
              <p>
                Por favor ve el vídeo de abajo antes de continuar, este te servirá para familiarizarte con la aplicación,
                entender cómo funciona, y descubrir su propósito.
              </p>
              <p>
                Haz click en el botón de abajo cuando termines de ver el video.
              </p>
            </div>
            <iframe
              className="tutorial__video"
              width="560"
              height="315"
              src="https://www.youtube.com/embed/ScMzIvxBSi4"
              title="YouTube video player"
              allowFullScreen>
            </iframe>
            <hr></hr>
            {submitTutorialError && (
              <div className="tutorial__error-message">
                Error al subir las respuestas, por favor intenta de nuevo
              </div>
            )}
            <button
              className="tutorial__next"
              onClick={() => submitTutorial()}
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  authUser: selectors.getAuthUser(state),
  submitTutorialError: selectors.getSumbitTutorialError(state)
});

const mapDispatchToProps = (dispatch) => ({
  submitTutorial: () => dispatch(testsActions.startSubmitTutorial())
});

export default connect(mapStateToProps, mapDispatchToProps)(Tutorial);;