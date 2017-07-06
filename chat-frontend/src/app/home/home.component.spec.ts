import { ChatParticipantsService } from './../services/chat-participants.service';
import { HttpModule } from '@angular/http';
import { AuthService } from './../guard/auth.service';
import { FlashService } from './../services/flash.service';
import { UiEventEmitterService } from './../services/ui-event-emitter.service';
import { StompConnectionServiceService } from './../stomp/stomp-connection-service.service';
import { LogoutService } from './../guard/logout.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NoAtiveUsersComponent } from './../active-users-item/no-ative-users.component';
import { ActiveUsersItemComponent } from './../active-users-item/active-users-item.component';
import { ChatMessageItemComponent } from './../chat-message-item/chat-message-item.component';
import { Message } from './../domain/message';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ActiveUsersListComponent } from './../active-users-list/active-users-list.component';
import { ChatMessageListComponent } from './../chat-message-list/chat-message-list.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let message: Message;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent,
        ChatMessageListComponent,
        ChatMessageItemComponent,
        ActiveUsersItemComponent,
        NoAtiveUsersComponent,
        ActiveUsersListComponent],
      imports: [
        NgbModule.forRoot(),
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterTestingModule
      ],
      providers: [LogoutService,
        StompConnectionServiceService,
        UiEventEmitterService,
        FlashService,
        AuthService,
        ChatParticipantsService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    component['message'] = "Hello World";

    message = new Message("payload", "stefan");
    component.messages.push(message);

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should clear all messages', () => {
    component.emptyMessages();
    fixture.detectChanges();
    expect(component.messages).toEqual([]);
  })

  // it('should add a message to the list', () => {
  //   let newMessage : Message = new Message("payload", "stefan");
  //   component['publicMessageCallback'](JSON.stringify({ body: newMessage }));
  // })

});
