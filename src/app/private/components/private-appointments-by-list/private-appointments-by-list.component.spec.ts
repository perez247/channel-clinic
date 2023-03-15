import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateAppointmentsByListComponent } from './private-appointments-by-list.component';

describe('PrivateAppointmentsByListComponent', () => {
  let component: PrivateAppointmentsByListComponent;
  let fixture: ComponentFixture<PrivateAppointmentsByListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateAppointmentsByListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateAppointmentsByListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
