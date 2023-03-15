import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicCheckEmailComponent } from './public-check-email.component';

describe('PublicCheckEmailComponent', () => {
  let component: PublicCheckEmailComponent;
  let fixture: ComponentFixture<PublicCheckEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicCheckEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicCheckEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
