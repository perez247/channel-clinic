import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateTicketInventoryItemAvailableQuantityComponent } from './private-ticket-inventory-item-available-quantity.component';

describe('PrivateTicketInventoryItemAvailableQuantityComponent', () => {
  let component: PrivateTicketInventoryItemAvailableQuantityComponent;
  let fixture: ComponentFixture<PrivateTicketInventoryItemAvailableQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateTicketInventoryItemAvailableQuantityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateTicketInventoryItemAvailableQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
