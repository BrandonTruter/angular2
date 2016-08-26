import { Injectable }    from '@angular/core';
import { AuthService }   from '../auth/auth.service';
import { Http, Headers, Response } from '@angular/http';
import { Router }      from '@angular/router';
import { Observable } from "rxjs/Observable";

const STORAGE_KEY = 'token';

@Injectable()
export class UserService {
  isLoggedIn: boolean = false;
  public token: string;
  private loginUrl = 'http://userservice.staging.tangentmicroservices.com:80/api-token-auth/';

  constructor(private router: Router, private auth: AuthService, private http: Http) {}

  login(authParams: any) {
    this.auth.generateToken(authParams.username, authParams.password)
      .subscribe((res) => { this.router.navigate(['projects/index']) })
  }

  generateApiKey(username:string, password:string): Observable<string> {
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

  storeCredentials(username: string, token: string) {
    this.token = token;
    localStorage.setItem('token', token);
    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
  }

}


