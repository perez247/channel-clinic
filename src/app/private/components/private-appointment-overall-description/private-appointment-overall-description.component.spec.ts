import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateAppointmentOverallDescriptionComponent } from './private-appointment-overall-description.component';

describe('PrivateAppointmentOverallDescriptionComponent', () => {
  let component: PrivateAppointmentOverallDescriptionComponent;
  let fixture: ComponentFixture<PrivateAppointmentOverallDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateAppointmentOverallDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateAppointmentOverallDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
