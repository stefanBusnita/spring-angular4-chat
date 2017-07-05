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
  stompClient: any;

  private stompConnectData = environment.stompConnect;
  private stompPrefix = environment.stompPrefixes;
  private callFunctions: SubscribeFunctionWrapper[] = [];


  constructor() {
    this.initialize(this.stompConnectData.protocol + this.stompConnectData.path + ":" + this.stompConnectData.port + this.stompPrefix.endpoint);
  }

  initialize(url: String): void {
    this.sock = new SockJS(url);
    this.stompClient = Stomp.over(this.sock);
    this.stompClient.heartbeat.outgoing = 20000;
    this.stompClient.heartbeat.incoming = 0;
  }

  public addSubscription(subscribeLink: String, functionCall: Function) {
    this.callFunctions.push(new SubscribeFunctionWrapper(subscribeLink, functionCall));
  }

  private connectCallback(frame) {
    //Pass thru all the registered points
    for (let i = 0; i < this.callFunctions.length; i++) {
      this.subscribe(this.callFunctions[i].getSubscriptionLink(), this.callFunctions[i].getFunctionCall());
    }

  }


  subscribe(destination: String, callback: Function): void {
    this.stompClient.subscribe(destination, callback);
  }


  connect(success: Function): void {
    let plainCredentials = "stef:password";
    let base64Credentials = btoa("stef:password");

    //final WebSocketHttpHeaders headers = new WebSocketHttpHeaders();
    //headers.add("Authorization", "Basic " + base64Credentials);
    //"Authorization" : "Basic "+base64Credentials

    this.stompClient.connect({},
      this.connectCallback.bind(this), function (message) {
        console.log(message);
      }
    );
  }

  disconnect() {
    this.stompClient.disconnect(function () {
      //alert("See you next time!");
    });
  }

  send(destination: String, headers: Object, payload: Object): void {
    this.stompClient.send(destination, {}, payload);
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

}
