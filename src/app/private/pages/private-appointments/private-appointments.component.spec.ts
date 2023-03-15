import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateAppointmentsComponent } from './private-appointments.component';

describe('PrivateAppointmentsComponent', () => {
  let component: PrivateAppointmentsComponent;
  let fixture: ComponentFixture<PrivateAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateAppointmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
