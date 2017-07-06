import { MessageInterface } from './../domain/message-interface';
import { ChatMessageItemComponent } from './../chat-message-item/chat-message-item.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Message } from './../domain/message';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessageListComponent } from './chat-message-list.component';

describe('ChatMessageListComponent', () => {
  let component: ChatMessageListComponent;
  let fixture: ComponentFixture<ChatMessageListComponent>;
  let message : MessageInterface;
  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatMessageListComponent,ChatMessageItemComponent ],
      imports: [
        NgbModule.forRoot(),
        BrowserModule,
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessageListComponent);
    component = fixture.componentInstance;
    message = new Message("messagePayload","username");
    component.messages.push(message);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
