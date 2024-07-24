import { mount } from '@vue/test-utils'
import { describe, it } from 'vitest'
import { createVNode } from 'vue'

import ConfigProvider from '@/component/config-provider/index.vue'

describe('config-provider', () => {
  it('component exist', () => {
    expect(ConfigProvider).toBeTruthy()
  })

  it('slots', () => {
    const text = 'default slot'
    const wrapper = mount(ConfigProvider, {
      slots: {
        default: () => createVNode('h1', { class: 'slot' }, text),
      },
    })
    expect(wrapper.find('.slot').text()).toEqual(text)
  })
})
