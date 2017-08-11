import { UiEventEmitterService } from './../services/ui-event-emitter.service';
import { UserInterface } from './../domain/user-interface';
import { User } from './../domain/user';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-active-users-item',
  templateUrl: './active-users-item.component.html',
  styleUrls: ['./active-users-item.component.css']
})
/**
 * Represents the active users list item.
 * There are 2 inputs:
 * 1. The participant - received while the structure is repeated
 * 2. The selectedItem - when an item is clicked.
 */
export class ActiveUsersItemComponent  {

  @Input() participant: UserInterface;
  @Input() selectedItemId: String;
  constructor(private ui : UiEventEmitterService) { }

  onUserSelected(){
    console.log("EMITTING THE PARTICIPANT",this.participant.username);
    this.ui.chatSelected.emit(this.participant.username);

  }

}
