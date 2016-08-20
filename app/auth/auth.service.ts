/**
 * Created by brandon on 2016/08/20.
 */

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';


const STORAGE_KEY = 'auth_key';


@Injectable()
export class AuthService {
  // public token: string;

  constructor(private http: Http) {
    // set token if saved in local storage
    // var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // this.token = currentUser && currentUser.token;
  }

  // login(username, password): Observable<boolean> {
  //   return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))
  //     .map((response: Response) => {
  //       // login successful if there's a jwt token in the response
  //       let token = response.json() && response.json().token;
  //       if (token) {
  //         // set token property
  //         this.token = token;
  //
  //         // store username and jwt token in local storage to keep user logged in between page refreshes
  //         localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
  //
  //         // return true to indicate successful login
  //         return true;
  //       } else {
  //         // return false to indicate failed login
  //         return false;
  //       }
  //     });
  // }

  logout(): void {
    // clear token remove user from local storage to log user out
    // this.token = null;
    localStorage.removeItem('currentUser');
  }


  getAuthToken() {
    return localStorage.getItem(STORAGE_KEY);
  }

  setAuthToken(token: string) {
    // this.token = token;
    localStorage.setItem(STORAGE_KEY, token);
  }

  removeAuthToken() {
    // this.token = null;
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('currentUser');
  }

  setCurrentUser(username: string) {
    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: this.getAuthToken() }));
  }



}
