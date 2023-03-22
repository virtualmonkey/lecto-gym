import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import './index.scss';

import WeekTile from '../../components/WeekTile';

import * as weeksActions from '../../redux/weeks/weeks.actions';
import * as selectors from '../../redux/rootReducer';

const Dashboard = ({
  weeks,
  isWeekUnlocked,
  isWeekCompleted,
  fetchingWeeksError,
  fetchWeeks,
}) => {
  useEffect(() => { 
    fetchWeeks();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <div className="page-container--dashboard">
        <div className="dashboard">
          {fetchingWeeksError && (
            <div className="dashboard__error-message">
              Error al cargar dashboard, por favor intenta de nuevo
            </div>
          )}
          <h1 className="dashboard__title">
            Dashboard
          </h1>
          <div className="dashboard__tiles-container">
            {
              weeks.map((week, index) => (
                <WeekTile 
                  key={week.id}
                  id={week.id}
                  name={`Semana ${week.id}`}
                  progression={week.progression}
                  unlocked={isWeekUnlocked(week.id)}
                  completed={isWeekCompleted(week.id)}
                />
              ))
            }
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  weeks: selectors.getWeeks(state),
  isWeekUnlocked: (id) => selectors.isWeekUnlocked(state, id),
  isWeekCompleted: (id) => selectors.isWeekCompleted(state, id),
  fetchingWeeksError: selectors.getFetchingWeeksError(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchWeeks: () => dispatch(weeksActions.startFetchWeeks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
