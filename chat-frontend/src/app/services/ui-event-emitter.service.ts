import { Injectable, EventEmitter } from '@angular/core';

/**
 * Wrapper for an EventEmitter.
 * 
 * Responsible for any UI update on user close connection (cyclic dep avoided)
 * StompConnectionServiceService->emits on disconnect using it
 * ChatParticipantsService->emits when the user connected and received info
 * HeaderComponent->listens on events, updates the interface by adding or removing info(name)
 */
@Injectable()
export class UiEventEmitterService {

  welcomeNotice = new EventEmitter<String>();
  chatSelected = new EventEmitter<String>(); //a chat user was selected
  messageReceived = new EventEmitter<String>();
  

  constructor() { }

}
