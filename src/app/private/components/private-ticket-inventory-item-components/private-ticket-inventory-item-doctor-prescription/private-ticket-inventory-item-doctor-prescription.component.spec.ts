import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateTicketInventoryItemDoctorPrescriptionComponent } from './private-ticket-inventory-item-doctor-prescription.component';

describe('PrivateTicketInventoryItemDoctorPrescriptionComponent', () => {
  let component: PrivateTicketInventoryItemDoctorPrescriptionComponent;
  let fixture: ComponentFixture<PrivateTicketInventoryItemDoctorPrescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateTicketInventoryItemDoctorPrescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateTicketInventoryItemDoctorPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
