import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateUserPasswordComponent } from './private-user-password.component';

describe('PrivateUserPasswordComponent', () => {
  let component: PrivateUserPasswordComponent;
  let fixture: ComponentFixture<PrivateUserPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateUserPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateUserPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
