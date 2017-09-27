import React from "react";
import Transition from "react-transition-group/Transition";

function DefaultTransition({ children, position, ...props }) {
  return (
    <Transition
      {...props}
      timeout={750}
      onEnter={node => {
        node.classList.add(`toast-enter--${position}`);
        node.classList.add("toastify-animated");
      }}
      onExit={node => {
        node.classList.remove(`toast-enter--${position}`);
        node.classList.remove("toastify-animated");
        node.classList.add(`toast-exit--${position}`);
        node.classList.add("toastify-animated");
      }}
    >
      {children}
    </Transition>
  );
}

export default DefaultTransition;
