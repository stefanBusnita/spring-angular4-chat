import { By } from '@angular/platform-browser';
import { Message } from './../domain/message';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessageItemComponent } from './chat-message-item.component';
import { DebugElement } from '@angular/core';


describe('ChatMessageItemComponent', () => {
  let component: ChatMessageItemComponent;
  let fixture: ComponentFixture<ChatMessageItemComponent>;
  let message: Message;
  let de: DebugElement;
  let el: HTMLElement;
  let messagePayload : string;
  let messageUsername : string;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChatMessageItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessageItemComponent);
    component = fixture.componentInstance;
    messagePayload = "message payload";
    messageUsername = "stefan";
    message = new Message(messagePayload, messageUsername);
    component.message = message;
    component.isEven = false;
    component.isOdd = true;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should contain the beforeEach mentioned message',()=>{
    de = fixture.debugElement.query(By.css('.chat-message-odd')); //off because we mentioned active odd in before each
    el = de.nativeElement;
    expect(el.textContent).toContain(messageUsername);
    expect(el.textContent).toContain(messagePayload);
  });

  it('should have an Odd class item', () => {
    de = fixture.debugElement.query(By.css('.chat-message-odd')); //do even test with null
    el = de.nativeElement;
    expect(el).toBeTruthy();
  });

  it('should have an Even class item',()=>{
    component.isEven = true;
    component.isOdd = false;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('.chat-message-even')); //do even test with null
    el = de.nativeElement;
    expect(el).toBeTruthy();
  });

});
