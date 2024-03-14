import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateTicketInventoryItemStaffObservationComponent } from './private-ticket-inventory-item-staff-observation.component';

describe('PrivateTicketInventoryItemStaffObservationComponent', () => {
  let component: PrivateTicketInventoryItemStaffObservationComponent;
  let fixture: ComponentFixture<PrivateTicketInventoryItemStaffObservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateTicketInventoryItemStaffObservationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateTicketInventoryItemStaffObservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
