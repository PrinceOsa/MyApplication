import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    FooterComponent,
    DashboardComponent,
    SignupComponent,
    LogoutComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'Home', component: HomeComponent},
      {path: 'Dashboard', component: DashboardComponent,  canActivate:[AuthGuard]},
      {path: 'Logout', component: LogoutComponent,   canActivate:[AuthGuard]    },
      {path: 'Login', component: LoginComponent},
      {path: 'Signup', component: SignupComponent},
      {path: ' ', component: HomeComponent},
    ]),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
