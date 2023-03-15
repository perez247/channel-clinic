import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicForgotPasswordComponent } from './public-forgot-password.component';

describe('PublicForgotPasswordComponent', () => {
  let component: PublicForgotPasswordComponent;
  let fixture: ComponentFixture<PublicForgotPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicForgotPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
