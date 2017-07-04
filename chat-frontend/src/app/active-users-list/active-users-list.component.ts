import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-active-users-list',
  templateUrl: './active-users-list.component.html',
  styleUrls: ['./active-users-list.component.css']
})
export class ActiveUsersListComponent {
  //should change with the type of user data ?? 
  @Input() users: any[];
}
