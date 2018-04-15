import React from 'react';

const Radio = ({ options, name, onChange, checked = false }) => {
  return Object.keys(options).map(k => {
    const option = options[k];

    return (
      <li key={`${name}-${option}`}>
        <label htmlFor={option}>
          <input
            id={option}
            type="radio"
            name={name}
            value={option}
            checked={option === checked}
            onChange={onChange}
          />
          {option}
        </label>
      </li>
    );
  });
};

export default Radio;
