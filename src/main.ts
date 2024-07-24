import 'virtual:uno.css'
import '@/assets/styles/app.less'

import { createApp } from 'vue'

import Directive from '@/directive'
import App from '@/page/app.vue'
import Plugin from '@/plugin'
import Router from '@/router'
import Service from '@/service'
import Store from '@/store'

preloadConfig().then((config) => {
  const app = createApp(App)

  app.use(Plugin)
    .use(Directive)
    .use(Service)
    .use(Store)
    .use(Router, () => app.mount('#app'))
})

// fetch 获取json
function preloadConfig(path = '/config.json'): Promise<unknown> {
  return fetch(path, { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } })
    .then((response) => {
      return response.json()
    }).catch((error) => {
      console.error('error', error)
    })
}
