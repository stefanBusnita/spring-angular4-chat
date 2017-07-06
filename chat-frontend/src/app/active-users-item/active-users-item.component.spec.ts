import { UserInterface } from './../domain/user-interface';
import { User } from './../domain/user';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActiveUsersItemComponent } from './active-users-item.component';
import { DebugElement } from '@angular/core';

describe('ActiveUsersItemComponent', () => {
  let component: ActiveUsersItemComponent;
  let fixture: ComponentFixture<ActiveUsersItemComponent>;
  let user: UserInterface;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActiveUsersItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveUsersItemComponent);
    component = fixture.componentInstance;
    user = new User("Stefan", "123123");
    component.participant = user;
    component.selectedItemId = "Stefan";
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have the active class, once selected from the list', () => {
    de = fixture.debugElement.query(By.css('.active'));
    el = de.nativeElement;
    expect(el).toBeTruthy();
  })

});
