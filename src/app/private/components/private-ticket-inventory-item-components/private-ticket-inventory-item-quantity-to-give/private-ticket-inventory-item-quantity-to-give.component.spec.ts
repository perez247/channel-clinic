import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateTicketInventoryItemQuantityToGiveComponent } from './private-ticket-inventory-item-quantity-to-give.component';

describe('PrivateTicketInventoryItemQuantityToGiveComponent', () => {
  let component: PrivateTicketInventoryItemQuantityToGiveComponent;
  let fixture: ComponentFixture<PrivateTicketInventoryItemQuantityToGiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateTicketInventoryItemQuantityToGiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateTicketInventoryItemQuantityToGiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
