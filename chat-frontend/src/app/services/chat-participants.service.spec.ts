import { FlashService } from './flash.service';
import { UiEventEmitterService } from './ui-event-emitter.service';
import { User } from './../domain/user';
import { StompConnectionServiceService } from './../stomp/stomp-connection-service.service';
import { TestBed, inject } from '@angular/core/testing';

import { ChatParticipantsService } from './chat-participants.service';

describe('ChatParticipantsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatParticipantsService, StompConnectionServiceService, UiEventEmitterService, FlashService]
    });
  });

  it('should be created', inject([ChatParticipantsService], (service: ChatParticipantsService) => {
    expect(service).toBeTruthy();
  }));

  it('should have an initialized, empty array', inject([ChatParticipantsService], (service: ChatParticipantsService) => {
    expect(service.chatParticipants).toEqual([]);
  }));

});
