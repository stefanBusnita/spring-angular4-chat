import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveUsersItemComponent } from './active-users-item.component';

describe('ActiveUsersItemComponent', () => {
  let component: ActiveUsersItemComponent;
  let fixture: ComponentFixture<ActiveUsersItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveUsersItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveUsersItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
