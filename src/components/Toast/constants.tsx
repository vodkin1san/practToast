// src/components/Toast/constants.ts

export const DEFAULT_MAX_TOASTS = 3; // Максимальное количество одновременно отображаемых тостов
export const DEFAULT_TOAST_POSITION = { vertical: 'top', horizontal: 'right' } as const; // Дефолтная позиция тоста
export const DEFAULT_TOAST_DURATION = 3000; // Дефолтная длительность отображения тоста в мс (3 секунды)

// Дефолтные значения для обязательных пропсов Toast
export const DEFAULT_TOAST_TYPE = 'info'; // Дефолтный тип тоста (info, success, error, warning)
export const DEFAULT_TOAST_ANIMATION = 'fade'; // Дефолтная анимация тоста (например, 'fade', 'fadeInOut', 'slideInRight')
export const DEFAULT_TOAST_BACKGROUND_COLOR = '#fff'; // Дефолтный цвет фона тоста

export const TOAST_APPEAR_DELAY_MS = 10; // Небольшая задержка для анимации появления (если нужна)
