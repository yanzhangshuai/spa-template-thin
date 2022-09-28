import type { Plugin } from 'vue';

import { createAsker } from '@mwjz/asker';

import config from '@/config/index';

import { setupInterceptor } from './interceptor/index';

const HttpPlugin: Plugin = {
  install() {
    create();
  }
};

export default HttpPlugin;

function create() {
  const asker = createAsker({
    request: {
      ignoreCancelToken: false,
      baseURL: config.API_BASE_URL,
      uploadBaseUrl: config.UPLOAD_BASE_URL
    }
  });

  setupInterceptor(asker.interceptor);
}

