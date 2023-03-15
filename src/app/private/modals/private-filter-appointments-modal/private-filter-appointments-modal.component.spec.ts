import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateFilterAppointmentsModalComponent } from './private-filter-appointments-modal.component';

describe('PrivateFilterAppointmentsModalComponent', () => {
  let component: PrivateFilterAppointmentsModalComponent;
  let fixture: ComponentFixture<PrivateFilterAppointmentsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateFilterAppointmentsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateFilterAppointmentsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
