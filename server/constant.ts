export const isProduction = process.env.NODE_ENV === 'production'
export const isDev = !isProduction
export const apiBase = isDev
  ? 'https://server.huiyi.asia/api/v2'
  : 'http://localhost:2333/api/v2/'
