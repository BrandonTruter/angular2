# Angular2 Tangent Practical Assessment

This repository was created from the quickstart source found at [angular.io quickstart](https://angular.io/docs/ts/latest/quickstart.html)

## Getting started


### Installation

Run scripts:

```shell
npm install
npm start
```

Browse to: 
```
=>  http://localhost:3000/
=>  http://172.20.10.2:3000/
=>  http://172.20.10.2:3001/
```


### Development


```
=>  Service updates
=>  Resposive Styling
=>  Code improvements
=>  Jasmine Unit Test
```


### Service Updates
    ```````````````


      TODO ->   SERVICES PASSED


    GET /api/v1/projects/{pk}/
    
            √   {"pk":2,"title":"Wayne Enterprises Mobile Apps","description":"An app for spelunking fans","start_date"
                :"2015-02-18","end_date":null,"is_billable":true,"is_active":true,"task_set":[],"resource_set":[]}
            
            
    POST /api/v1/projects/      
            
            √   {"pk":49,"title":"first test","description":"testing projects","start_date":"2015-02-18","end_date":"2015-05-18"
                ,"is_billable":true,"is_active":true,"task_set":[],"resource_set":[]}
            
            
      TODO ->   SERVICES FAILED
            
                  
PUT /api/v1/projects/{pk}/        PATCH /api/v1/projects/{pk}/   

        
{"start_date":["Date has wrong format. Use one of these formats instead: YYYY[-MM[-DD]]."],
"end_date" :  ["Date has wrong format. Use one of these formats instead: YYYY[-MM[-DD]]."]}
            
            
DELETE /api/v1/projects/{pk}/

XML Parsing Error: no element found Location: moz-nullprincipal:{cf4ddfe0-8853-8b44-80ae-6af9ff90c6f4} 
Line Number 1, Column 1:

            
            
      TODO ->   RESPONSE
            
            
description   "testing projects"
end_date      "2015-05-18"
is_active     true
is_billable   true
pk            49
resource_set  []
start_date    "2015-02-18"
task_set      []
title         "first test"
               
            
            
            
            √   
            
            √   
                  
                  
      TODO ->   Replace Promises with Observables
            

            
       
      TODO ->   Fix authentication for Chrome + Safari 

            √   
            
            √   
            
            √   
            
            
      TODO ->   Complete project functionality
            
            √   
            
            √   
            
            √   
                  
                  
      TODO ->   Replace Promises with Observables
            

                 
            

##  Responsive Design
    ``````````````````

      TODO ->   
            
            √   
            
            √   
            
            √   
                  
      TODO ->  
            
            √   
            
            √   
            
            √   
                  
      TODO ->  
      
            √   
            
            √   
            
            √   
                  
                  
## Refactoring
   ````````````

      TODO ->   
            
            √   
            
            √   
            
            √   
                  
      TODO ->  
            
            √   
            
            √   
            
            √   
                  
      TODO ->  
      
            √   
            
            √   
            
            √   
                  
                  
## Tests
   ```````

      TODO ->   
            
            √   
            
            √   
            
            √   
                  
      TODO ->  
            
            √   
            
            √   
            
            √   
                  
      TODO ->  
      
            √   
            
            √   
            
            √   
                  
      
     
     
     
     
<script src="node_modules/angular2/bundles/angular2.dev.js"></script>
<script src="node_modules/angular2/bundles/router.dev.js"></script>
<script src="node_modules/angular2/bundles/http.dev.js"></script>
      
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/css/materialize.min.css">
<link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
 
<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/js/materialize.min.js"></script>    
      
   
 logout() {
        window.localStorage.removeItem('auth_key');
        this._router.navigate(['Login']);
    }



<button (click) = "logout()">Logout</button>


    loginfn(usercreds) {
        this.isLoggedin = false;
        var headers = new Headers();
        var creds = 'name=' + usercreds.username + '&password=' + usercreds.password;
        headers.append('Content-Type', 'application/X-www-form-urlencoded');
        return new Promise((resolve) => {
        this._http.post('http://localhost:3333/authenticate', creds, {headers: headers}).subscribe((data) => {
            if(data.json().success) {
                window.localStorage.setItem('auth_key', data.json().token);
                this.isLoggedin = true;}
                resolve(this.isLoggedin)
            }
        )
        
        })
    }

export class User {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
}


import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
 
@Injectable()
export class AuthenticationService {
    public token: string;
 
    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }
 
    login(username, password): Observable<boolean> {
        return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;
 
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
 
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }
 
    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}





import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
 
import { AuthenticationService } from '../_services/index';
import { User } from '../_models/index';
 
@Injectable()
export class UserService {
    private token: string;
 
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    }
 
    getUsers(): Observable<User[]> {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });
 
        // get users from api
        return this.http.get('/api/users', options)
            .map((response: Response) => response.json());
    }
}



<div class="col-md-6 col-md-offset-3">
    <div class="alert alert-info">
        Username: test<br />
        Password: test
    </div>
    <h2>Login</h2>
    <form name="form" (ngSubmit)="f.form.valid && login()" #f="ngForm" novalidate>
        <div class="form-group" [ngClass]="{ 'has-error': f.submitted && !username.valid }">
            <label for="username">Username</label>
            <input type="text" class="form-control" name="username" [(ngModel)]="model.username" #username="ngModel" required />
            <div *ngIf="f.submitted && !username.valid" class="help-block">Username is required</div>
        </div>
        <div class="form-group" [ngClass]="{ 'has-error': f.submitted && !password.valid }">
            <label for="password">Password</label>
            <input type="password" class="form-control" name="password" [(ngModel)]="model.password" #password="ngModel" required />
            <div *ngIf="f.submitted && !password.valid" class="help-block">Password is required</div>
        </div>
        <div class="form-group">
            <button [disabled]="loading" class="btn btn-primary">Login</button>
            <img *ngIf="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
        </div>
        <div *ngIf="error" class="alert alert-danger">{{error}}</div>
    </form>
</div>


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
import { AuthenticationService } from '../_services/index';
 
@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})
 
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';
 
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) { }
 
    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }
 
    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(result => {
                if (result === true) {
                    // login successful
                    this.router.navigate(['/']);
                } else {
                    // login failed
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            });
    }
}
