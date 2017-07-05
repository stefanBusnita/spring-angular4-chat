import { StompConnectionServiceService } from './../stomp/stomp-connection-service.service';
import { ChatParticipantsService } from './../services/chat-participants.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveUsersListComponent } from './active-users-list.component';

describe('ActiveUsersListComponent', () => {
  let component: ActiveUsersListComponent;
  let fixture: ComponentFixture<ActiveUsersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveUsersListComponent ],providers:[ChatParticipantsService,StompConnectionServiceService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
