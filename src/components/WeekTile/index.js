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
    <div className="week-tile">
      {!unlocked && (
        <div className="week-tile__current-state week-tile__current-state--disabled">
          Aún no habilitada
        </div>
      )}
      {unlocked && !completed && (
        <div className="week-tile__current-state week-tile__current-state--in-progress">
          En progreso
        </div>
      )}
      {completed && (
        <div className="week-tile__current-state week-tile__current-state--completed">
          Completada
        </div>
      )}
      <div className="week-tile__name">
        {name}
      </div>
      <div className="week-tile__progress">
        {`${progression}/35 ejercicios completados`}
      </div>
      <CustomLink
        disabled={!unlocked}
        className={
          `week-tile__link 
          ${!unlocked && 'week-tile__link--disabled'
        }`}
        to={`/week/${id}`}
      >
        Realizar Ejercicios
      </CustomLink>
    </div>
  );
};

export default WeekTile;