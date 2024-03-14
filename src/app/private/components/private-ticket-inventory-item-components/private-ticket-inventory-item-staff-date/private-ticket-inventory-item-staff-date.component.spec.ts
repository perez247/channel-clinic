import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateTicketInventoryItemStaffDateComponent } from './private-ticket-inventory-item-staff-date.component';

describe('PrivateTicketInventoryItemStaffDateComponent', () => {
  let component: PrivateTicketInventoryItemStaffDateComponent;
  let fixture: ComponentFixture<PrivateTicketInventoryItemStaffDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateTicketInventoryItemStaffDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateTicketInventoryItemStaffDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
