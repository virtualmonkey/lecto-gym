import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { sum } from 'lodash';
import { useHistory } from "react-router-dom";
import './index.scss';

import Question from '../../components/Question';
import Radio from '../../components/Radio';

import * as testsActions from '../../redux/tests/tests.actions';
import * as selectors from '../../redux/rootReducer';

const LECTURE_WORD_COUNT = 451;

const InitialTestQuestions = ({
  authUser,
  elapsedTimeInSeconds,
  submitInitialTest,
  submitInitialTestError,
}) => {
  const history = useHistory();
  const [percentage, setPercentage] = useState(0.00);
  const [wordsPerMinute, setWordsPerMinute] = useState(0.00);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [questions, setQuestions] = useState([
    {
      questionName: 'question-1',
      text: "¿Para qué fue el campesino a la ciudad?",
      options: [
        { id: 0, text: "Entregar productos", isCorrect: false, selected: false },
        { id: 1, text: "Vender productos", isCorrect: true, selected: false },
        { id: 2, text: "Comprar productos", isCorrect: false, selected: false },
        { id: 3, text: "Entregar una encomienda", isCorrect: false, selected: false },
      ],
    },
    {
      questionName: 'question-2',
      text: "En aquella ciudad ¿Qué días había mercado?",
      options: [
        { id: 0, text: "Algunos días", isCorrect: false, selected: false },
        { id: 1, text: "No todos los días", isCorrect: true, selected: false },
        { id: 2, text: "Todos los días", isCorrect: false, selected: false },
        { id: 3, text: "Lunes y jueves", isCorrect: false, selected: false },
      ],
    },
    {
      questionName: 'question-3',
      text: "¿Qué comida pidió el campesino al posadero?",
      options: [
        { id: 0, text: "Café y pan", isCorrect: false, selected: false },
        { id: 1, text: "Agua y pan", isCorrect: false, selected: false },
        { id: 2, text: "Vino y queso", isCorrect: false, selected: false },
        { id: 3, text: "Vino y pan", isCorrect: true, selected: false },
      ],
    },
    {
      questionName: 'question-4',
      text: "El campesino quería que se le pagasen 3 cosas ¿Cuáles eran?",
      options: [
        { id: 0, text: "Vino, pan y carne", isCorrect: false, selected: false },
        { id: 1, text: "Agua, pan, y humo", isCorrect: false, selected: false },
        { id: 2, text: "Vino, pan, y humo", isCorrect: true, selected: false },
        { id: 3, text: "Vino, carne y humo", isCorrect: false, selected: false },
      ],
    },
    {
      questionName: 'question-5',
      text: "¿Por qué decía el posadero que el humo costaba dinero?",
      options: [
        { id: 0, text: "Porque el campesino hizo uso de él", isCorrect: false, selected: false },
        { id: 1, text: "Porque el humo olía a carne", isCorrect: false, selected: false },
        { id: 2, text: "Porque el humo era preciado ", isCorrect: false, selected: false },
        { id: 3, text: "Porque todo en ese lugar era suyo", isCorrect: true, selected: false },
      ],
    },
    {
      questionName: 'question-6',
      text: "¿Cuánto dinero ganó el campesino el día en que ocurre la historia?",
      options: [
        { id: 0, text: "5 monedas", isCorrect: false, selected: false },
        { id: 1, text: "2 monedas", isCorrect: false, selected: false },
        { id: 2, text: "4 monedas", isCorrect: true, selected: false },
        { id: 3, text: "3 monedas", isCorrect: false, selected: false },
      ],
    },
    {
      questionName: 'question-7',
      text: "¿Quién medió la discusión entre el campesino y el posadero?",
      options: [
        { id: 0, text: "Un noble", isCorrect: true, selected: false },
        { id: 1, text: "Un caballero", isCorrect: false, selected: false },
        { id: 2, text: "Un mercader", isCorrect: false, selected: false },
        { id: 3, text: "Un pescador", isCorrect: false, selected: false },
      ],
    },
    {
      questionName: 'question-8',
      text: "Al final se pagó el humo con...",
      options: [
        { id: 0, text: "4 monedas", isCorrect: false, selected: false },
        { id: 1, text: "Un sonido", isCorrect: false, selected: false },
        { id: 2, text: "El ruido", isCorrect: true, selected: false },
        { id: 3, text: "Dinero del noble", isCorrect: false, selected: false },
      ],
    },
    {
      questionName: 'question-9',
      text: "¿Cuál refrán crees que encaja mejor con la lectura?",
      options: [
        { id: 0, text: "La avaricia y la ambición, congelan al corazón.", isCorrect: true, selected: false },
        { id: 1, text: "La bolsa del tacaño miserable, solo el diablo la abre", isCorrect: false, selected: false },
      ],
    },
  ]);

  const onInputChange = ({ target }) => {
    const updatedQuestions = questions.map((question) => {
      if (question.questionName !== target.name) return question;
      return {
        ...question,
        options: question.options.map((opt) => {
          return {
            ...opt,
            selected: opt.id === parseInt(target.value),
          }
        })
      }
    })

    setQuestions(updatedQuestions);
  }

  const onClickNext = () => {
    if (currentQuestion + 1 < questions.length) setCurrentQuestion(currentQuestion + 1);
    else setShowResults(true);
  }

  useEffect(() => {
    const answerResults = questions.map((question) => {
      const questionOptionsResult = question.options.map((option) => {
        if (option.isCorrect && option.selected) return 1;
        return 0;
      });

      return sum(questionOptionsResult);
    });

    setScore(sum(answerResults));
  }, [showResults, questions]);

  useEffect(() => {
    setPercentage(parseFloat(parseFloat((score / questions.length) * 100).toFixed(2)));
    setWordsPerMinute(parseFloat(parseFloat(LECTURE_WORD_COUNT / (elapsedTimeInSeconds / 60)).toFixed(2)));
    // eslint-disable-next-line
  }, [showResults, score, elapsedTimeInSeconds]);

  useEffect(() => {
    if (authUser.has_completed_initial_test) {
      history.push("/dashboard");
    }
  }, [authUser, history]);

  return (
    <Fragment>
      <div className="page-container--initial-test-questions">
        <div className="initial-test-questions">
          <h1 className="initial-test-questions__title">
            Examen de diagnóstico
          </h1>
          {showResults ? (
            <div className="initial-test-questions__instructions">
              <p>
                ¡Has completado el examen de diagnóstico! En la tarjeta de abajo se muestran los 3 indicadores de tu rapidez y comprensión lectora.
                La meta es que al final de este curso mejores en estos tres estos aspectos.
              </p>
              <p>Ahora, clickea el botón de abajo para ir a tu dashboard y empezar el programa.</p>
            </div>
          ) : (
            <div className="initial-test-questions__instructions">
              <p>A continuación se te presentarán <b>10</b> preguntas relacionadas con la lectura. Para cada pregunta, clickea
                la respuesta que consideres correcta y luego clickea en "Siguiente pregunta". </p>
            </div>
          )}
          {showResults ? (
            <div className="initial-test-questions__results-container">
              <div className="initial-test-questions__results-title">
                Tus resultados del examen
              </div>
              <div className="initial-test-questions__results-list">
                <div className="initial-test-questions__result">
                  <div className="initial-test-questions__result-number">
                    {percentage}%
                  </div>
                  <div className="initial-test-questions__result-text">
                    Respuestas correctas
                  </div>
                </div>
                <div className="initial-test-questions__result">
                  <div className="initial-test-questions__result-number">
                    {elapsedTimeInSeconds}s
                  </div>
                  <div className="initial-test-questions__result-text">
                    Tiempo de lectura (segundos)
                  </div>
                </div>
                <div className="initial-test-questions__result">
                  <div className="initial-test-questions__result-number">
                    {wordsPerMinute}
                  </div>
                  <div className="initial-test-questions__result-text">
                    Palabras por minuto (PPM)
                  </div>
                </div>
              </div>
              <hr></hr>
              {submitInitialTestError && (
                <div className="initial-test-questions__error-message">
                  Error al subir las respuestas, por favor intenta de nuevo
                </div>
              )}
              <button
                className="initial-test-questions__link"
                onClick={() =>
                  submitInitialTest(
                    percentage,
                    elapsedTimeInSeconds,
                    wordsPerMinute,
                    1,
                  )}
              >
                Ir a mi dashboard
              </button>
            </div>
          ) : (
            <div className="initial-test-questions__question-container">
              <Question
                questionNumber={currentQuestion + 1}
                totalQuestions={questions.length}
                text={questions[currentQuestion].text}
              >
                {questions[currentQuestion].options.map((option) => {
                  return (
                    <Radio
                      key={option.id}
                      text={option.text}
                      name={questions[currentQuestion].questionName}
                      value={option.id}
                      checked={!!option.selected}
                      onChange={onInputChange}
                    />
                  );
                })}
              </Question>
              <hr></hr>
              <button
                className="initial-test-questions__next"
                onClick={() => { onClickNext() }}
              >
                {(currentQuestion + 1 < questions.length) ? 'Siguiente pregunta' : 'Finalizar examen'}
              </button>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  authUser: selectors.getAuthUser(state),
  elapsedTimeInSeconds: selectors.getElapsedTimeInSeconds(state),
  submitInitialTestError: selectors.getSumbitInitialTestError(state)
});

const mapDispatchToProps = (dispatch) => ({
  submitInitialTest: (percentage, time, wordsPerMinute, type) => dispatch(testsActions.startSubmitInitialTest(percentage, time, wordsPerMinute, type))
});

export default connect(mapStateToProps, mapDispatchToProps)(InitialTestQuestions);
