import type { App } from 'vue';
import config from '@/config';
import { dateFormat } from '@/util/date';

let globalProps: GlobalProps;

export function setupGlobalProperty(app: App<Element>): App<Element> {
  globalProps = {
    DEV: import.meta.env.DEV,
    dateFormat
  };

  Object.defineProperty(app.config.globalProperties, '$window', {
    enumerable: false,
    get() {
      return window;
    }
  });

  Object.defineProperty(app.config.globalProperties, '$globalProps', {
    enumerable: false,
    get() {
      return globalProps;
    }
  });

  Object.defineProperty(app.config.globalProperties, '$config', {
    enumerable: false,
    get() {
      return config;
    }
  });
  return app;
}

export function useGlobalProps(): DeepReadonly<GlobalProps> {
  return globalProps;
}
