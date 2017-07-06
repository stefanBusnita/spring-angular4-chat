import { UserInterface } from './../domain/user-interface';
import { User } from './../domain/user';
import { ChatParticipantsService } from './../services/chat-participants.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-active-users-list',
  templateUrl: './active-users-list.component.html',
  styleUrls: ['./active-users-list.component.css']
})
/**
 * Represents the list of all active users who are currently in the chat room.
 */
export class ActiveUsersListComponent implements OnInit {
  chatParticipants: UserInterface[] = [];

  selectedItem: String = null;

  /**
   * Select and item from the list
   */
  setActive(item: UserInterface) {
    this.selectedItem = item.username;
  }

  constructor(private chatParticipantsService: ChatParticipantsService) { }

  /**
   * Subscribe to users leaving event, and display updated list
   */
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.chatParticipantsService.usersChanged.subscribe((updatedList: UserInterface[]) => {
      console.log("chat participants list changed ", updatedList);
      this.chatParticipants = updatedList;
    });
  }

}
