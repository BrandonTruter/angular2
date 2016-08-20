/**
 * Created by brandon on 2016/08/20.
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  moduleId: module.id,
  templateUrl: 'projects.template.html'
})

export class ProjectsComponent {
  constructor(private _router:Router){

  }

  logout() {
    window.localStorage.removeItem('auth_key');
    this._router.navigate(['Login']);
  }
}
