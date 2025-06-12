/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import * as styles from './styles/Toast.module.scss';
import { ToastType } from './types/toast-types';

enum ToastState {
  SHOWING = 'showing',
  IDLE = 'idle',
  HIDING = 'hiding',
  DONE = 'done',
}

export type ToastProps = {
  title: string;
  description: string;
  type: ToastType;
  animation: string;
  backgroundColor: string;
  duration: number;
  onRemove: () => void;
  onClick: () => void;
};

const Toast: React.FC<ToastProps> = ({
  title,
  description,
  type,
  animation,
  backgroundColor,
  duration,
  onRemove,
  onClick,
}) => {
  const [visible, setVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const currentToastState: ToastState = (() => {
    if (!visible && !isFadingOut) return ToastState.SHOWING;
    if (visible && !isFadingOut) return ToastState.IDLE;
    if (visible && isFadingOut) return ToastState.HIDING;
    return ToastState.DONE;
  })();

  useEffect(() => {}, [currentToastState, title]);

  useEffect(() => {
    setVisible(true);

    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsFadingOut(true);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  let animationClass = '';

  if (isFadingOut) {
    animationClass = `toast-exit-${animation}`;
  } else {
    animationClass = visible ? `toast-enter-${animation}` : '';
  }

  const handleAnimationEnd = () => {
    if (isFadingOut && onRemove) {
      onRemove();
    }
  };

  return (
    <div
      className={`${styles.toast} ${(styles as any)[type]} ${(styles as any)[animationClass]}`}
      style={{ backgroundColor }}
      onAnimationEnd={handleAnimationEnd}
      onClick={onClick}
    >
      {title && <div className={`${styles.toastHeader}`}>{title}</div>}
      {description && <div className={`${styles.toastBody}`}>{description}</div>}
    </div>
  );
};
export default Toast;
