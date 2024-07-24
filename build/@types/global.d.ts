declare type Fn<T = any, R = T> = (...args: any[]) => R

declare type Recordable<T = any> = Record<string, T>
