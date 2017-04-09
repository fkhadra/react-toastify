import React from 'react';
import PropTypes from 'prop-types';

const DefaultCloseButton = ({ closeToast }) => (
  <button
    className="toastify__close"
    type="button"
    onClick={closeToast}
  >
    ×
  </button>
);

DefaultCloseButton.propTypes = {
  closeToast: PropTypes.func
};

export default DefaultCloseButton;
