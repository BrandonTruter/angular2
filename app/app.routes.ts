/**
 * Created by brandon on 2016/08/20.
 */

import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/index';
import { ProjectsComponent } from './projects/index';

// Route config let's you map routes to components
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: ProjectsComponent, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(routes);
