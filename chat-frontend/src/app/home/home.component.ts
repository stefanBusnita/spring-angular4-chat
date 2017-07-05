import { ChatParticipantsService } from './../services/chat-participants.service';
import { SubscribeFunctionWrapper } from './../domain/subscribeFunctionWrapper';
import { LoginService } from './../guard/login.service';
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

  messages: Message[] = []; //list of received messages, currently associated only to the public room

  public theConnectCallback: Function;
  
  constructor(private loginService: LoginService, 
  private logoutService: LogoutService, 
  private stompConnectionService: StompConnectionServiceService, 
  private authService: AuthService, 
  private router: Router,
  private chatParticipants : ChatParticipantsService) {

  }

  logout() {
    console.log("Logout called");
    this.logoutService.doLogout();
  }

  


  sendMessage() {
    let payload: Message = new Message(this.message, '');
    this.stompConnectionService.send('/app/chat.message', {}, JSON.stringify(payload));
  }

  private publicMessageCallback(message) {
    console.log("Message received ", JSON.parse(message.body));
    this.messages.push(JSON.parse(message.body));
  }

  private connectCallback(frame) {
    //console.log("do stuff" + frame);
    //KEEP ONLY FOR SIGNALLING THAT COMM IS ONLINE, easier to see in the console.
    this.stompConnectionService.subscribe('/app/test', function (greeting) {
      console.log("First app communication : ", greeting);
    });

    // this.stompConnectionService.subscribe('/topic/user-login', function (userConnected) {
    //   console.log("A user connected ", userConnected);
    // });

    //Pass thru all the registered points
    //MOVE TO SERVICE CONNECT
    // for (let i = 0; i < this.callFunctions.length; i++) {
    //   this.stompConnectionService.subscribe(this.callFunctions[i].getSubscriptionLink(), this.callFunctions[i].getFunctionCall());
    // }

  }

  doLoginTry() {
    this.loginService.doLogin().subscribe((response) => {
      console.log(response, " cica o functionat")
    });
  }

  startChat() {
    location.reload();

  }

  ngOnInit() {
    this.theConnectCallback = this.connectCallback.bind(this);

    this.stompConnectionService.addSubscription('/topic/chat.message', this.publicMessageCallback.bind(this));

    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    //TODO REMOVE THE CALLBACK FUNCTION
    this.stompConnectionService.connect(this.theConnectCallback);

    //TRY AN AUTH HERE
    // this.authService.tryToGetUserDetails().subscribe((response: any) => {
    //   console.log(response);
    // }, error => {
    //   if (error.error == 'Unauthorized') {
    //     this.router.navigateByUrl('/login')
    //     console.log(error);
    //   }
    // },
    //   () => console.log("Finished"))
  }

}
