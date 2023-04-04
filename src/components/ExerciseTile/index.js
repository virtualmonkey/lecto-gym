import React from 'react';
import './index.scss';
import { getExerciseTypeString } from '../../utils/functions';

import CustomLink from '../CustomLink';
import ProgressIndicator from '../ProgressIndicator';

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
    <div className="exercise-tile" data-test="exericseTile">
      <div className="exercise-tile__name" data-test="exericseTile-name">
        {name}
      </div>
      <div className="exercise-tile__type" data-test="exericseTile-type">
        <b>Tipo: </b>{getExerciseTypeString(type)}
      </div>
      <div className="exercise-tile__tools" data-test="exericseTile-tools">
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
          data-test="exerciseTile-link"
        >
          Realizar Ejercicio
        </CustomLink>
      </div>
    </div>
  );
};

export default ExerciseTile;