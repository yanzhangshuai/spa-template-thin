export const devConf = {
  port : 3010,
  open : false,
  https: false,
  proxy: {
    '/api': 'https://api.mwjz.live',
  },
}

export const buildConf = {

}

export function defineX<T>(val: T) {
  return val
}
