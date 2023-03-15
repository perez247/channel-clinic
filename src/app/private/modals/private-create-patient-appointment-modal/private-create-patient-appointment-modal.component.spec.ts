import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateCreatePatientAppointmentModalComponent } from './private-create-patient-appointment-modal.component';

describe('PrivateCreatePatientAppointmentModalComponent', () => {
  let component: PrivateCreatePatientAppointmentModalComponent;
  let fixture: ComponentFixture<PrivateCreatePatientAppointmentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateCreatePatientAppointmentModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateCreatePatientAppointmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
