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
    <div className={`
      radio
      ${(checked) ? 'radio--checked' : ''}
      `}>
      <input
        type="radio"
        className="radio__input"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <label className="radio__label">
        {text}
      </label>
    </div>
  )
};

export default Radio;