import { FlashService } from './../services/flash.service';
import { UiEventEmitterService } from './../services/ui-event-emitter.service';
import { TestBed, inject } from '@angular/core/testing';

import { StompConnectionServiceService } from './stomp-connection-service.service';

describe('StompConnectionServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StompConnectionServiceService,UiEventEmitterService,FlashService]
    });
  });

  it('should be created', inject([StompConnectionServiceService], (service: StompConnectionServiceService) => {
    expect(service).toBeTruthy();
  }));
});
