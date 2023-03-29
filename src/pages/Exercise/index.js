import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useParams, useHistory } from 'react-router-dom';
import Popup from 'reactjs-popup';
import './index.scss';

import {
  ITEM_TYPE_FOLLOW_ARROWS,
  ITEM_TYPE_SKIM_WORDS,
} from '../../utils/constants';
import { getInputLabelString } from '../../utils/functions';
import CountDownTimer from '../../components/CountDownTimer';
import StopWatch from '../../components/StopWatch';

import * as exerciseActions from '../../redux/exercise/exercise.actions';
import * as selectors from '../../redux/rootReducer';

const Exercise = ({
  currentExercise,
  fetchExerciseError,
  progressExerciseError,
  fetchExercise,
  progressExercise,
}) => {
  const { itemId, userItemId } = useParams();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const [timeExpired, setTimeExpired] = useState(undefined);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  useEffect(() => {
    fetchExercise(itemId);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (currentExercise?.isCompleted === true)
      history.push(`/week/${currentExercise.week}`);
    // eslint-disable-next-line
  }, [currentExercise]);

  useEffect(() => {
    setOpen(timeExpired)
  }, [timeExpired]);

  const time = new Date();
  time.setSeconds(time.getSeconds() + 60);

  const onSubmit = (data) => progressExercise(userItemId, parseInt(data.value));

  return (
    <Fragment>
      <Popup
        open={open}
        closeOnDocumentClick
        onClose={closeModal}
      >
        <div className="modal__container">
          <div className="modal__close" onClick={closeModal}>
            ×
          </div>
          <div className="modal__title">
            {
              (
                currentExercise?.type === ITEM_TYPE_FOLLOW_ARROWS 
                || currentExercise?.type === ITEM_TYPE_SKIM_WORDS
              ) ? '¡El tiempo se ha terminado!' : '¡Has detenido el tiempo!'
            }
          </div>
          <div className="modal__text">
            {
              (
                currentExercise?.type === ITEM_TYPE_FOLLOW_ARROWS 
                || currentExercise?.type === ITEM_TYPE_SKIM_WORDS
              ) ? 'Ingresa tu resultado en el campo de abajo' : 'Clickea en "Finalizar Ejercicio" para subir tu resultado'
            }
          </div>
          <button
            className='modal__next'
            onClick={closeModal}
          >
            Entendido
          </button>
        </div>
      </Popup>
      <div className="page-container--exercise">
        <div className="exercise">
          {fetchExerciseError && (
            <div className="exercise__error-message">
              Error al cargar ejercicio, por favor intenta de nuevo
            </div>
          )}
          {progressExerciseError && (
            <div className="exercise__error-message">
              Error al subir resultado, por favor intenta de nuevo
            </div>
          )}
          {currentExercise && (
            <>
              <h1 className="exercise__name">
                {currentExercise.name}
              </h1>
              <div className="exercise__instructions">
                <b>Instrucciones: </b> {currentExercise.instructions}
              </div>
              <div className="exercise__tools">
                <b>Herramientas: </b>{currentExercise.tools}
              </div>
              <div className="exercise__timer-container">
                {
                  (currentExercise.type === ITEM_TYPE_FOLLOW_ARROWS || currentExercise.type === ITEM_TYPE_SKIM_WORDS) ? (
                    <CountDownTimer
                      expiryTimestamp={time}
                      setTimeExpired={setTimeExpired}
                    />
                  ) : (
                    <StopWatch
                      setTimeExpired={setTimeExpired}
                      setElapsedTime={setElapsedTime}
                    />
                  )
                }
              </div>
              <img
                src={currentExercise.file_path}
                alt=''
              />
              <form onSubmit={handleSubmit(onSubmit)} className="exercise__form">
                <div className="exercise__answer">
                  <div className="exercise__input-label">
                    {getInputLabelString(currentExercise.type)}:
                  </div>
                  {(currentExercise.type === ITEM_TYPE_FOLLOW_ARROWS || currentExercise.type === ITEM_TYPE_SKIM_WORDS) ? (
                    <input
                      {...register('value', {
                        required: true,
                        pattern: /^\d+$/,
                      })}
                      placeholder="Resultado del ejercicio"
                      className="exercise__input"
                      type="text"
                    />
                  ) : (
                    <input
                      {...register('value', {})}
                      placeholder="Resultado del ejercicio"
                      className="exercise__input exercise__input--disabled"
                      type="text"
                      value={elapsedTime}
                    />
                  )}
                </div>
                {errors.value?.type === "required" && (
                  <div className="exercise__input-error">
                    Por favor llena este campo
                  </div>
                )
                }
                {errors.value?.type === "pattern" && (
                  <div className="exercise__input-error">
                    Por favor ingresa un número entero
                  </div>
                )
                }
                <button
                  className='exercise__submit'
                  disabled={!timeExpired}
                  type="submit"
                >
                  Finalizar Ejercicio
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  currentExercise: selectors.getExercise(state),
  fetchExerciseError: selectors.getFetchExerciseError(state),
  progressExerciseError: selectors.getProgressExerciseError(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchExercise: (id) => dispatch(exerciseActions.startFetchExercise(id)),
  progressExercise: (userItemId, value) => dispatch(exerciseActions.startProgressExercise(userItemId, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Exercise);