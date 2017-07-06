import { RouterTestingModule } from '@angular/router/testing';
import { UiEventEmitterService } from './services/ui-event-emitter.service';
import { ChatParticipantsService } from './services/chat-participants.service';
import { LogoutService } from './guard/logout.service';
import { AuthService } from './guard/auth.service';
import { LoginService } from './guard/login.service';
import { FlashService } from './services/flash.service';
import { StompConnectionServiceService } from './stomp/stomp-connection-service.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlashComponent } from './flash/flash.component';
import { NoAtiveUsersComponent } from './active-users-item/no-ative-users.component';
import { HeaderComponent } from './header.component';
import { ActiveUsersItemComponent } from './active-users-item/active-users-item.component';
import { ActiveUsersListComponent } from './active-users-list/active-users-list.component';
import { ChatMessageListComponent } from './chat-message-list/chat-message-list.component';
import { ChatMessageItemComponent } from './chat-message-item/chat-message-item.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { routing } from './app.routing';
import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
        RouterTestingModule
      ],
      providers: [StompConnectionServiceService, FlashService, LoginService, AuthService, LogoutService, ChatParticipantsService, UiEventEmitterService]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
