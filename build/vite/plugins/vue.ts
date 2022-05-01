import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { definePlugin } from '../../../build/type/vite';

export default definePlugin((_mode, env) => {
  const plugins = [vue({ reactivityTransform: true })];

  if (env?.VITE_SUPPORT_JSX)
    plugins.push(vueJsx({ optimize: true, transformOn: true }));

  return plugins;
});
