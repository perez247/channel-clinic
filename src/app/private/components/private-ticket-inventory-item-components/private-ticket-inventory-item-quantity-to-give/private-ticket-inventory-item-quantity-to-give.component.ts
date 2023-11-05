import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { AppRoles } from 'src/app/shared/core/models/app-roles';
import { AppTicket, TicketInventory } from 'src/app/shared/core/models/app-ticket';
import { AppInventoryItem } from 'src/app/shared/core/models/inventory';

@Component({
  selector: 'app-private-ticket-inventory-item-quantity-to-give',
  templateUrl: './private-ticket-inventory-item-quantity-to-give.component.html',
  styleUrls: ['./private-ticket-inventory-item-quantity-to-give.component.scss']
})
export class PrivateTicketInventoryItemQuantityToGiveComponent implements OnChanges {

  @Input() ticket: AppTicket = {} as AppTicket;
  @Input() ticketInventory: TicketInventory = {} as TicketInventory;
  @Input() isAdmission = false;
  @Input() inventoryItems: AppInventoryItem[] = [];

  @Output() onBlur = new EventEmitter();

  pricePerItem = 0;
  sumTotal = 0;

  roles = AppRoles;

  ngOnChanges(): void {
    this.setPrice();
  }

  blur(): void {
    this.setTotal();
  }

  setPrice(): void {
    const appInventory = this.inventoryItems.find(x => x.inventory?.base?.id == this.ticketInventory.inventory.base?.id);

    this.pricePerItem = appInventory?.pricePerItem || 0;

    this.setTotal();
  }

  setTotal(): void {
    this.sumTotal = (this.ticketInventory?.prescribedQuantity || 0) * this.pricePerItem;
  }
}
