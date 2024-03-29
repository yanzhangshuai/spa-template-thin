import type { App, Plugin } from 'vue';

import { createPinia } from 'pinia';
import { debounce } from 'ts-debounce';
import { PiniaStorage } from '@mwjz/pinia-storage';
import { PiniaDebounce } from '@pinia/plugin-debounce';

const StorePlugin: Plugin = {
  install(app: App) {
    const store = create();
    if (!store)
      return;

    app.use(store);
  }
};

export default StorePlugin;

function create() {
  const store = createPinia();

  store.name = 'pinia';

  store.use(PiniaDebounce(debounce));

  store.use((PiniaStorage({ prefix: 'spa-template_' })));

  return store;
}
