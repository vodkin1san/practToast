import React, { useState, useEffect } from 'react';
import styles from './styles/Toast.module.scss';

export type ToastProps = (
  | { title: string; description?: string }
  | { title?: string; description: string }
) & {
  type?: 'info' | 'warning' | 'success';
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
  type = 'info',
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
      className={`${styles.toast} ${styles[type]} ${styles[animationClass]}`}
      style={{ backgroundColor }}
      onAnimationEnd={handleAnimationEnd}
      onClick={onClick}
    >
      {title && <div className={`${styles.toatsHeader}`}>{title}</div>}
      {description && <div className={`${styles.toatsBody}`}>{description}</div>}
    </div>
  );
};
export default Toast;
