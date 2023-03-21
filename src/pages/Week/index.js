import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import './index.scss';

import DayTile from '../../components/DayTile';
import ExerciseTile from '../../components/ExerciseTile';

import * as weekActions from '../../redux/week/week.actions';
import * as selectors from '../../redux/rootReducer';

const Week = ({ 
  weekId,
  days,
  fetchWeekError,
  isDayUnlocked,
  isDayCompleted,
  fetchWeek
}) => {
  let { id } = useParams();

  useEffect(() => {
    fetchWeek(id);
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <div className="page-container--week">
        <div className="week">
          {fetchWeekError && (
            <div className="week__error-message">
              Error al cargar semana, por favor intenta de nuevo
            </div>
          )}
          <h1 className="week__title">
            {`Semana ${weekId}`}
          </h1>
          <div className="week__days-container">
            {days.length > 0 && (days.map((day, index) =>
              <DayTile
                key={day.id}
                id={day.id}
                name={day.name}
                unlocked={isDayUnlocked(day.id)}
                completed={isDayCompleted(day.id)}
              >
                {day.exercises.length > 0 && (day.exercises.map(exercise =>
                  <ExerciseTile
                    key={exercise.id}
                    id={exercise.id}
                    week={exercise.week}
                    day={exercise.day}
                    tool={exercise.tool}
                    name={exercise.name}
                    type={exercise.type}
                    progression={exercise.progression}
                    disabled={exercise.progression === 3}
                  />
                ))}
              </DayTile>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  weekId: selectors.getWeekId(state),
  days: selectors.getDays(state),
  fetchWeekError: selectors.getFetchWeekError(state),
  isDayUnlocked: (id) => selectors.getIsDayUnlocked(state, id),
  isDayCompleted: (id) => selectors.getIsDayCompleted(state, id)
});

const mapDispatchToProps = (dispatch) => ({
  fetchWeek: (id) => dispatch(weekActions.startFetchWeek(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Week);