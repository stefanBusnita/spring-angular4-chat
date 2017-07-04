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

  title = 'app';
  message = '';

  messages: Message[] = []; //replace with Message 

  constructor(private loginService: LoginService, private logoutService: LogoutService, private stompConnectionService: StompConnectionServiceService, private authService: AuthService, private router: Router) {

  }

  logout() {
    console.log("Logout called");
    this.logoutService.doLogout();
  }

  public theConnectCallback: Function;
  public chaMessageCallback: Function;

  sendMessage() {
    let payload: Message = new Message(this.message, '');
    this.stompConnectionService.send('/app/chat.message', {}, JSON.stringify(payload));
  }

  public callback(message) {
    console.log("Message received ", JSON.parse(message.body));
    this.messages.push(JSON.parse(message.body));
  }

  public connectCallback(frame) {
    console.log("do stuff" + frame);
    this.stompConnectionService.subscribe('/app/test', function (greeting) {
      console.log("First app communication : ", greeting);

    });

    this.stompConnectionService.subscribe('/topic/user-login', function (userConnected) {
      console.log("A user connected ", userConnected);
    });

    this.stompConnectionService.subscribe('/topic/chat.message', this.chaMessageCallback);
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
    this.chaMessageCallback = this.callback.bind(this);
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
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
