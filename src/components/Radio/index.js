import React from 'react';
import './index.scss';

const Radio = ({
  text,
  name,
  value,
  checked,
  onChange
}) => {
  return (
    <div 
      className={`radio ${(checked) ? 'radio--checked' : ''}`}
      data-test="radio"
    >
      <input
        type="radio"
        className="radio__input"
        data-test="radio-input"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <label 
        className="radio__label"
        data-test="radio-label"
      >
        {text}
      </label>
    </div>
  )
};

export default Radio;