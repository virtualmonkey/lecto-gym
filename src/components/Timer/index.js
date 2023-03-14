import React, { useEffect } from 'react';
import { connect } from "react-redux";
import './index.scss';

import * as selectors from '../../redux/rootReducer';
import * as timerActions from '../../redux/actions/timer';

const Timer = ({
  isRunning,
  elapsedTime,
  onTimerTick,
}) => {
  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        onTimerTick(elapsedTime + 1000);
      }, 1000);
    } else if (!isRunning) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, onTimerTick, elapsedTime]);

  return (
    <div className='timer'>
      {`${Math.floor(elapsedTime/1000)} segundos`}
    </div>
  );
}

const mapStateToProps = (state) => ({
  isRunning: selectors.getIsRunning(state),
  elapsedTime: selectors.getElapsedTime(state),
});

const mapDispatchToProps = (dispatch) => ({
  onTimerTick: (newTime) => dispatch(timerActions.tickTimer(newTime)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);