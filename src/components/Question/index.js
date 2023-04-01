import React from 'react';
import './index.scss';

const Question = ({
  children,
  questionNumber,
  totalQuestions,
  text,
}) => {
  return (
    <div className="question" data-test="question">
      <div className="question__title" data-test="question-title">
        {`Pregunta ${questionNumber} de ${totalQuestions}`}
      </div>
      <div className="question__text" data-test="question-text">
        {text}
      </div>
      <div className="question__options" data-test="question-options">
        {children}
      </div>
    </div>
  );
};

export default Question;