import React, { useEffect } from 'react';
import { useStopwatch } from 'react-timer-hook';
import './index.scss';

const StopWatch = ({
  setTimeExpired,
  setElapsedTime,
}) => {
  const {
    seconds,
    minutes,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false });

  useEffect(() => {
    setTimeExpired(!isRunning && ((minutes * 60) + seconds > 0));
    // eslint-disable-next-line
  }, [isRunning]);

  useEffect(() => {
    setElapsedTime((minutes * 60) + seconds);
    // eslint-disable-next-line
  }, [seconds, minutes]);

  return (
    <div className="stopwatch" data-test="stopWatch">
      <div className="stopwatch__time" data-test="stopWatch-time">
        <span>{(minutes * 60) + seconds} s</span>
      </div>
      <div className="stopwatch__controls">
        <button
          className="stopwatch__control stopwatch__control--start"
          data-test="stopWatch-start"
          onClick={start}>
            Iniciar cronómetro
        </button>
        <button 
          className="stopwatch__control stopwatch__control--stop"
          data-test="stopWatch-stop"
          onClick={pause}
        >
          Pausar cronómetro
        </button>
        <button 
          className="stopwatch__control stopwatch__control--reset"
          data-test="stopWatch-reset"
          onClick={reset}
        >
          Reiniciar cronómetro
        </button>
      </div>
    </div>
  );
};

export default StopWatch;