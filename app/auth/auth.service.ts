import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";

const STORAGE_KEY = 'token';

@Injectable()
export class AuthService {
  token: string;
  private loginUrl = 'http://userservice.staging.tangentmicroservices.com:80/api-token-auth/';
  constructor(private http: Http) { }

  generateToken(username:string, password:string): Observable<string> {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let body = 'username=' + username + '&password=' + password;

    return this.http.post(this.loginUrl, body, {headers: headers})
      .map((response: Response) => {
        let token = response.json().token;

        if (token) {
          this.storeCredentials(username, token);
          return token;
        } else {
          return "no token found";
        }
      });
  }

  storeCredentials(username: string, token: string) {
    this.token = token;
    localStorage.setItem('token', token);
    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
  }

  getEndpoint() {
    let baseURI = 'http://userservice.staging.tangentmicroservices.com';
    let authURI = '/api-token-auth/';
    let port = ':80';
    return `${baseURI}${port}${authURI}`;
  }

  getHeader() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return headers;
  }

  hasToken() {
    return localStorage.getItem(STORAGE_KEY) !== undefined ? true : false;
  }

  getToken() {
    return localStorage.getItem(STORAGE_KEY);
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem(STORAGE_KEY, token);
  }

  removeToken() {
    this.token = null;
    localStorage.removeItem(STORAGE_KEY);
  }
}

// logout(): void {
//   // clear token remove user from local storage to log user out
//   this.token = null;
//   localStorage.removeItem('currentUser');
// }

// getAuthToken() {
//   return localStorage.getItem('token');
// }

// setAuthToken(token: string) {
// this.token = token;
//   localStorage.setItem('token', token);
// }

// removeAuthToken() {
// this.token = null;
// localStorage.removeItem('token');
// localStorage.removeItem('currentUser');
// }

// getCurrentUser() {
//   JSON.parse(localStorage.getItem('currentUser'));
// }

// setCurrentUser(username: string) {
//   localStorage.setItem('currentUser', JSON.stringify({ username: username, token: this.token }));
// }
