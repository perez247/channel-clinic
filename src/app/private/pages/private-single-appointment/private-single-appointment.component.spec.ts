import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateSingleAppointmentComponent } from './private-single-appointment.component';

describe('PrivateSingleAppointmentComponent', () => {
  let component: PrivateSingleAppointmentComponent;
  let fixture: ComponentFixture<PrivateSingleAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateSingleAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateSingleAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
