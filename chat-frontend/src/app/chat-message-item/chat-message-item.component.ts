import { Message } from './../domain/message';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-message-item',
  templateUrl: './chat-message-item.component.html',
  styleUrls: ['./chat-message-item.component.css']
})
/**
 * Represents an actual chat message item.
 * The payload is represented by the sender along with the actual message.
 * isOdd and isEven are used to display a small css readability improvement ( alternate between different colors )
 */
export class ChatMessageItemComponent {

  @Input() message: Message;
  @Input() isOdd: boolean;
  @Input() isEven: boolean;

}
