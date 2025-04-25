interface ISingleton<T> {
  new (...params: any[]): T
}

export class Singleton {
  private static instances: Map<ISingleton<any> | string | symbol, any> = new Map()

  static make<T>(Instance: ISingleton<T>, key: string): T

  static make<T>(Instance: ISingleton<T>, key: symbol): T

  static make<T>(Instance: ISingleton<T>): T

  static make<T>(Instance: ISingleton<T>, key?: string | symbol): T {
    const k = key || Instance

    if (!this.instances.has(k)) {
      this.instances.set(k, new Instance())
    }

    return this.instances.get(k)
  }
}
