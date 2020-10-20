export function CompareById(obj1: any, obj2: any) {
  if (obj1?.id && obj2?.id) {
    return obj1.id === obj2.id;
  } else {
    return false;
  }

}
