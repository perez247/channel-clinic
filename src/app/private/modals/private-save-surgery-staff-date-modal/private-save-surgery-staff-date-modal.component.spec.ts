import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateSaveSurgeryStaffDateModalComponent } from './private-save-surgery-staff-date-modal.component';

describe('PrivateSaveSurgeryStaffDateModalComponent', () => {
  let component: PrivateSaveSurgeryStaffDateModalComponent;
  let fixture: ComponentFixture<PrivateSaveSurgeryStaffDateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateSaveSurgeryStaffDateModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateSaveSurgeryStaffDateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
