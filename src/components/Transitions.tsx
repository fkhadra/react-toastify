import React, { useEffect, useLayoutEffect } from 'react';
import { cssTransition, Default } from '../utils';
import { ToastTransitionProps } from '../types';

const getConfig = (animationName: string, appendPosition = false) => ({
  enter: `${Default.CSS_NAMESPACE}--animate ${Default.CSS_NAMESPACE}__${animationName}-enter`,
  exit: `${Default.CSS_NAMESPACE}--animate ${Default.CSS_NAMESPACE}__${animationName}-exit`,
  appendPosition
});

// Used when transition is false: no animationend to wait for, so start and remove right away
const NoTransition = ({ children, isIn, done, playToast }: ToastTransitionProps) => {
  useLayoutEffect(() => {
    playToast();
  }, []);

  useEffect(() => {
    if (!isIn) done();
  }, [isIn]);

  return <>{children}</>;
};

const Bounce = cssTransition(getConfig('bounce', true));

const Slide = cssTransition(getConfig('slide', true));

const Zoom = cssTransition(getConfig('zoom'));

const Flip = cssTransition(getConfig('flip'));

export { Bounce, Slide, Zoom, Flip, NoTransition };
