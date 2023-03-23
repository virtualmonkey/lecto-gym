import React from 'react';
import { useTimer } from 'react-timer-hook';
import './index.scss';

const CountDownTimer = ({ 
  expiryTimestamp,
  setTimeExpired
}) => {
  const {
    seconds,
    minutes,
    start,
  } = useTimer({ expiryTimestamp, autoStart: false, onExpire: () => setTimeExpired(true) });

  return (
    <div className="countdown-timer">
      <div className="countdown-timer__time">
        <span>{(minutes*60) + seconds} s</span>
      </div>
      <button 
        className="countdown-timer__control"
        onClick={start}>
          Iniciar temporizador
      </button>
    </div>
  );
}

export default CountDownTimer;