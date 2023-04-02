import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateAddPharmacyTicketInventoryModalComponent } from './private-add-pharmacy-ticket-inventory-modal.component';

describe('PrivateAddPharmacyTicketInventoryModalComponent', () => {
  let component: PrivateAddPharmacyTicketInventoryModalComponent;
  let fixture: ComponentFixture<PrivateAddPharmacyTicketInventoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateAddPharmacyTicketInventoryModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateAddPharmacyTicketInventoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
