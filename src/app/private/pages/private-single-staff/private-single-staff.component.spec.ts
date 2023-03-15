import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateSingleStaffComponent } from './private-single-staff.component';

describe('PrivateSingleStaffComponent', () => {
  let component: PrivateSingleStaffComponent;
  let fixture: ComponentFixture<PrivateSingleStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateSingleStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateSingleStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
