const config = (function build(): Configuration {
  return {
    APP_NAME: 'SPA-VUE-TEMPLATE',

    APP_LOGO: 'https://static.mwjz.live/image/logo/logo.png',

    APP_TITLE: 'title',

    APP_VERSION: import.meta.env.GLOBAL_APP_VERSION,

    API_BASE_URL: '/api',
    UPLOAD_BASE_URL: '/upload',
    FILE_BASE_URL: 'https://static.mwjz.live/'
  };
}());

export default config;

export function useConfig(): Configuration {
  return config;
}
