import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }


  mapResponseToUserModel(res: any): User {
    const user: User = {
      ...res,
      id: res._id
    };
    return user;
  }
}
