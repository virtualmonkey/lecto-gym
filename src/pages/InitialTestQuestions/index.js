import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { sum } from 'lodash';
import './index.scss';

import CustomLink from '../../components/CustomLink';
import Question from '../../components/Question';
import Radio from '../../components/Radio';

import * as selectors from '../../redux/rootReducer';

const LECTURE_WORD_COUNT = 451;

const InitialTestQuestions = ({
  elapsedTimeInSeconds
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [questions, setQuestions] = useState([
    {
      questionName: 'question-1',
      text: "What is the capital of America?",
      options: [
        { id: 0, text: "New York City", isCorrect: false, selected: false },
        { id: 1, text: "Boston", isCorrect: false, selected: false },
        { id: 2, text: "Santa Fe", isCorrect: false, selected: false },
        { id: 3, text: "Washington DC", isCorrect: true, selected: false },
      ],
    },
    {
      questionName: 'question-2',
      text: "What year was the Constitution of America written?",
      options: [
        { id: 0, text: "1787", isCorrect: true, selected: false },
        { id: 1, text: "1776", isCorrect: false, selected: false },
        { id: 2, text: "1774", isCorrect: false, selected: false },
        { id: 3, text: "1826", isCorrect: false, selected: false },
      ],
    },
    {
      questionName: 'question-3',
      text: "Who was the second president of the US?",
      options: [
        { id: 0, text: "John Adams", isCorrect: true, selected: false },
        { id: 1, text: "Paul Revere", isCorrect: false, selected: false },
        { id: 2, text: "Thomas Jefferson", isCorrect: false, selected: false },
        { id: 3, text: "Benjamin Franklin", isCorrect: false, selected: false },
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
                    {parseFloat((score / questions.length) * 100).toFixed(2)}%
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
                    {parseFloat(LECTURE_WORD_COUNT / (elapsedTimeInSeconds / 60)).toFixed(2)}
                  </div>
                  <div className="initial-test-questions__result-text">
                    Palabras por minuto (PPM)
                  </div>
                </div>
              </div>
              <hr></hr>
              <CustomLink
                className="initial-test-questions__link"
                to="/dashboard"
              // TODO: dispatch action of uploading results to database
              >
                Ir a mi dashboard
              </CustomLink>
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
  elapsedTimeInSeconds: selectors.getElapsedTimeInSeconds(state),
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(InitialTestQuestions);
