import type { Plugin } from 'vue'

import { defineX } from '@/util/module'

export default defineX<Plugin>({
  install() {
    setup()
  },
})

function setup() {
  // setupInterceptor(axios.interceptors);
}
