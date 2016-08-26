import { Component }   from '@angular/core';
import { Router }      from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  moduleId: module.id,
  template: `
      <div class="center-div">
        <div class="card small">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src="app/assets/TangentLogo.png" height="120" width="447"/>
          </div>
      
          <div class="card-content">
            <span class="card-title">Login</span>
            <p>Click to reveal</p>
          </div>
      
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">Login<i class="material-icons right">close</i></span>
            <div class="input-field">
              <input id="user_name" type="text" class="validate" [(ngModel)]="localUser.username" required autofocus>
              <label for="user_name">Username</label>
            </div>
            <div class="input-field">
              <input id="password" type="password" class="validate" [(ngModel)]="localUser.password" required
                     (keydown.enter)="submit()">
              <label for="password">Password</label>
            </div>
      
            <button class="waves-effect waves-light btn" (click)="authenticate()">Authenticate</button>
            <button class="waves-effect waves-light btn" (click)="loginUser()">Login User</button>
            <button class="waves-effect waves-light btn" (click)="login()">Login</button>
            <button class="waves-effect waves-light btn" (click)="clear()">Clear</button>
      
          </div>
        </div>
      
        <div class="has-error" *ngIf="errorMessage">
          <span class="help-block">{{ errorMessage }}</span>
        </div>
      </div>
  `,
  providers: [UserService]
})

export class LoginComponent {
  private apiKey: string;
  public errorMessage: string;
  localUser = { username: '', password: '' };
  constructor(private router: Router, private userService: UserService){ }

  login() {
    this.userService.authenticate(this.localUser.username, this.localUser.password)
      .then((res) => { this.router.navigate(['projects']); })
      .catch(err => { console.log(err) });
  }

  loginUser() {
    this.userService.login(this.localUser);
  }

  authenticate() {
    this.userService.generateApiKey(this.localUser.username, this.localUser.password)
      .subscribe(
        data => this.apiKey = data,
        error => this.errorMessage = error.json()['non_field_errors'],
        () => { if (this.apiKey) { this.goToProjects(); } }
      );
  }

  clear() {
    this.localUser.username = '';
    this.localUser.password = '';
  }

  goToProjects() {
    this.router.navigate(['projects/index'])
  }

}
