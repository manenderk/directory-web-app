import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { User } from '../models/user/user.model';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, OnDestroy {

  token: string;
  user: User;

  private subSink = new SubSink();

  constructor(
    private authService: AuthService
  ) {
    this.subSink.sink = this.authService.tokenSubject.subscribe(token => {
      this.token = token;
    })

    this.subSink.sink = this.authService.loggedInUserSubject.subscribe(user => {
      this.user = user;
    })
  }


  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.token && this.user?.role === 'admin') {
        return true;
      } else {
        return false;
      }

  }

}
