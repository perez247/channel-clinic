import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicConfirmEmailComponent } from './public-confirm-email.component';

describe('PublicConfirmEmailComponent', () => {
  let component: PublicConfirmEmailComponent;
  let fixture: ComponentFixture<PublicConfirmEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicConfirmEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicConfirmEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
