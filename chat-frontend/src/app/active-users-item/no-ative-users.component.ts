import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-ative-users',
  templateUrl: './no-ative-users.component.html',
  styleUrls: ['./no-ative-users.component.css']
})
/**
 * Component used to display a message when the list of users is empty.
 * Currently as simple list item element <li>
 */
export class NoAtiveUsersComponent implements OnInit {
  message='Currently there are no active users.';

  constructor() { }

  ngOnInit() {
  }

}
