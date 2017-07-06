import { FlashInterface } from './../domain/flash-interface';
import { Observable } from 'rxjs/Rx';
import { By } from '@angular/platform-browser';
import { FlashMessage } from './../domain/flash';
import { FlashService } from './../services/flash.service';
import { async,fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { FlashComponent } from './flash.component';

describe('FlashComponent', () => {
  let component: FlashComponent;
  let fixture: ComponentFixture<FlashComponent>;
  let flashMessage: FlashInterface;
  let flashText: string;
  let flashType: string;
  let de: DebugElement;
  let el: HTMLElement;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FlashComponent],
      providers: [FlashService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashComponent);
    component = fixture.componentInstance;
    flashText = "Alert";
    flashType = 'success';
    flashMessage = new FlashMessage(flashText, flashType);
    component.message = flashMessage;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display a  flash message', () => {
    expect(component.message).toBeTruthy();
    de = fixture.debugElement.query(By.css('.alert'));
    expect(de).toBeTruthy();
  });

  it('should display the flash text', () => {
    de = fixture.debugElement.query(By.css('.alert'));
    el = de.nativeElement;
    expect(el.textContent).toContain("Alert");
  });

  it('should receive data from the service', fakeAsync(() => {
    let flashService = fixture.debugElement.injector.get(FlashService);
    let receivedFlash = new FlashMessage("Alert", "success");
    let spy = spyOn(flashService, 'getMessage').and.returnValue(Observable.of(receivedFlash));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.message).toEqual(receivedFlash);
    });
  }));


});
