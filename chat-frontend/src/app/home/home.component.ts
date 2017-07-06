import { MessageInterface } from './../domain/message-interface';
import { ChatParticipantsService } from './../services/chat-participants.service';
import { SubscribeFunctionWrapper } from './../domain/subscribeFunctionWrapper';
import { LogoutService } from './../guard/logout.service';
import { AuthService } from './../guard/auth.service';
import { Message } from '../domain/message';
import { environment } from '../../environments/environment';
import { StompConnectionServiceService } from '../stomp/stomp-connection-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private message = ''; //

  messages: MessageInterface[] = []; //list of received messages, currently associated only to the public room

  constructor(
    private logoutService: LogoutService,
    private stompConnectionService: StompConnectionServiceService,
    private authService: AuthService,
    private router: Router,
    private chatParticipants: ChatParticipantsService) {

  }
  sendMessage() {
    if (this.message) {
      let payload: Message = new Message(this.message, '');
      this.stompConnectionService.send('/app/chat.message', JSON.stringify(payload));
      this.message = '';
    }
  }

  private publicMessageCallback(message) {
    this.messages.push(JSON.parse(message.body));
  }

  startChat() {
    location.reload();
  }

  emptyMessages() {
    this.messages = [];
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.stompConnectionService.addSubscription('/topic/chat.message', this.publicMessageCallback.bind(this));
    this.stompConnectionService.connect();
  }

}
