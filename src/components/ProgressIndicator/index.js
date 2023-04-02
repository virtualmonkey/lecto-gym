import React from 'react';
import './index.scss';

const ProgressIndicator = ({
  progression
}) => {
  return (
    <div 
      className={`progress-indicator progress-indicator--${progression}`}
      data-test="progressIndicator"
    >
      {progression}
    </div>
  );
};

export default ProgressIndicator;