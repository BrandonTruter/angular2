/**
 * Created by brandon on 2016/08/20.
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';

@Component({
  moduleId: module.id,
  templateUrl: 'login.template.html',
  providers: [UserService]
})

export class LoginComponent {

  // model: any = {};
  loading = false;
  error = '';

  localUser = {
    username: '',
    password: ''
  };

  constructor(
    private router: Router,
    private userService: UserService) { }

  // ngOnInit() {
  //   // reset login status
  //   this.userService.logout();
  // }

  login() {
    this.userService.loginfn(this.localUser.username, this.localUser.password).then((res) => {
      if(res) {
        this.router.navigate(['Projects']);
      }
      else {
        console.log(res);
        this.error = 'Username or password is incorrect';
        this.loading = false;
      }
    })
  }

  // login() {
  //   this.loading = true;
  //   this.userService.login(this.model.username, this.model.password)
  //     .subscribe(result => {
  //       if (result === true) {
  //         this.router.navigate(['/projects']);
  //       } else {
  //         this.error = 'Username or password is incorrect';
  //         this.loading = false;
  //       }
  //     });
  // }

  clear() {
    this.localUser.username = '';
    this.localUser.password = '';
  }

}
