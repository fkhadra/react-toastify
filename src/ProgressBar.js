import React from 'react';

export default ({ value, onChange }) => (
  <div>
    <label htmlFor="progressBar">Hide progress bar: </label>
    <input
      id="progressBar"
      type="checkbox"
      name="hideProgressBar"
      checked={value}
      onChange={onChange}
    />
  </div>
);