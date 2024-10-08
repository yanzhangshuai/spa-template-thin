/**
 * Promise, or maybe not
 */
declare type Awaitable<T> = T | PromiseLike<T>

/**
 * Null or whatever
 */
declare type Nullable<T> = T | null | undefined

/**
 * Array, or not yet
 */
declare type Arrayable<T> = T | Array<T>

/**
 * Constructor
 */
declare type Constructor<T = void> = new (...args: any[]) => T

/**
 * Infers the element type of an array
 */
declare type ElementOf<T> = T extends (infer E)[] ? E : never

/**
 * Defines an intersection type of all union items.
 *
 * @param U Union of any types that will be intersected.
 * @returns U items intersected
 * @see https://stackoverflow.com/a/50375286/9259330
 */
declare type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never

/**
 * Infers the arguments type of a function
 */
declare type ArgumentsType<T> = T extends ((...args: infer A) => any) ? A : never

declare type MergeInsertions<T> =
    T extends object
      ? { [K in keyof T]: MergeInsertions<T[K]> }
      : T

declare type DeepMerge<F, S> = MergeInsertions<{
  [K in keyof F | keyof S]: K extends keyof S & keyof F
    ? DeepMerge<F[K], S[K]>
    : K extends keyof S
      ? S[K]
      : K extends keyof F
        ? F[K]
        : never
}>

/**
 * writeable properties of an object
 */
declare type Writable<T> = {
  -readonly [P in keyof T]: T[P]
}

/**
 * deep writeable properties of an object
 */
declare type DeepWritable<T> = {
  -readonly [K in keyof T]: keyof T[K] extends undefined ? T[K] : DeepWritable<T[K]>
}

/**
 * deep readonly properties of an object
 */
declare type DeepReadonly<T> = {
  readonly [K in keyof T]: keyof T[K] extends undefined ? T[K] : DeepReadonly<T[K]>
}

/**
 * deep partial properties of an object
 */
declare type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

/**
 * settimeout return type
 */
declare type Timeout = ReturnType<typeof setTimeout>

/**
 * setInterval return type
 */
declare type Timer = ReturnType<typeof setInterval>

/**
 * string keys of an object
 */
declare type Recordable<T = any> = Record<string, T>

/**
 * not object type
 */
declare type ValueType = string | number | boolean | undefined | null | symbol

/**
 * indexable type
 */
declare type IndexableType = string | number | symbol

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }

/**
 *  type without keys of U
 */
declare type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U

/**
 * function type with arguments and return type
 */
declare type Fn<T = any, R = T> = (...args: any[]) => R

/**
 * Promise function type with arguments and return type
 */
declare type PromiseFn<T = any, R = T> = (...arg: Array<T>) => Promise<R>

declare type TargetContext = '_self' | '_blank'

declare type ExcludesFalse = <T>(x: Nullable<T> | false) => x is T

declare type ExtractPromiseType<T> = T extends Promise<infer R> ? R : never

type ComponentExports<D extends (...p: any[]) => any> = import('vue').ComponentPublicInstance &
  Parameters<NonNullable<NonNullable<ReturnType<D>['__ctx']>['expose']>>[0]
