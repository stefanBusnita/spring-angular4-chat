import { UiEventEmitterService } from './ui-event-emitter.service';
import { MessageInterface } from './../domain/message-interface';
import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class ChatRoomsService implements OnInit {

  roomMessages: Map<String, MessageInterface[]> = new Map<String, MessageInterface[]>();

  activeRoomName: String = "public";

  constructor(private ui: UiEventEmitterService) { }

  setRoomName() {
    this.ui.chatSelected.subscribe((roomName: String) => {
      this.activeRoomName = roomName;
    });
  }

  getRoomMessages(roomName:String) {
    return this.roomMessages.get(roomName) ? this.roomMessages.get(roomName) : [];
  }

  addToRoom(roomName: String, message: MessageInterface) {
    let messages: MessageInterface[] = this.roomMessages.get(roomName);

    if (!messages) {
      messages = [];
      this.roomMessages.set(roomName, messages);
    }

    if (messages.length > 9) {
      messages.shift();
    }
    messages.push(message);
    this.roomMessages.set(roomName,messages);
    this.ui.messageReceived.emit(roomName);
  }

  ngOnInit(): void {
    this.setRoomName();
  }
}
