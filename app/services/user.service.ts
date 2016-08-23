import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  isLoggedin: boolean = false;

  constructor(private _http:Http, public _auth: AuthService) {
    if (this._auth.getAuthToken()) {
      this.isLoggedin = true;
    }
  }

  loginfn(username:string, password:string) {
    let creds = 'username=' + username + '&password=' + password;

    return new Promise((resolve) => {
      this._http.post(this._auth.getEndpoint(), creds, {headers: this._auth.getHeader()})
        .subscribe((data) => {
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

  logout(): void {
    this._auth.removeAuthToken();
  }

}
