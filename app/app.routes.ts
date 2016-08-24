/**
 * Created by brandon on 2016/08/20.
 */

import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/index';
import { ProjectsComponent } from './projects/projects.component';
import { NewProjectComponent } from './projects/new.component';
import { ShowProjectComponent } from './projects/show.component';
import { EditProjectComponent } from './projects/edit.component';

// Route config let's you map routes to components
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
  { path: 'newProject', component: NewProjectComponent, canActivate: [AuthGuard] },
  { path: 'projects/:id', component: ShowProjectComponent, canActivate: [AuthGuard] },
  { path: 'editProject/:pk', component: EditProjectComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }
];

export const routing = RouterModule.forRoot(routes);
