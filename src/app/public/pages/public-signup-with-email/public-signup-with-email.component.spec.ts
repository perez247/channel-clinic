import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicSignupWithEmailComponent } from './public-signup-with-email.component';

describe('PublicSignupWithEmailComponent', () => {
  let component: PublicSignupWithEmailComponent;
  let fixture: ComponentFixture<PublicSignupWithEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicSignupWithEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicSignupWithEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
