import { UserInterface } from './../domain/user-interface';
import { FlashService } from './flash.service';
import { UiEventEmitterService } from './ui-event-emitter.service';
import { StompConnectionServiceService } from './../stomp/stomp-connection-service.service';
import { User } from './../domain/user';
import { Injectable, OnInit, EventEmitter } from '@angular/core';

/**
 * Service used to keep track of users that joined the chat.
 * Will emit event to all subscribers, giving notice that the list of users changed. 
 */
@Injectable()
export class ChatParticipantsService {


  chatParticipants: UserInterface[] = [];

  usersChanged = new EventEmitter<UserInterface[]>();


  /**
  * Register all subscriptions, along with callbacks.
  */
  constructor(private stompConnectionService: StompConnectionServiceService, private uiEventEmitterService: UiEventEmitterService, private flashService: FlashService) {
    //after logging in, a list is received from the server
    this.stompConnectionService.addSubscription('/app/chat.users', this.getInitialUsersList.bind(this));
    //Request information from logged in Principal (username)
    this.stompConnectionService.addSubscription('/app/chat.whoAmI', this.welcomeNoticeCallback.bind(this));
    //User logged in, update users list
    this.stompConnectionService.addSubscription('/topic/user-login', this.userConnected.bind(this));
    //User logged out, update users list
    this.stompConnectionService.addSubscription('/topic/user-logout', this.userDisconnected.bind(this));
  }

  emptyUsersList() {
    this.usersChanged.emit([]);
  }

  private doChageUserEvent() {
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
   * Initial users list received
   */
  private getInitialUsersList(message) {
    let currentlyLoggedUsers: User[] = JSON.parse(message.body);
    for (let user of currentlyLoggedUsers) {
      this.chatParticipants.push(user);
    }
    //Testing users list view 
    // for (let i = 0; i < 25; i++) {
    //   this.chatParticipants.push(currentlyLoggedUsers[0]);
    // }
    this.doChageUserEvent();
  }

  /**
   * Callback for the user connected event, add to service list, and emit event to all subscribers.
   */
  private userConnected(userConnected) {
    let connectedUser: UserInterface = new User(JSON.parse(userConnected.body).username, JSON.parse(userConnected.body).timestamp);
    this.checkAlreadyExisting(connectedUser.username) ? "" : this.chatParticipants.push(JSON.parse(userConnected.body));
    this.flashService.doError(connectedUser.username + " joined the chat!");
    this.doChageUserEvent();
  }

  /**
   * Callback for the user disconnected event, remove from service list, and emit event to all subscribers.
   */
  private userDisconnected(userDisconnected) {
    let disconnectedUser: UserInterface = new User(JSON.parse(userDisconnected.body).username, JSON.parse(userDisconnected.body).timestamp);
    this.chatParticipants = this.chatParticipants.filter((user: User) => {
      return user.username != disconnectedUser.username;
    });
    this.flashService.doError(disconnectedUser.username + " left the chat...");
    this.doChageUserEvent();
  }

  private welcomeNoticeCallback(message) {
    this.uiEventEmitterService.welcomeNotice.emit(message.body);
  }




}
