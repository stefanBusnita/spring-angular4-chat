import { FlashInterface } from './../domain/flash-interface';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Rx';
import { FlashMessage } from './../domain/flash';
import { Router, NavigationStart } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Injectable, OnDestroy } from '@angular/core';

/**
 * Used for displaying messages back to the User
 * Will use a Subject (publish, subscribe)
 */
@Injectable()
export class FlashService {

  //Leverage the Subject publish-subscribe. On adding a message publish, listeners will receive notice.
  private _subject = new Subject<FlashInterface>();
  //Timeout property taken from environment setup
  private _FLASH_TIMEOUT = environment._FLASH_TIMEOUT;

  constructor(){}

  /**
   * Success message display
   */
  doSuccess(text: string) {
    this._subject.next({ type: 'success', text: text });
    this._doTimeout();
  }
  /**
   * Error message display
   */
  doError(text: string) {
    this._subject.next({ type: 'error', text: text });
    this._doTimeout();
  }

  /**
   * Close the flash message after some time.
   * Timeframe can be changed from environment variables
   */
  private _doTimeout() {
    setTimeout(() => {
      this._subject.next();
    }, this._FLASH_TIMEOUT);
  }

  /**
   * All subscribers should call this method to receive the event
   */
  getMessage(): Observable<FlashInterface> {
    return this._subject.asObservable();
  }

}
