import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateAppointmentsByCalendarComponent } from './private-appointments-by-calendar.component';

describe('PrivateAppointmentsByCalendarComponent', () => {
  let component: PrivateAppointmentsByCalendarComponent;
  let fixture: ComponentFixture<PrivateAppointmentsByCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateAppointmentsByCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateAppointmentsByCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
