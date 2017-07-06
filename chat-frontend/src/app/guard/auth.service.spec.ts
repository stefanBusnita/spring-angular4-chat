import { FlashService } from './../services/flash.service';
import { UiEventEmitterService } from './../services/ui-event-emitter.service';
import { StompConnectionServiceService } from './../stomp/stomp-connection-service.service';
import { LogoutService } from './logout.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ChatParticipantsService } from './../services/chat-participants.service';
import { Http, HttpModule } from '@angular/http';
import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, BrowserModule, FormsModule],
      providers: [AuthService,LogoutService,ChatParticipantsService,StompConnectionServiceService,UiEventEmitterService,FlashService]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
