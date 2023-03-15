import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateViewAppointmentsByDateModalComponent } from './private-view-appointments-by-date-modal.component';

describe('PrivateViewAppointmentsByDateModalComponent', () => {
  let component: PrivateViewAppointmentsByDateModalComponent;
  let fixture: ComponentFixture<PrivateViewAppointmentsByDateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateViewAppointmentsByDateModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateViewAppointmentsByDateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
