/* eslint react/require-default-props: 0 */
import React from 'react';
import PropTypes from 'prop-types';

function DefaultCloseButton({ closeToast }) {
  return (
    <button
      className="toastify__close"
      type="button"
      onClick={closeToast}
    >
      ✖
    </button>
  );
}

DefaultCloseButton.propTypes = {
  closeToast: PropTypes.func
};

export default DefaultCloseButton;
