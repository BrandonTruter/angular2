import { Component } from '@angular/core';

import './helpers/rxjs-extentions';

@Component({
  moduleId: module.id,
  selector: 'tangent-app',
  template: `
      <div class="jumbotron">
        <div class="container">
          <div class="col-sm-8 col-sm-offset-2">
            <router-outlet></router-outlet>
          </div>
        </div>
      </div>
  `
})

export class AppComponent { }
