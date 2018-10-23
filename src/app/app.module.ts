import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RouterModule,Routes} from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { SignupPageComponent } from './signup-page/signup-page.component';
import { HomeComponent } from './home/home.component';
import { ArticleDetailsComponent} from './home/article-details/article-details.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { JwtInterceptor } from './jwt.interceptors';
import { AlertService } from './alert.service';
import { AuthenticationService } from './authentication.service';
import { UserService } from './user.service';
import { AuthGuard } from './auth.guard';
import { NewarticleComponent } from './newarticle/newarticle.component';

const appRoutes: Routes = [
  { path: 'loginpage', component: LoginPageComponent },
  {path:'signuppage',component:SignupPageComponent},
  {path:'homepage',component:HomeComponent},
  {path:'article/:',component:ArticleDetailsComponent},
  {path:'postarticle',component:NewarticleComponent},
  {path:'',redirectTo:"/homepage",pathMatch:"full"}
];
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginPageComponent,
    SignupPageComponent,
    HomeComponent,
    ArticleDetailsComponent,
    NewarticleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AlertService,
    AuthenticationService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
