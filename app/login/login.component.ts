import { Component }   from '@angular/core';
import { Router }      from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  moduleId: module.id,
  templateUrl: 'login.template.html',
  providers: [UserService]
})

export class LoginComponent {

  localUser = { username: '', password: '' };

  constructor(private router: Router, private userService: UserService){ }

  login() {
    this.userService.authenticate(this.localUser.username, this.localUser.password)
      .then((res) => { this.router.navigate(['projects']); })
      .catch(err => { console.log(err); });
  }

  clear() {
    this.localUser.username = '';
    this.localUser.password = '';
  }

}
