import { FlashService } from './../services/flash.service';
import { UiEventEmitterService } from './../services/ui-event-emitter.service';
import { StompConnectionServiceService } from './../stomp/stomp-connection-service.service';
import { Http, HttpModule } from '@angular/http';
import { TestBed, inject } from '@angular/core/testing';

import { LogoutService } from './logout.service';

describe('LogoutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpModule],
      providers: [LogoutService,StompConnectionServiceService,UiEventEmitterService,FlashService]
    });
  });

  it('should be created', inject([LogoutService], (service: LogoutService) => {
    expect(service).toBeTruthy();
  }));
});
