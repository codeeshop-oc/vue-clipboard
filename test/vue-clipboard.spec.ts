import { mount } from '@vue/test-utils'
import VueClipboard from '../src/components/VueClipboard.vue'
import { beforeEach, expect, test, it } from 'vitest'

test('component exists', async () => {
  let wrapper: any
  wrapper = mount(VueClipboard)
  expect(wrapper.find('.clipboard').exists()).toBe(true)
})

test('mount component', async () => {
  let wrapper: any

  wrapper = mount(VueClipboard)
  expect(wrapper.text()).toContain('')

  wrapper = mount(VueClipboard, {
    props: {
      text: 'Copy My Text'
    }
  })

  expect(wrapper.props()).toContain({ text: 'Copy My Text' })
})

test('all component props', async () => {
  let wrapper: any

  wrapper = mount(VueClipboard, {
    props: {
      text: 'Renew Me'
    }
  })

  expect(wrapper.props()).toEqual({
    text: 'Renew Me',
    logs: false,
    enableMilliSeconds: 5
  })
})

// test('trigger', async () => {
//   const wrapper = mount(VueClipboard, {
//     props: {
//       text: "Renew Me",
//       logs: true
//     },
//   });

//   // await wrapper.find('a').trigger('click')
//   expect(wrapper.setData({ toggleBtn: true }).toThrowError())
// })
