/* eslint react/require-default-props: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';

const rule = isDefault =>
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

function DefaultCloseButton({ closeToast, type }) {
  return (
    <button {...rule(type === 'default')} type="button" onClick={closeToast}>
      ✖
    </button>
  );
}

DefaultCloseButton.propTypes = {
  closeToast: PropTypes.func
};

export default DefaultCloseButton;
