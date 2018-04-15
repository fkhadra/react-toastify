import React from 'react';
import PropTypes from 'prop-types';

function CloseButton({ closeToast, type, ariaLabel }) {
  return (
    <button
      className={`Toastify__close-button Toastify__close-button--${type}`}
      type="button"
      onClick={closeToast}
      aria-label={ariaLabel}
    >
      ✖
    </button>
  );
}

CloseButton.propTypes = {
  closeToast: PropTypes.func,
  arialLabel: PropTypes.string
};

CloseButton.defaultProps = {
  ariaLabel: 'close'
};

export default CloseButton;
