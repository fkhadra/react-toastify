import React from 'react';

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
  closeToast: React.PropTypes.func
};

export default DefaultCloseButton;
