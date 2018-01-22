/* eslint react/require-default-props: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';

const styles = isDefault =>
  css({
    color: isDefault ? '#000' : '#fff',
    fontWeight: 'bold',
    fontSize: '14px',
    background: 'transparent',
    outline: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    opacity: isDefault ? '0.3' : '0.7',
    transition: '.3s ease',
    alignSelf: 'flex-start',
    ':hover, :focus': {
      opacity: 1
    }
  });

function DefaultCloseButton({ closeToast, type, ariaLabel }) {
  return (
    <button
      {...styles(type === 'default')}
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
