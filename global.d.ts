interface CssModule {
  [key: string]: string;
  toastContainer: string;
  topLeft: string;
  topRight: string;
  bottomLeft: string;
  bottomRight: string;

  toast: string;
  info: string;
  success: string;
  warning: string;
  error: string;
  toatsHeader: string;
  toatsBody: string;
  toastExitFade: string;
  toastEnterFade: string;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;

  const classes: CssModule;
  export default classes;

  export const toastContainer: string;
  export const positionClassName: string;
  export const topLeft: string;
  export const topRight: string;
  export const bottomLeft: string;
  export const bottomRight: string;

  export const toast: string;
  export const info: string;
  export const success: string;
  export const warning: string;
  export const error: string;
  export const toastHeader: string;
  export const toastBody: string;
  export const toastExitFade: string;
  export const toastEnterFade: string;
}

declare module '*.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.css' {
  const classes: { [key: string]: string };
  export default classes;
}
