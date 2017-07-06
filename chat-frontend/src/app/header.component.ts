import { UiEventEmitterService } from './services/ui-event-emitter.service';
import { AuthService } from './guard/auth.service';
import { ChatParticipantsService } from './services/chat-participants.service';
import { LogoutService } from './guard/logout.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user = '';
  constructor(private authService: AuthService,private uiEventEmitterService : UiEventEmitterService) { }

  doLogout() {
    console.log("Logout called");
    this.authService.doLogout();
  }

  ngOnInit() {
    this.uiEventEmitterService.welcomeNotice.subscribe((message: string) => {
      this.user = message;
    });
  }

}
