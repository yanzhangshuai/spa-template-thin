import { createApp } from 'vue';

import { preloadConfig } from '@/preload';
import Store from '@/store';
import Plugin from '@/plugin';
import Router from '@/router';
import App from '@/page/app.vue';
import Component from '@/component';
import Directive from '@/directive';

import Service from './service';

import 'windi.css';
import '@/asset/style/index.less';

preloadConfig().then((config) => {
  console.log('----,config', config);

  const app = createApp(App);

  app.use(Plugin)
    .use(Component)
    .use(Directive)
    .use(Router, () => app.mount('#app'))
    .use(Service)
    .use(Store);
});

