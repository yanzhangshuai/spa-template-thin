export function defineService<T>(v: T) {
  return () => v
}
