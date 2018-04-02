import React from 'react';

const Checkbox = ({ label, onChange, id, checked }) => (
  <label htmlFor={id}>
    <input
      id={id}
      type="checkbox"
      name={id}
      checked={checked}
      onChange={onChange}
    />
    {label}
  </label>
);

export default Checkbox;
