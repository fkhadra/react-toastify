import React from 'react';
import PropTypes from 'prop-types';
import { RT_NAMESPACE, TypeOptions } from '../utils';

export interface CloseButtonProps {
  closeToast: (e: React.MouseEvent<HTMLElement>) => void;
  type: TypeOptions;
  ariaLabel: string;
}

export function CloseButton({ closeToast, type, ariaLabel }: CloseButtonProps) {
  return (
    <button
      className={`${RT_NAMESPACE}__close-button ${RT_NAMESPACE}__close-button--${type}`}
      type="button"
      onClick={e => {
        e.stopPropagation();
        closeToast(e);
      }}
      aria-label={ariaLabel}
    >
      ✖︎
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
