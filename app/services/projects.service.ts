/**
 * Created by brandon on 2016/08/20.
 */

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../auth/auth.service';

// import { User } from '../_models/index';

@Injectable()
export class ProjectService {
  // private token: string;

  constructor(
    private http: Http,
    private authService: AuthService) {
  }

  // getUsers(): Observable<User[]> {
  //   // add authorization header with jwt token
  //   let headers = new Headers({ 'Authorization': 'Bearer ' + this.authService.token });
  //   let options = new RequestOptions({ headers: headers });
  //
  //   // get users from api
  //   return this.http.get('/api/users', options)
  //     .map((response: Response) => response.json());
  // }
}
