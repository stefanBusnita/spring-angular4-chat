import { routing } from './app.routing';
import { LogoutService } from './guard/logout.service';
import { AuthService } from './guard/auth.service';
import { LoginService } from './guard/login.service';
import { StompConnectionServiceService } from './stomp/stomp-connection-service.service';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing
  ],
  providers: [StompConnectionServiceService, LoginService, AuthService, LogoutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
