import { Injectable }    from '@angular/core';
import { AuthService }   from '../auth/auth.service';
import { Http, Headers } from '@angular/http';

const STORAGE_KEY = 'token';

@Injectable()
export class UserService {
  isLoggedIn: boolean = false;

  constructor(private auth: AuthService, private http: Http) {}

  authenticate(username:string, password:string) {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let body = 'username=' + username + '&password=' + password;

    return new Promise((resolve) => {
      this.http.post(this.auth.getEndpoint(), body, {headers: headers})
        .subscribe((data) => {

          let apiKey = data.json().token;

          if (apiKey) {
            this.auth.setToken(apiKey);
            this.isLoggedIn = true;
          }
          else {
            this.isLoggedIn = false;
          }

          resolve(this.isLoggedIn);
      })
    })
  }

  getToken() {
    return this.auth.getToken();
  }

}
