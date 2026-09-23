export {};

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      render: (container: HTMLElement | string, parameters: Record<string, unknown>) => void;
      getResponse: () => string;
      reset: () => void;
    };
    onloadCallback?: () => void;
  }
}
