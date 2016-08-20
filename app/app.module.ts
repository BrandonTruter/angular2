import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing }        from './app.routes';
import { AppComponent }  from './app.component';
import { LoginComponent }  from './login/index';
import { ProjectsComponent } from './projects/index';
import { AuthService, AuthGuard} from './auth/index';
import { UserService, ProjectService } from './services/index';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
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
