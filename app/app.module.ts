import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routes';
import { AppComponent }  from './app.component';
import { LoginComponent }  from './login/login.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectsIndexComponent } from './projects/index.component';
import { NewProjectComponent } from './projects/new.component';
import { ShowProjectComponent } from './projects/show.component';
import { EditProjectComponent } from './projects/edit.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { UserService } from './services/user.service';
import { ProjectService } from './services/projects.service';


@NgModule({
  imports: [
    BrowserModule, FormsModule, HttpModule, routing
  ],
  declarations: [
    AppComponent, LoginComponent, ProjectsComponent,
    ProjectsIndexComponent, NewProjectComponent, ShowProjectComponent, EditProjectComponent
  ],
  providers: [
    AuthService, AuthGuard, UserService, ProjectService
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
