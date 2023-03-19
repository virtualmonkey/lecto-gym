import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import './index.scss';

import Week from '../../components/Week';

import * as weeksActions from '../../redux/weeks/weeks.actions';
import * as selectors from '../../redux/rootReducer';

const Dashboard = ({
  weeks,
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
                <Week 
                  key={week.id}
                  id={week.id}
                  name={`Semana ${week.id}`}
                  progression={week.progression}
                  disabled={(week.id !== 1) ? (weeks[index - 1].progression < 35) ? true : false : false}
                  completed={week.progression === 35}
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
  fetchingWeeksError: selectors.getFetchingWeeksError(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchWeeks: () => dispatch(weeksActions.startFetchWeeks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
