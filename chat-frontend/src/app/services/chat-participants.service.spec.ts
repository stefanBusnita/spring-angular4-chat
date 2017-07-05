import { User } from './../domain/user';
import { StompConnectionServiceService } from './../stomp/stomp-connection-service.service';
import { TestBed, inject } from '@angular/core/testing';

import { ChatParticipantsService } from './chat-participants.service';

describe('ChatParticipantsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatParticipantsService, StompConnectionServiceService]
    });
  });

  it('should be created', inject([ChatParticipantsService], (service: ChatParticipantsService) => {
    expect(service).toBeTruthy();
  }));

  it('should have an initialized array', inject([ChatParticipantsService], (service: ChatParticipantsService) => {

    expect(service.chatParticipants).toEqual([]);

  }));

  it('should have an initial element, and then the element should be removed', inject([ChatParticipantsService], (service: ChatParticipantsService) => {

    let user: User = new User("Stefan", "");

    let message = {
      body: user
    };

    console.log(JSON.stringify(message));
    expect(message.body).toBeTruthy();
    service.chatParticipants[0] = user;
    
    //service.userConnected(JSON.stringify(message));

    expect(service.chatParticipants.length).toEqual(1);

  }));

});
