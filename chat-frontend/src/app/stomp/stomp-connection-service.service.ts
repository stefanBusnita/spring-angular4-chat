import { Subscription } from 'rxjs/Rx';
import { SubscribeFunctionWrapperInterface } from './../domain/subscribeFunctionWrapperInterface';
import { FlashService } from './../services/flash.service';
import { UiEventEmitterService } from './../services/ui-event-emitter.service';
import { LogoutService } from './../guard/logout.service';
import { AuthService } from './../guard/auth.service';
import { SubscribeFunctionWrapper } from './../domain/subscribeFunctionWrapper';
import { environment } from './../../environments/environment';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { StompWebSocketCommunication } from './stomp-web-socket-communication';
import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
/**
 * Service used to connect, subscribe and send messages thru the websocket.
 * Respects the contract imposed by StompWebSocketCommunication
 */
@Injectable()
export class StompConnectionServiceService implements StompWebSocketCommunication<SockJS>, OnInit {

  sock: SockJS;
  private stompClient: any;
  private connected: Boolean = false;
  private stompConnectData = environment.stompConnect;
  private stompPrefix = environment.stompPrefixes;
  private callFunctions: SubscribeFunctionWrapperInterface[] = [];


  constructor(private uiEventEmitterService: UiEventEmitterService, private flashService: FlashService) {
    this.initialize(this.stompConnectData.protocol + this.stompConnectData.path + ":" + this.stompConnectData.port + this.stompPrefix.endpoint);
  }

  /**
   * Initialize all vars
   */
  initialize(url: String): void {
    this.sock = new SockJS(url);
    this.stompClient = Stomp.over(this.sock);
    this.stompClient.heartbeat.outgoing = 20000;
    this.stompClient.heartbeat.incoming = 0;
  }

  /**
   * Subscriptions will be added by other components
   */
  public addSubscription(subscribeLink: String, functionCall: Function) {

    console.log(subscribeLink);
    if (this.connected) {
      this.subscribe(subscribeLink, functionCall);
    } else {
      this.callFunctions.push(new SubscribeFunctionWrapper(subscribeLink, functionCall));
    }
  }

  /**
   * Client connected succesfully, we can subscribe to all necessary events.
   */
  private connectSuccessCallback(frame) {
    //Pass thru all the registered points
    for (let i = 0; i < this.callFunctions.length; i++) {
      this.subscribe(this.callFunctions[i].subscriptionLink, this.callFunctions[i].functionCall);
    }
    this.flashService.doSuccess("Connection succesfull");
    this.connected = true;
  }

  /**
   * Client disconnected
   * Emit interface update event, show a message
   */
  private disconnectCallback() {
    this.uiEventEmitterService.welcomeNotice.emit("");
    this.flashService.doSuccess("You will no longer receive messages");
  }

  connect(): void {
    this.stompClient.connect({},
      this.connectSuccessCallback.bind(this), function () {
        console.log("An error occured while trying to connect");
      }
    );
  }

  disconnect() {
    this.stompClient.disconnect(this.disconnectCallback.bind(this));
  }

  subscribe(destination: String, callback: Function): void {
    this.stompClient.subscribe(destination, callback);
  }

  send(destination: String, payload: Object): void {
    this.stompClient.send(destination, {}, payload);
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

}
