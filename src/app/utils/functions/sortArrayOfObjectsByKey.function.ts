export function SortArrayOfObjectsByKey(obj: any[], key: string, ascending = true): any[] {

  if (!obj || obj.length === 0 || typeof obj[key] === 'undefined') {
    return obj;
  }
  if (typeof obj[0][key] === 'string' || typeof obj[0][key] === 'number') {
    return sortNormal(obj, key, ascending);
  }

}

function sortNormal(obj: any[], key: string, ascending: boolean) {
  if (ascending) {
    obj.sort((a: any, b: any) => {
      return a[key] < b[key] ? 1 : a[key] > b[key] ? -1 : 0;
    });
  } else {
    obj.sort((a: any, b: any) => {
      return a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
    });
  }
  return obj;
}
