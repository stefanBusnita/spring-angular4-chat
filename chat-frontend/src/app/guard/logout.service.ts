import { StompConnectionServiceService } from './../stomp/stomp-connection-service.service';
import { Observable } from 'rxjs/Rx';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

/**
 * Service responsible for the "logout" strategy.
 * Current implementation refers to a call to disconnect from the web socket client.
 * Called by AuthService, when the app declares a logout action
 */
@Injectable()
export class LogoutService {

  constructor(private stompConnectionService: StompConnectionServiceService) {
  }

  doLogout() {
    this.stompConnectionService.disconnect();
  }

}
