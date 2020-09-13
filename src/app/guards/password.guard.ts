import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordGuard implements CanActivate {

  password = 'vishal';

  canActivate(
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let isAllowed = false;

    const localPassword = localStorage.getItem('pass');

    if (!localPassword) {
      isAllowed = this.askPassword();
    } else if (localPassword !== this.password) {
      isAllowed = this.askPassword();
    } else {
      isAllowed = true;
    }

    return isAllowed;

  }

  askPassword(): boolean {
    const userPassword = prompt('Enter password');
    if (userPassword && userPassword === this.password)  {
      localStorage.setItem('pass', userPassword);
      return true;
    } else {
      alert('Wrong Password');
      return false;
    }
  }

}
