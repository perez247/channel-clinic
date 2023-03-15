import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateUserNextOfKinComponent } from './private-user-next-of-kin.component';

describe('PrivateUserNextOfKinComponent', () => {
  let component: PrivateUserNextOfKinComponent;
  let fixture: ComponentFixture<PrivateUserNextOfKinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateUserNextOfKinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateUserNextOfKinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
