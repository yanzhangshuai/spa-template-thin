import WindiCSS from 'vite-plugin-windicss';

import { definePlugin } from '../../../build/type/vite';

export default definePlugin(() => {
  return WindiCSS();
});

