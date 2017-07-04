import { Message } from './../domain/message';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chat-message-list',
  templateUrl: './chat-message-list.component.html',
  styleUrls: ['./chat-message-list.component.css']
})
export class ChatMessageListComponent {

  @Input() messages: Message[];

}
