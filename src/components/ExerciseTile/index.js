import React from 'react';
import './index.scss';
import { getExerciseTypeString } from '../../utils/functions';

import CustomLink from '../CustomLink';
import ProgressIndicator from '../ProgressIndicator';

// TODO: pass itemId as prop, and in the CustomLink pass the id and other props as a prop
const ExerciseTile = ({
  id,
  itemId,
  week,
  day,
  tools,
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
        <b>Herramientas: </b>{tools}
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
          to={`/exercise/${itemId}/${id}`}
        >
          Realizar Ejercicio
        </CustomLink>
      </div>
    </div>
  );
};

export default ExerciseTile;