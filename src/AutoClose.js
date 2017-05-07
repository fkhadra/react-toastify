import React from 'react';

export default ({ autoClose, onChange }) => (
  <div>
    <label htmlFor="autoClose">Auto close: </label>
    <input
      id="autoClose"
      type="checkbox"
      name="autoClose"
      checked={autoClose}
      onChange={onChange}
    />
  </div>
);