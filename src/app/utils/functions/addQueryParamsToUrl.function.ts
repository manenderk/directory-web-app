export function addQueryParamsToUrl(url: string, obj: any) {
  if (!obj) {
    return url;
  }

  const params = new URLSearchParams();
  Object.keys(obj).forEach(key => {
    if (obj[key]) {
      if (typeof obj[key] === 'object') {
        params.set(key, JSON.stringify(obj[key]));
      } else {
        params.set(key, obj[key]);
      }
    }


  });

  return url + '?' + params.toString();
}
