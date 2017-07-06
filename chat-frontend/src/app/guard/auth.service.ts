import { ChatParticipantsService } from './../services/chat-participants.service';
import { LogoutService } from './logout.service';
import { StompConnectionServiceService } from './../stomp/stomp-connection-service.service';
import { environment } from './../../environments/environment';
import { Injectable, EventEmitter, OnInit } from '@angular/core';
import 'rxjs/Rx';
import { Observable, Subscription } from 'rxjs/Rx';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';

/**
 * Responsible for delegation for login action, logout action
 */
@Injectable()
export class AuthService implements OnInit {

  private environmentData = environment.httpConnect;


  constructor(private http: Http, private logoutService: LogoutService,private chatparticipants: ChatParticipantsService) {

  }

/**
 * When logging out
 * Call logout on LogoutService
 * Use chatParticipants to update the 
 */
  doLogout() {
    this.logoutService.doLogout();
    this.chatparticipants.emptyUsersList();
  }


  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }
}
