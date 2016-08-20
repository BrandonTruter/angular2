import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  isLoggedin: boolean;

  constructor(private _http:Http, public _auth: AuthService) {

  }

  loginfn(username:string, password:string) {
    this.isLoggedin = false;
    var headers = new Headers();
    var creds = 'username=' + username + '&password=' + password;
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return new Promise((resolve) => {
      this._http.post('http://userservice.staging.tangentmicroservices.com:80/api-token-auth/', creds, {headers: headers}).subscribe((data) => {
        let token = data.json().token;
          if (token) {
            this._auth.setAuthToken(token);
            this._auth.setCurrentUser(username);

            this.isLoggedin = true;}
          resolve(this.isLoggedin)
        }
      )
    })
  }


  // login(username, password): Observable<boolean> {
  //
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/x-www-form-urlencoded');
  //   let url = 'http://userservice.staging.tangentmicroservices.com:80/api-token-auth/';
  //   let body = JSON.stringify({ username: username, password: password });
  //
  //   return this._http.post(url, body, {headers: headers})
  //     .map((response: Response) => {
  //       // login successful if there's a jwt token in the response
  //       let token = response.json() && response.json().token;
  //       if (token) {
  //         // set token property
  //
  //         this._auth.setAuthToken(token);
  //
  //
  //         // store username and jwt token in local storage to keep user logged in between page refreshes
  //         this._auth.setCurrentUser(username);
  //         // localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
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
    this._auth.removeAuthToken();
  }

}
