export const TOAST_TYPES = {
  INFO: 'info',
  WARNING: 'warning',
  SUCCESS: 'success',
} as const;

export type ToastType = (typeof TOAST_TYPES)[keyof typeof TOAST_TYPES];
