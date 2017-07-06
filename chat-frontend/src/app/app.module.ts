import { FlashService } from './services/flash.service';
import { UiEventEmitterService } from './services/ui-event-emitter.service';
import { ChatParticipantsService } from './services/chat-participants.service';
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
import { ChatMessageItemComponent } from './chat-message-item/chat-message-item.component';
import { ChatMessageListComponent } from './chat-message-list/chat-message-list.component';
import { ActiveUsersListComponent } from './active-users-list/active-users-list.component';
import { ActiveUsersItemComponent } from './active-users-item/active-users-item.component';
import { HeaderComponent } from './header.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NoAtiveUsersComponent } from './active-users-item/no-ative-users.component';
import { FlashComponent } from './flash/flash.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ChatMessageItemComponent,
    ChatMessageListComponent,
    ActiveUsersListComponent,
    ActiveUsersItemComponent,
    HeaderComponent,
    NoAtiveUsersComponent,
    FlashComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    HttpModule,
    FormsModule,
    routing
  ],
  providers: [StompConnectionServiceService,FlashService, LoginService, AuthService, LogoutService,ChatParticipantsService,UiEventEmitterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
