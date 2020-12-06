import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user/user.model';
import { environment } from 'src/environments/environment';
import { UserService } from '../user/user.service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInUser: User;
  private token: string;

  private localStorageKeys = {
    token: 'theToken',
    user: 'theUser'
  };

  loggedInUserSubject: BehaviorSubject<User>;
  tokenSubject: BehaviorSubject<string>;

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {
    this.loggedInUserSubject = new BehaviorSubject(this.loggedInUser);
    this.tokenSubject = new BehaviorSubject(this.token);
  }

  getToken() {
    return this.token || null;
  }

  getUserId() {
    return this.loggedInUser?.id || null;
  }

  async doLoginByEmailPassword(email: string, password: string): Promise<string> {
    try {
      const url = `${environment.apiHost}auth/login-local`;
      const postData = {
        email,
        password
      };
      const loginData: any = await this.httpClient.post(url, postData).toPromise();

      if (loginData.data) {
        const authData = this.parseAuthData(loginData.data);
        this.saveAuthData(authData.token, authData.user);
        return 'success';
      } else {
        return 'Login Error, contact administrator';
      }
    } catch (e) {
      console.log(e);
      return e.error.message;
    }

  }

  saveAuthDataFromSocialLogin(data: string) {
    const authData = this.parseAuthData(data);
    this.saveAuthData(authData.token, authData.user);
  }

  clearAuthData() {
    this.saveAuthData(null, null);
  }

  private parseAuthData(data: string) {
    data = atob(data);
    const authData = JSON.parse(data);
    if (!authData.token || !authData.user) {
      throw new Error('Login error, contact administrator');
    }
    return {
      token: authData.token,
      user: this.userService.mapResponseToUserModel(authData.user)
    };
  }

  private saveAuthData(token: string, user: User) {
    this.token = token;
    this.loggedInUser = user;

    this.tokenSubject.next(this.token);
    this.loggedInUserSubject.next(this.loggedInUser);

    if (this.token && this.loggedInUser) {
      localStorage.setItem(this.localStorageKeys.token, this.token);
      localStorage.setItem(this.localStorageKeys.user, JSON.stringify(this.loggedInUser));
    } else {
      localStorage.removeItem(this.localStorageKeys.token);
      localStorage.removeItem(this.localStorageKeys.user);
    }
  }

  checkForExistingAuthData() {
    const token = localStorage.getItem(this.localStorageKeys.token);
    const user = localStorage.getItem(this.localStorageKeys.user);

    if (!token || !user) {
      return;
    }

    const decodedToken: any = jwt_decode(token);

    if (!decodedToken.exp) {
      return;
    }

    if (Date.now() >= decodedToken.exp * 1000) {
      return;
    }

    this.saveAuthData(token, JSON.parse(user));
  }

  async doRegister(firstName, lastName, email, password) {
    const postData = {
      firstName,
      lastName,
      email,
      password
    };
    const url = `${environment.apiHost}users/register`;
    return this.httpClient.post(url, postData).toPromise();
  }


}
