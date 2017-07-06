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
export class ActiveUsersItemComponent implements OnInit {

  @Input() participant: User;
  @Input() selectedItemId: String;
  constructor() { }



  ngOnInit() {
  }

}
