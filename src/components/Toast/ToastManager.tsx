import {
  DEFAULT_MAX_TOASTS,
  DEFAULT_TOAST_POSITION,
  DEFAULT_TOAST_DURATION,
  DEFAULT_TOAST_TYPE,
  DEFAULT_TOAST_ANIMATION,
  DEFAULT_TOAST_BACKGROUND_COLOR,
} from './constants';
import { ToastProps } from './Toast';
import { ToastType } from './types/toast-types';

export type ToastItem = ToastProps & {
  id: number;
  position: Position;
};

export type Position = {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'right';
};

class ToastManager {
  private listeners = new Set<() => void>();
  private toasts: ToastItem[] = [];
  private static instance: ToastManager;

  private toastConfig: Partial<ToastProps> = {};
  private position: Position = { ...DEFAULT_TOAST_POSITION };

  private constructor() {}

  private notifyListeners(): void {
    this.listeners.forEach((callback) => callback());
  }

  public removeToast(id: number): void {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
    this.notifyListeners();
  }

  public subscribe(callback: () => void): () => void {
    this.listeners.add(callback);
    return () => {
      this.listeners.delete(callback);
    };
  }

  public getSnapshot(): ToastItem[] {
    return this.toasts;
  }

  public getToastsByPosition(
    vertical: Position['vertical'],
    horizontal: Position['horizontal'],
  ): ToastItem[] {
    return this.toasts.filter((toast) => {
      const effectivePosition = toast.position || DEFAULT_TOAST_POSITION;
      return effectivePosition.vertical === vertical && effectivePosition.horizontal === horizontal;
    });
  }

  public static getInstance() {
    if (!ToastManager.instance) {
      ToastManager.instance = new ToastManager();
    }
    return ToastManager.instance;
  }

  public setPosition(vertical: 'top' | 'bottom', horizontal: 'left' | 'right') {
    this.position = { vertical, horizontal };
    return this;
  }

  public setType(type: ToastType) {
    this.toastConfig.type = type;
    return this;
  }

  public setTitle(title: string) {
    this.toastConfig.title = title;
    return this;
  }

  public setDescription(description: string) {
    this.toastConfig.description = description;
    return this;
  }

  public setBackground(backgroundColor: string) {
    this.toastConfig.backgroundColor = backgroundColor;
    return this;
  }

  public setAnimation(animation: string) {
    this.toastConfig.animation = animation;
    return this;
  }

  public setDuration(duration: number) {
    this.toastConfig.duration = duration;
    return this;
  }

  public setOnClick(onClick: () => void) {
    this.toastConfig.onClick = onClick;
    return this;
  }

  public show() {
    if (this.toasts.length >= DEFAULT_MAX_TOASTS) {
      console.warn('Toast limit reached (max 3 toasts).');
      return;
    }

    const finalToastProps: ToastProps = {
      title: this.toastConfig.title || '',
      description: this.toastConfig.description || '',
      type: this.toastConfig.type || DEFAULT_TOAST_TYPE,
      animation: this.toastConfig.animation || DEFAULT_TOAST_ANIMATION,
      backgroundColor: this.toastConfig.backgroundColor || DEFAULT_TOAST_BACKGROUND_COLOR,
      duration: this.toastConfig.duration || DEFAULT_TOAST_DURATION,
      onRemove: () => {},
      onClick: this.toastConfig.onClick || (() => {}),
    };

    if (!finalToastProps.title.trim() && !finalToastProps.description.trim()) {
      console.error('Toast must have either a title or a description.');
      return;
    }

    const newToast: ToastItem = {
      id: Date.now(),
      position: this.position,
      ...finalToastProps,
    };

    this.toasts = [...this.toasts, newToast];
    this.notifyListeners();

    this.toastConfig = {};
    this.position = { ...DEFAULT_TOAST_POSITION };
  }
}

export const toastManager = ToastManager.getInstance();
