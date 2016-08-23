import { Component } from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

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
