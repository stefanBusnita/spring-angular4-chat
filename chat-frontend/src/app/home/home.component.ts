import { UserServiceService } from './../services/user-service.service';
import { ChatRoomsService } from './../services/chat-rooms.service';
import { UiEventEmitterService } from './../services/ui-event-emitter.service';
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

  activeRoomName: String;

  isPremium: boolean;

  constructor(
    private logoutService: LogoutService,
    private stompConnectionService: StompConnectionServiceService,
    private ui: UiEventEmitterService,
    private chatRoomService: ChatRoomsService,
    private chatParticipants: ChatParticipantsService,
    private userService: UserServiceService) {

  }
  sendMessage() {
    if (this.message) {
      let payload: Message = new Message(this.message, '');
      if (this.activeRoomName == "public") {
        this.stompConnectionService.send('/app/chat.message', JSON.stringify(payload));
      } else {
        this.stompConnectionService.send('/app/chat.private.' + this.activeRoomName, JSON.stringify(payload));
      }
      this.message = '';
    }
  }

  private publicMessageCallback(message) {
    this.chatRoomService.addToRoom("public", JSON.parse(message.body));
  }

  private privateMessageCallback(message) {
    console.log(message);
  }

  emptyMessages() {
    this.messages = [];
  }

  subscribeForActiveRoomName() {
    this.ui.chatSelected.subscribe((roomName: String) => {
      this.activeRoomName = roomName;
      console.log("ROOM CHANGED", this.activeRoomName);
      this.messages = this.chatRoomService.getRoomMessages(this.activeRoomName);
    });
  }

  subscribeForMessageReceived() {
    this.ui.messageReceived.subscribe((roomName: String) => {
      console.log(roomName, this.activeRoomName);
      if (roomName == this.activeRoomName) {
        this.messages = this.chatRoomService.getRoomMessages(this.activeRoomName);
      }
    });
  }

  checkIfPremium() {
    this.ui.welcomeNotice.subscribe(() => {
      this.isPremium = this.userService.isPremium();
    });

  }

  emojis = ["😁", "😂", "😜"];

  getEmoji(position) {
    return this.emojis[position];
  }

  addEmoji(position) {
    this.message += this.emojis[position];
  }


  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.activeRoomName = this.chatRoomService.activeRoomName;
    this.stompConnectionService.addSubscription('/topic/chat.message', this.publicMessageCallback.bind(this));

    this.stompConnectionService.connect();
    this.subscribeForActiveRoomName();
    this.subscribeForMessageReceived();
    this.checkIfPremium();

  }

}
