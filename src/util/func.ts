import { isFunction } from 'lodash'

import { flattenArrayable } from './array'

/**
 * Call the function
 */
export function invoke(fn: Fn) {
  return fn()
}

/**
 * 条件为真，则调用函数并返回值，否则返回undefined
 *
 */
export function ifInvoke(condition: boolean, fn: Fn) {
  if (condition)
    return fn()

  return undefined
}

/**
 * 批量调用函数
 */
export function batchInvoke(...funcs: Nullable<Fn>[] | Nullable<Fn>[][]) {
  flattenArrayable(funcs).forEach(fn => isFunction(fn) && fn())
}

/**
 * 通过回调传递该值，并返回该值
 *
 * @example
 * ```
 * function createUser(name: string): User {
 *   return tap(new User, user => {
 *     user.name = name
 *   })
 * }
 * ```
 */
export function tap<T>(value: T, callback: (value: T) => void): T {
  callback(value)
  return value
}
