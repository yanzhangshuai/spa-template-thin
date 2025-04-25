import { defineDirective } from '@/utils/define'

export default defineDirective({
  mounted(el: HTMLInputElement): void {
    el.addEventListener('keydown', (options) => {
      if (/^[a-z,]$/i.test(options.key)) {
        el.value = el.value.replace(/D/g, '')
        options.preventDefault()
      }
    })
  },
})
