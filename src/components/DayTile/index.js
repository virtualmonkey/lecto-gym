import React, { useState } from 'react';
import './index.scss';

const DayTile = ({
  children,
  id,
  name,
  unlocked,
  completed,
}) => {
  const [expanded, setExpanded] = useState(!completed);
  return (
    (unlocked) ? (
      <div
        className={`
        day
        ${(expanded) ? 'day--expanded' : ''}
      `}
      >
        <div
          className="day__header"
          onClick={() => setExpanded(expanded => !expanded)}
        >
          <div className="day__left-header">
            <div
              className="day__name"
            >
              {name}
            </div>
            <div
              className={`
              day__current-state
              ${(completed) ? 'day__current-state--completed' : 'day__current-state--in-progress'}
            `}>
              {`${(completed) ? 'Completado' : 'En progreso'}`}
            </div>
          </div>

          <div className="day__toggle-button">
            {`${(expanded) ? '-' : '+'}`}
          </div>
        </div>
        <div
          className="day__exercises"
        >
          {children}
        </div>
      </div>
    ) : (
      <></>
    )
  );
}

export default DayTile;
