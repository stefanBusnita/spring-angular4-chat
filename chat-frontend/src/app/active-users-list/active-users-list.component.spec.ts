import { UserInterface } from './../domain/user-interface';
import { FlashService } from './../services/flash.service';
import { UiEventEmitterService } from './../services/ui-event-emitter.service';
import { NoAtiveUsersComponent } from './../active-users-item/no-ative-users.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActiveUsersItemComponent } from './../active-users-item/active-users-item.component';
import { User } from './../domain/user';
import { StompConnectionServiceService } from './../stomp/stomp-connection-service.service';
import { ChatParticipantsService } from './../services/chat-participants.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveUsersListComponent } from './active-users-list.component';

describe('ActiveUsersListComponent', () => {
  let component: ActiveUsersListComponent;
  let fixture: ComponentFixture<ActiveUsersListComponent>;
  let user: UserInterface;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ActiveUsersListComponent,
        ActiveUsersItemComponent,
        NoAtiveUsersComponent
      ],
      imports: [
        NgbModule.forRoot(),
        BrowserModule,
        FormsModule
      ],
      providers: [StompConnectionServiceService, UiEventEmitterService, FlashService, ChatParticipantsService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveUsersListComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should have no selectedItem', () => {
    expect(component.selectedItem).toBeNull();
  })

  it('should be created', () => {
    user = new User("stefan", "123123123");
    component.chatParticipants.push(user);
    fixture.detectChanges();
    component.setActive(component.chatParticipants[0]);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

});
