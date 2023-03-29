import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { sum } from 'lodash';
import { useHistory } from "react-router-dom";
import './index.scss';

import Question from '../../components/Question';
import Radio from '../../components/Radio';

import * as testsActions from '../../redux/tests/tests.actions';
import * as selectors from '../../redux/rootReducer';

const LECTURE_WORD_COUNT = 380;

const FinalTestQuestions = ({
  authUser,
  elapsedTimeInSeconds,
  submitFinalTest,
  submitFinalTestError,
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
      text: "Si el tren tenía previsto llegar a las 4 PM originalmente ¿A qué hora llegará?",
      options: [
        { id: 0, text: "5 PM", isCorrect: true, selected: false },
        { id: 1, text: "4 PM", isCorrect: false, selected: false },
        { id: 2, text: "6 PM", isCorrect: false, selected: false },
        { id: 3, text: "5:30 PM", isCorrect: false, selected: false },
      ],
    },
    {
      questionName: 'question-2',
      text: "¿Cómo se sintió la señora cuando le dijeron que el tren traía retraso?",
      options: [
        { id: 0, text: "Indiferente", isCorrect: false, selected: false },
        { id: 1, text: "Fastidiada", isCorrect: true, selected: false },
        { id: 2, text: "Enojada", isCorrect: false, selected: false },
        { id: 3, text: "Molesta", isCorrect: false, selected: false },
      ],
    },
    {
      questionName: 'question-3',
      text: "¿Qué compró la señora en el puesto de diarios?",
      options: [
        { id: 0, text: "Una historieta", isCorrect: false, selected: false },
        { id: 1, text: "Un cuestionario", isCorrect: false, selected: false },
        { id: 2, text: "Una revista", isCorrect: true, selected: false },
        { id: 3, text: "Una tarjeta de regalo", isCorrect: false, selected: false },
      ],
    },
    {
      questionName: 'question-4',
      text: "¿Qué compró la señora en el kiosco?",
      options: [
        { id: 0, text: "Galletas y una revista", isCorrect: false, selected: false },
        { id: 1, text: "Un paquete de galletas y una gaseosa", isCorrect: true, selected: false },
        { id: 2, text: "Una gaseosa y una revista", isCorrect: false, selected: false },
        { id: 3, text: "Una revista y un periódico", isCorrect: false, selected: false },
      ],
    },
    {
      questionName: 'question-5',
      text: "¿Cómo se sintió la señora cuando el joven abrió su paquete de galletas sin permiso?",
      options: [
        { id: 0, text: "Ultrajada", isCorrect: false, selected: false },
        { id: 1, text: "Feliz", isCorrect: false, selected: false },
        { id: 2, text: "Indignada", isCorrect: false, selected: false },
        { id: 3, text: "Triste", isCorrect: true, selected: false },
      ],
    },
    {
      questionName: 'question-6',
      text: "¿Qué dijo la señora cuando se retiró de la banca?",
      options: [
        { id: 0, text: `"Gracias"`, isCorrect: true, selected: false },
        { id: 1, text: `No dijo nada`, isCorrect: false, selected: false },
        { id: 2, text: `"Insolente"`, isCorrect: false, selected: false },
        { id: 3, text: `"Qué mal"`, isCorrect: false, selected: false },
      ],
    },
    {
      questionName: 'question-7',
      text: "¿Qué dijo el muchacho cuando la señora se retiró de la banca?",
      options: [
        { id: 0, text: `"Nos vemos"`, isCorrect: false, selected: false },
        { id: 1, text: `"Hasta la próxima"`, isCorrect: false, selected: false },
        { id: 2, text: `"De nada"`, isCorrect: true, selected: false },
        { id: 3, text: `"Gracias"`, isCorrect: false, selected: false },
      ],
    },
    {
      questionName: 'question-8',
      text: "En la oración: “Saca una galletita que exhibe frente al joven” La palabra “exhibe” se puede reemplazar por una de estas palabras:",
      options: [
        { id: 0, text: "Esconde", isCorrect: false, selected: false },
        { id: 1, text: "Oculta", isCorrect: false, selected: false },
        { id: 2, text: "Enseña", isCorrect: true, selected: false },
        { id: 3, text: "Quita", isCorrect: false, selected: false },
      ],
    },
    {
      questionName: 'question-9',
      text: "¿Quién se comió la última galleta?",
      options: [
        { id: 0, text: "Una mitad cada uno", isCorrect: true, selected: false },
        { id: 1, text: "La señora", isCorrect: false, selected: false },
        { id: 2, text: "El joven", isCorrect: false, selected: false },
        { id: 3, text: "Ninguno", isCorrect: false, selected: false },
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
    if (authUser.has_completed_final_test) {
      history.push("/results");
    }
  }, [authUser, history]);

  return (
    <Fragment>
      <div className="page-container--final-test-questions">
        <div className="final-test-questions">
          <h1 className="final-test-questions__title">
            Examen de diagnóstico
          </h1>
          {showResults ? (
            <div className="final-test-questions__instructions">
              <p>
                ¡Has completado el examen de diagnóstico! En la tarjeta de abajo se muestran los 3 indicadores de tu rapidez y comprensión lectora.
                Es hora de ver qué tanto has mejorado en las últimas semanas.
              </p>
              <p>Ahora, clickea el botón de abajo para ver tus resultados del programa.</p>
            </div>
          ) : (
            <div className="final-test-questions__instructions">
              <p>A continuación se te presentarán <b>9</b> preguntas relacionadas con la lectura. Para cada pregunta, clickea
                la respuesta que consideres correcta y luego clickea en "Siguiente pregunta". </p>
            </div>
          )}
          {showResults ? (
            <div className="final-test-questions__results-container">
              <div className="final-test-questions__results-title">
                Tus resultados del examen
              </div>
              <div className="final-test-questions__results-list">
                <div className="final-test-questions__result">
                  <div className="final-test-questions__result-number">
                    {percentage}%
                  </div>
                  <div className="final-test-questions__result-text">
                    Respuestas correctas
                  </div>
                </div>
                <div className="final-test-questions__result">
                  <div className="final-test-questions__result-number">
                    {elapsedTimeInSeconds}s
                  </div>
                  <div className="final-test-questions__result-text">
                    Tiempo de lectura (segundos)
                  </div>
                </div>
                <div className="final-test-questions__result">
                  <div className="final-test-questions__result-number">
                    {wordsPerMinute}
                  </div>
                  <div className="final-test-questions__result-text">
                    Palabras por minuto (PPM)
                  </div>
                </div>
              </div>
              <hr></hr>
              {submitFinalTestError && (
                <div className="final-test-questions__error-message">
                  Error al subir las respuestas, por favor intenta de nuevo
                </div>
              )}
              <button
                className="final-test-questions__link"
                onClick={() =>
                  submitFinalTest(
                    percentage,
                    elapsedTimeInSeconds,
                    wordsPerMinute,
                    2,
                  )}
              >
                Ver resultados
              </button>
            </div>
          ) : (
            <div className="final-test-questions__question-container">
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
                className="final-test-questions__next"
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
  submitFinalTestError: selectors.getSubmitFinalTestError(state),
});

const mapDispatchToProps = (dispatch) => ({
  submitFinalTest: (percentage, time, wordsPerMinute, type) => dispatch(testsActions.startSubmitFinalTest(percentage, time, wordsPerMinute, type))
});

export default connect(mapStateToProps, mapDispatchToProps)(FinalTestQuestions);
