import React from 'react';
import CustomLink from '../CustomLink';
import './index.scss';

const WeekTile = ({
  id,
  name,
  progression,
  unlocked,
  completed,
}) => {
  return (
    <div className="week-tile" data-test="weekTile">
      {!unlocked && (
        <div 
          className="week-tile__current-state week-tile__current-state--disabled"
          data-test="weekTile-current-state"
        >
          Aún no habilitada
        </div>
      )}
      {unlocked && !completed && (
        <div 
          className="week-tile__current-state week-tile__current-state--in-progress"
          data-test="weekTile-current-state"
        >
          En progreso
        </div>
      )}
      {completed && (
        <div 
          className="week-tile__current-state week-tile__current-state--completed"
          data-test="weekTile-current-state"
        >
          Completada
        </div>
      )}
      <div className="week-tile__name" data-test="weekTile-name">
        {name}
      </div>
      <div className="week-tile__progress" data-test="weekTile-progress">
        {`${progression}/35 ejercicios completados`}
      </div>
      <CustomLink
        disabled={!unlocked}
        className={
          `week-tile__link 
          ${!unlocked && 'week-tile__link--disabled'
        }`}
        to={`/week/${id}`}
        data-test="weekTile-link"
      >
        {(completed) ? 'Ver progreso' : 'Realizar ejercicios'}
      </CustomLink>
    </div>
  );
};

export default WeekTile;