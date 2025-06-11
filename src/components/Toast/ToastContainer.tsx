import React, { useEffect, useState } from 'react';
import * as styles from './styles/ToastContainer.module.scss';
import ReactDOM from 'react-dom';
import Toast from './Toast';
import { toastManager, ToastItem, Position } from './ToastManager';

const ALL_POSSIBLE_POSITIONS: Position[] = [
  { vertical: 'top', horizontal: 'left' },
  { vertical: 'top', horizontal: 'right' },
  { vertical: 'bottom', horizontal: 'left' },
  { vertical: 'bottom', horizontal: 'right' },
];

const ToastContainer: React.FC = () => {
  const [allToasts, setAllToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const unsubscribe = toastManager.subscribe(() => {
      setAllToasts(toastManager.getSnapshot());
    });
    setAllToasts(toastManager.getSnapshot());
    return () => {
      unsubscribe();
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      {ALL_POSSIBLE_POSITIONS.map((pos, index) => {
        const { vertical, horizontal } = pos;
        const toastsInThisPosition = allToasts.filter(
          (toast) =>
            toast.position.vertical === vertical && toast.position.horizontal === horizontal,
        );

        const positionClassName = `${vertical}-${horizontal}`;

        return (
          <div
            key={index}
            className={`${styles.toastContainer} ${(styles as any)[positionClassName]}`}
          >
            {toastsInThisPosition.map((toast) => (
              <Toast
                key={toast.id}
                {...toast}
                onRemove={() => toastManager.removeToast(toast.id)}
                onClick={toast.onClick}
              />
            ))}
          </div>
        );
      })}
    </>,
    document.body,
  );
};

export default ToastContainer;
