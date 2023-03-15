import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateUpdateAppointmentModalComponent } from './private-update-appointment-modal.component';

describe('PrivateUpdateAppointmentModalComponent', () => {
  let component: PrivateUpdateAppointmentModalComponent;
  let fixture: ComponentFixture<PrivateUpdateAppointmentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateUpdateAppointmentModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateUpdateAppointmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
