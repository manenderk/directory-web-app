import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VariableService {

  toggleScreenType = ['xs', 'sm'];
  toggleScreenTypeDesktop = ['xs', 'sm', 'md'];


  constructor() { }


}
