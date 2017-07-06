import { ChatParticipantsService } from './services/chat-participants.service';
import { FlashService } from './services/flash.service';
import { StompConnectionServiceService } from './stomp/stomp-connection-service.service';
import { LogoutService } from './guard/logout.service';
import { RouterModule, Router } from '@angular/router';
import { UiEventEmitterService } from './services/ui-event-emitter.service';
import { AuthService } from './guard/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule, By } from '@angular/platform-browser';
import { routing } from './app.routing';
import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [BrowserModule,
        HttpModule,
        FormsModule,
        RouterModule, RouterTestingModule],
      providers: [AuthService, LogoutService, UiEventEmitterService, StompConnectionServiceService, FlashService, ChatParticipantsService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty user value to begin with', () => {
    expect(component.user).toEqual('');
  });

  it('should have a disabled logout button', () => {
    de = fixture.debugElement.query(By.css('#user-span'));
    expect(de).toBeNull();
  });

  it('should receive from the service, and display', fakeAsync(() => {
    let fixture = TestBed.createComponent(HeaderComponent);
    let component = fixture.componentInstance;
    let uiEventEmitterInstance = fixture.debugElement.injector.get(UiEventEmitterService);
    let spy = spyOn(uiEventEmitterInstance, 'welcomeNotice').and.returnValue('stef');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.user).toEqual('stef');
    })
  }));

});
