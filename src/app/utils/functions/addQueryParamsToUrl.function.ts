export function addQueryParamsToUrl(url: string, obj: any) {
  if (!obj) {
    return url;
  }

  const params = new URLSearchParams();
  Object.keys(obj).forEach(key => {
    params.set(key, obj[key]);
  });

  return url + '?' + params.toString();
}
