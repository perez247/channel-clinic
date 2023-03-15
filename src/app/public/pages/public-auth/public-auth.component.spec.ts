import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicAuthComponent } from './public-auth.component';

describe('PublicAuthComponent', () => {
  let component: PublicAuthComponent;
  let fixture: ComponentFixture<PublicAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
