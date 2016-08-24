import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

const STORAGE_KEY = 'token';

@Injectable()
export class AuthService {
  token: string;

  constructor(private http: Http) { }

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

}
