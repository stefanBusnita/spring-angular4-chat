import { FlashInterface } from './../domain/flash-interface';
import { FlashService } from './../services/flash.service';
import { FlashMessage } from './../domain/flash';
import { User } from './../domain/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flash',
  templateUrl: './flash.component.html'
})
/**
 * Flash component will listen to any published FlashMessage event by the FlashService and display it.
 */
export class FlashComponent implements OnInit {
  message: FlashInterface;
  constructor(private flashService: FlashService) { }

  /**
   * Subscribe to the flash service Subject and print message accordingly.
   */
  ngOnInit() {
    this.flashService.getMessage().subscribe((message: any) => { this.message = message; });
  }

}
