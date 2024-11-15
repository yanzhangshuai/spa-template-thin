import { isFunction, isNil, isNumber } from 'lodash-es'

import { assert } from './error'

interface EventHandlerType {
  eventId: number
  func   : Fn
  once   : boolean
}

export class EventEmitter {
  private static eventId = 100000

  private static events: Recordable<EventHandlerType[]> = {}

  /**
   * add event listener to the event
   * @param key event name
   * @param handler event handler
   * @param once  if true, remove the event after emit
   * @returns event id
   */
  private static add(key: string, handler: Fn, once: boolean): number {
    assert(isFunction(handler), 'handler must be a function') //  handler must be a function

    const eventId = this.eventId++
    // 判断 type 事件对应的队列是否存在
    if (!this.events[key]) {
      this.events[key] = []
    }

    this.events[key]!.push({ eventId, func: handler, once })

    return eventId
  }

  /**
   * add event listener to the event
   */
  static on(key: string, handler: Fn): number {
    return this.add(key, handler, false)
  }

  /**
   * add event listener to the event only once
   */
  static once(key: string, handler: Fn): number {
    return this.add(key, handler, true)
  }

  /**
   * emit event to the event
   */
  static emit(key: string, ...params: any) {
    const handlers = this.events[key]

    handlers?.forEach(({ func: handler, once }) => {
      handler(...params)

      once && this.off(key, handler)
    })
  }

  /**
   * remove event listener from the event
   */
  static off(key: string, handler: Fn): boolean

  /**
   * remove  event listener from the eventId
   */
  static off(key: string, eventId: number): boolean

  /**
   * remove all event listeners from the event
   */
  static off(key: string): boolean

  static off(key: string, h?: number | Fn) {
    const handlers = this.events[key]

    if (!handlers)
      return false

    if (isNil(h)) {
      delete this.events[key]
      return true
    }

    const index = handlers.findIndex(item => isNumber(h) ? item.eventId === h : item.func === h)

    //  not found
    if (!~index)
      return false

    handlers.splice(index, 1)

    return true
  }
}
