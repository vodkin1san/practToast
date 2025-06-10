import { ToastProps } from './Toast';

export type ToastItem = ToastProps & {
  id: number;
  exiting: boolean;
  position?: Position;
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
  private position: Position = { vertical: 'top', horizontal: 'right' };
  private duration: number = 3000;
  private constructor() {}

  private notifyListeners(): void {
    this.listeners.forEach((callback) => callback());
  }
  public triggerRemoveToast(id: number): void {
    const index = this.toasts.findIndex((t) => t.id === id);
    if (index !== -1) {
      this.toasts = this.toasts.map((t, i) => (i === index ? { ...t, exiting: true } : t));
      this.notifyListeners();
    }
  }

  public removeToast(id: number): void {
    this.toasts = this.toasts.filter((t) => t.id !== id);
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
    return this.toasts.filter(
      (toasts) =>
        toasts.position?.vertical === vertical && toasts.position.horizontal === horizontal,
    );
  }

  public static getInstance() {
    if (!ToastManager.instance) {
      ToastManager.instance = new ToastManager();
    }
    return ToastManager.instance;
  }

  public setPosition(horizontal: 'left' | 'right', vertical: 'top' | 'bottom') {
    this.position = { vertical, horizontal };
    return this;
  }

  public setType(type: 'info' | 'warning' | 'success') {
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
    this.duration = duration;
    return this;
  }

  public show() {
    if (this.toasts.length >= 3) {
      console.warn('Toast limit reached (max 3 toasts).');
      return;
    }
    if (!this.toastConfig.title && !this.toastConfig.description) {
      console.error('Toast must have either a title or a description.');
      return;
    }
    const newToast: ToastItem = {
      id: Date.now(),
      exiting: false,
      position: this.position,
      duration: this.duration,
      ...(this.toastConfig as ToastProps),
    };
    this.toasts = [...this.toasts, newToast];
    this.notifyListeners();
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        this.triggerRemoveToast(newToast.id);
      }, newToast.duration);
    }
    this.toastConfig = {};
    this.position = { vertical: 'top', horizontal: 'right' };
    this.duration = 3000;
  }
}

export const toastManager = ToastManager.getInstance();
