import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  moduleId: module.id,
  templateUrl: 'login.template.html',
  providers: [UserService]
})

export class LoginComponent {
  loading = false;
  error = '';

  localUser = {
    username: '',
    password: ''
  };

  constructor(
    private router: Router,
    private userService: UserService) {}

  login() {
    this.userService.loginfn(this.localUser.username, this.localUser.password).then((res) => {
      if(res) {
        this.router.navigate(['projects']);
      }
      else {
        console.log(res);
        this.error = 'Username or password is incorrect';
        this.loading = false;
      }
    })
  }

  clear() {
    this.localUser.username = '';
    this.localUser.password = '';
  }

}
