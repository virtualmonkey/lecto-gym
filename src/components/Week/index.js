import React from 'react';
import CustomLink from '../CustomLink';
import './index.scss';

const Week = ({
  id,
  name,
  progression,
  disabled,
  completed,
}) => {
  return (
    <div className="week">
      {disabled && (
        <div className="week__current-state week__current-state--disabled">
          Aún no habilitada
        </div>
      )}
      {!disabled && !completed && (
        <div className="week__current-state week__current-state--in-progress">
          En progreso
        </div>
      )}
      {completed && (
        <div className="week__current-state week__current-state--completed">
          Completada
        </div>
      )}
      <div className="week__name">
        {name}
      </div>
      <div className="week__progress">
        {`${progression}/35 ejercicios completados`}
      </div>
      <CustomLink
        disabled={disabled}
        className={
          `week__link 
          ${disabled && 'week__link--disabled'
        }`}
        to={`/week/${id}`}
        state={{ weekId: id }}
      >
        Realizar Ejercicios
      </CustomLink>
    </div>
  );
};

export default Week;