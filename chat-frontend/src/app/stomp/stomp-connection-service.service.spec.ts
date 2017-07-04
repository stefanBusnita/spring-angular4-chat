import { TestBed, inject } from '@angular/core/testing';

import { StompConnectionServiceService } from './stomp-connection-service.service';

describe('StompConnectionServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StompConnectionServiceService]
    });
  });

  it('should be created', inject([StompConnectionServiceService], (service: StompConnectionServiceService) => {
    expect(service).toBeTruthy();
  }));
});
