import { User } from './../domain/user';
import { ChatParticipantsService } from './../services/chat-participants.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-active-users-list',
  templateUrl: './active-users-list.component.html',
  styleUrls: ['./active-users-list.component.css']
})
export class ActiveUsersListComponent implements OnInit {
  //should change with the type of user data ?? 

  chatParticipants: User[] = [];

  constructor(private chatParticipantsService: ChatParticipantsService) { }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.chatParticipantsService.usersChanged.subscribe((updatedList: User[]) => {
      console.log("chat participants list changed ", updatedList);
      this.chatParticipants = updatedList;
    });
  }


}
