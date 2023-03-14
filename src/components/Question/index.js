import React from 'react';
import './index.scss';

const Question = ({
  children,
  questionNumber,
  totalQuestions,
  text,
}) => {
  return (
    <div className="question">
      <div className="question__title">
        {`Pregunta ${questionNumber} de ${totalQuestions}`}
      </div>
      <div className="question__text">
        {text}
      </div>
      <div className="question__options">
        {children}
      </div>
    </div>
  );
};

export default Question;