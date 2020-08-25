import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  constructor() { }

  getFormDataFromObject(obj: any): FormData {
    const formData = new FormData();
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        formData.append(key, obj[key]);
      }
    }
    return formData;
  }
}
