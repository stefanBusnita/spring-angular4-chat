import { StompConnectionServiceService } from './../stomp/stomp-connection-service.service';
import { User } from './../domain/user';
import { Injectable, OnInit, EventEmitter } from '@angular/core';

/**
 * Service used to keep track of users that joined the chat.
 * Will emit event to all subscribers, giving notice that the list of users changed. 
 */
@Injectable()
export class ChatParticipantsService {


  chatParticipants: User[] = [];

  usersChanged = new EventEmitter<User[]>();

  /**
   * Used just for testing purposes, simple subscription to an APP event
   */
  doStuff(greeting) {

    console.log("First app communication : ", greeting);

  }
  private doEmitEvent() {
    this.usersChanged.emit(this.chatParticipants);
  }

  /**
   * Helper function designed to check if the username is already in the list, no duplicates allowed
   */
  private checkAlreadyExisting(username: String) {
    return this.chatParticipants.map((elem: User) => {
      return elem.username
    }).indexOf(username) != -1;
  }

  /**
   * Callback for the user connected event, add to service list, and emit event to all subscribers.
   */
  private userConnected(userConnected) {
    let connectedUser: User = new User(JSON.parse(userConnected.body).username, JSON.parse(userConnected.body).timestamp);
    this.checkAlreadyExisting(connectedUser.getUsername()) ? "" : this.chatParticipants.push(JSON.parse(userConnected.body));
    this.doEmitEvent();
  }

  /**
   * Callback for the user disconnected event, remove from service list, and emit event to all subscribers.
   */
  private userDisconnected(userDisconnected) {
    let disconnectedUser: User = new User(JSON.parse(userDisconnected.body).username, JSON.parse(userDisconnected.body).timestamp);
    this.chatParticipants = this.chatParticipants.filter((user: User) => {
      return user.username != disconnectedUser.username;
    });
    this.doEmitEvent();
  }

  /**
   * Register all subscriptions, along with callbacks.
   */
  constructor(private stompConnectionService: StompConnectionServiceService) {
    this.stompConnectionService.addSubscription('/app/test', this.doStuff.bind(this))
    this.stompConnectionService.addSubscription('/topic/user-login', this.userConnected.bind(this));
    this.stompConnectionService.addSubscription('/topic/user-logout', this.userDisconnected.bind(this));
  }

}
