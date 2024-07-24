// fetch 获取json
export function preloadConfig(): Promise<unknown> {
  //  fetch 获取json
  const path = '/config.json';
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'

  };
  return fetch(path, { headers })
    .then((response) => {
      return response.json();
    }).catch((error) => {
      console.error('error', error);
    });
}
