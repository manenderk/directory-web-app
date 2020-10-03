export function getQueryParamString(obj: any): string {

  const params = new URLSearchParams();

  Object.keys(obj).forEach(key => {
    params.set(key, obj[key]);
  });

  return params.toString();
}
