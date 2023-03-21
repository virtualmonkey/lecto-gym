import React from 'react';
import './index.scss';
import { getExerciseTypeString } from '../../utils/functions';

import CustomLink from '../CustomLink';
import ProgressIndicator from '../ProgressIndicator';

const ExerciseTile = ({
  id,
  week,
  day,
  tool,
  name,
  type,
  progression,
  disabled,
}) => {
  return (
    <div className="exercise-tile">
      <div className="exercise-tile__name">
        {name}
      </div>
      <div className="exercise-tile__type">
        <b>Tipo: </b>{getExerciseTypeString(type)}
      </div>
      <div className="exercise-tile__tools">
        <b>Herramientas: </b>{tool}
      </div>
      <div className="exercise-tile__actions">
        <ProgressIndicator
          progression={progression}
        />
        <CustomLink 
          disabled={disabled}
          className={
            `exercise-tile__link 
            ${(disabled) ? 'exercise-tile__link--disabled ' : ''}
          `}
          to={`/exercise/${id}`}
        >
          Realizar Ejercicio
        </CustomLink>
      </div>
    </div>
  );
};

export default ExerciseTile;