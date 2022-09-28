import { createVNode } from 'vue';

import { mount } from '@vue/test-utils';

import ConfigProviderComponent from '@/component/modules/config-provider';

describe('config-provider', () => {
  it('component exist', () => {
    expect(ConfigProviderComponent).toBeTruthy();
  });

  it('slots', () => {
    const text = 'default slot';
    const wrapper = mount(ConfigProviderComponent, {
      slots: {
        default: () => createVNode('h1', { class: 'slot' }, text)
      }
    });
    expect(wrapper.find('.slot').text()).toEqual(text);
  });
});
