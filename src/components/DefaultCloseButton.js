/* eslint react/require-default-props: 0 */
import React from 'react';
import PropTypes from 'prop-types';

function DefaultCloseButton({ closeToast, type, ariaLabel }) {
  const className = `react-toastify__close-button react-toastify__close-button--${type}`;

  return (
    <button
      className={className}
      type="button"
      onClick={closeToast}
      aria-label={ariaLabel}
    >
      ✖
    </button>
  );
}

DefaultCloseButton.propTypes = {
  closeToast: PropTypes.func,
  arialLabel: PropTypes.string
};

DefaultCloseButton.defaultProps = {
  ariaLabel: 'close'
};

export default DefaultCloseButton;
