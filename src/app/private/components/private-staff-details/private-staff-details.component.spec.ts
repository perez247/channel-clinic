import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateStaffDetailsComponent } from './private-staff-details.component';

describe('PrivateStaffDetailsComponent', () => {
  let component: PrivateStaffDetailsComponent;
  let fixture: ComponentFixture<PrivateStaffDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateStaffDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateStaffDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
