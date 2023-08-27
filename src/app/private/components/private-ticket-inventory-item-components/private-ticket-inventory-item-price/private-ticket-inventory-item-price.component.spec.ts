import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateTicketInventoryItemPriceComponent } from './private-ticket-inventory-item-price.component';

describe('PrivateTicketInventoryItemPriceComponent', () => {
  let component: PrivateTicketInventoryItemPriceComponent;
  let fixture: ComponentFixture<PrivateTicketInventoryItemPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateTicketInventoryItemPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateTicketInventoryItemPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
