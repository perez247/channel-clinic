import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateWelcomeUserComponent } from './private-welcome-user.component';

describe('PrivateWelcomeUserComponent', () => {
  let component: PrivateWelcomeUserComponent;
  let fixture: ComponentFixture<PrivateWelcomeUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateWelcomeUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateWelcomeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
