import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateAppointmentTicketsComponent } from './private-appointment-tickets.component';

describe('PrivateAppointmentTicketsComponent', () => {
  let component: PrivateAppointmentTicketsComponent;
  let fixture: ComponentFixture<PrivateAppointmentTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateAppointmentTicketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateAppointmentTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
