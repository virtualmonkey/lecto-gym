import React, { useEffect, useState } from 'react';
import './index.scss';

const DayTile = ({
  children,
  id,
  name,
  unlocked,
  completed,
}) => {
  const [expanded, setExpanded] = useState(false);
  
  useEffect(() => {
    setExpanded(!completed)
  }, [completed]);

  return (
    (unlocked) ? (
      <div
        className={`
        day
        ${(expanded) ? 'day--expanded' : ''}
      `}
      data-test="day"
      >
        <div
          className="day__header"
          data-test="day-header"
          onClick={() => setExpanded(expanded => !expanded)}
        >
          <div className="day__left-header">
            <div
              className="day__name"
              data-test="day-name"
            >
              {name}
            </div>
            <div
              className={`
                day__current-state
                ${(completed) ? 'day__current-state--completed' : 'day__current-state--in-progress'}
              `}
              data-test="day-current-state"
            >

              {`${(completed) ? 'Completado' : 'En progreso'}`}
            </div>
          </div>

          <div className="day__toggle-button">
            {`${(expanded) ? '-' : '+'}`}
          </div>
        </div>
        <div
          className="day__exercises"
          data-test="day-exercises"
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