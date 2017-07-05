import { Message } from './../domain/message';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-message-item',
  templateUrl: './chat-message-item.component.html',
  styleUrls: ['./chat-message-item.component.css']
})
export class ChatMessageItemComponent {

  @Input() message: Message;
  @Input() isOdd: boolean;
  @Input() isEven: boolean;

}
