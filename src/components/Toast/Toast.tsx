import React, { useState, useEffect } from 'react';
import * as styles from './styles/Toast.module.scss';
import { ToastType, TOAST_TYPES } from './types/toast-types';

export type ToastProps = (
  | { title: string; description?: string }
  | { title?: string; description: string }
) & {
  type?: ToastType;
  animation?: string;
  backgroundColor?: string;
  duration?: number;
  exiting?: boolean;
  onRemove?: () => void;
  onClick?: () => void;
};

const Toast: React.FC<ToastProps> = ({
  title,
  description,
  type = TOAST_TYPES.INFO,
  animation = 'fade',
  backgroundColor = '#fff',
  onRemove,
  exiting = false,
  onClick,
}) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(true);
  }, []);

  let animationClass = '';
  if (exiting) {
    animationClass = `toast-exit-${animation}`;
  } else {
    animationClass = visible ? `toast-enter-${animation}` : '';
  }

  const handleAnimationEnd = () => {
    if (exiting && onRemove) {
      onRemove();
    }
  };

  return (
    <div
      className={`${styles.toast} ${styles[type]} ${(styles as any)[animationClass]}`}
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
