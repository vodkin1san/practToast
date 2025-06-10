import React, { useSyncExternalStore } from 'react';
import styles from './styles/ToastContainer.module.scss';
import ReactDOM from 'react-dom';
import Toast from './Toast';
import { toastManager } from './ToastManager';

export interface ToastContainerProps {
  vertical?: 'top' | 'bottom';
  horizontal?: 'left' | 'right';
}

//зачем топ райт? - оптимизация для самого частого сценария.удобства для быстрого старта.
const ToastContainer: React.FC<ToastContainerProps> = ({
  vertical = 'top',
  horizontal = 'right',
}) => {
  useSyncExternalStore(
    (cb) => toastManager.subscribe(cb),
    () => toastManager.getSnapshot(),
  );
  const toastToShow = toastManager.getToastsByPosition(vertical, horizontal);

  return ReactDOM.createPortal(
    <div className={`${styles.toastСontainer} ${styles[vertical]}-${styles[horizontal]}`}>
      {toastToShow.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onRemove={() => toastManager.removeToast(toast.id)}
          onClick={() => {
            if (!toast.exiting) toastManager.triggerRemoveToast(toast.id);
          }}
        />
      ))}
    </div>,
    document.body,
  );
};

export default ToastContainer;
