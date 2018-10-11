import React from 'react';
import PropTypes from 'prop-types';

function CloseButton({
 closeToast,
 type,
 ariaLabel,
 prefixCls = 'Toastify'
}) {
  return (
    <button
      className={`${prefixCls}__close-button ${prefixCls}__close-button--${type}`}
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
