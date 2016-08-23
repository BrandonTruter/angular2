import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routes';
import { AppComponent }  from './app.component';
import { LoginComponent }  from './login/login.component';
import { ProjectsComponent } from './projects/projects.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { UserService } from './services/user.service';
import { ProjectService } from './services/projects.service';

@NgModule({
  imports: [
    BrowserModule, FormsModule, HttpModule, routing
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    ProjectsComponent
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    ProjectService
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
