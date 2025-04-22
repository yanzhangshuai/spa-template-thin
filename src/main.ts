import Store from '@/store'
import Plugin from '@/plugin'
import Router from '@/router'
import { createApp } from 'vue'
import Service from '@/service'
import App from '@/page/app.vue'
import 'virtual:uno.css'

import './app.less'

preloadConfig().then((_) => {
  const app = createApp(App)

  app.use(Plugin)
    .use(Service)
    .use(Store)
    .use(Router, () => app.mount('#app'))
})

// fetch 获取json
function preloadConfig(path = '/config.json'): Promise<unknown> {
  return fetch(path, { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } })
    .then((response) => {
      return response.json()
    })
    .catch((error) => {
      console.error('error', error)
    })
}
