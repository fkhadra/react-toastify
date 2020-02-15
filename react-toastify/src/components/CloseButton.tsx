import React from 'react';
import PropTypes from 'prop-types';
import { RT_NAMESPACE, TypeOptions } from '../utils';

export interface CloseButtonProps {
  closeToast: (e: React.MouseEvent<HTMLElement>) => void;
  type: TypeOptions;
  ariaLabel: string;
}

// TODO: move style to css file and also remove font-weight and font-size from css file
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
      <svg
        aria-hidden="true"
        height="16"
        width="14"
        viewBox="0 0 14 16"
        style={{
          fill: 'currentcolor'
        }}
      >
        <path
          fill-rule="evenodd"
          d="M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"
        ></path>
      </svg>
    </button>
  );
}

CloseButton.propTypes = {
  closeToast: PropTypes.func,
  ariaLabel: PropTypes.string
};

CloseButton.defaultProps = {
  ariaLabel: 'close'
};
