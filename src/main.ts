import 'windi.css';
import { createApp } from 'vue';
import Service from './service';
import Store from '@/store';
import Plugin from '@/plugin';
import Component from '@/component';
import Directive from '@/directive';
import Router from '@/router';
import App from '@/page/app.vue';
import '@/asset/style/index.less';

const app = createApp(App);

app.use(Plugin)
  .use(Component)
  .use(Directive)
  .use(Router, () => app.mount('#app'))
  .use(Service)
  .use(Store);
