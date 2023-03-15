import { AppInventory, AppInventoryItem } from './../../../../shared/core/models/inventory';
import { TicketInventory } from './../../../../shared/core/models/app-ticket';
import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { AppTicket } from 'src/app/shared/core/models/app-ticket';

@Component({
  selector: 'app-private-pharmacy-ticket-item',
  templateUrl: './private-pharmacy-ticket-item.component.html',
  styleUrls: ['./private-pharmacy-ticket-item.component.scss']
})
export class PrivatePharmacyTicketItemComponent implements OnInit, OnChanges {

  @Input() ticket: AppTicket = {} as AppTicket;
  @Input() ticketInventory: TicketInventory = {} as TicketInventory;
  @Input() inventoryItems: AppInventoryItem[] = [];

  @Output() recalculate = new EventEmitter();

  pricePerItem = 0;

  constructor() { }

  ngOnInit(): void {
    // this.calculateItem();
  }

  ngOnChanges(): void {
    if (!this.ticket.cost){
      this.calculateItem();
    }
  }

  calculateItem(): void {
    if (this.inventoryItems.length <= 0) {
      this.setToDefault();
      return;
    }

    const item = this.inventoryItems.find(x => x?.inventory?.base?.id === this.ticketInventory.inventory.base?.id);

    if (!item) {
      this.setToDefault();
      return;
    }

    this.ticketInventory.currentPrice = (item?.pricePerItem ?? 0) * (this.ticketInventory?.prescribedQuantity ?? 0);
    this.ticketInventory.totalPrice = (item?.pricePerItem ?? 0) * (this.ticketInventory?.prescribedQuantity ?? 0);
  }

  setToDefault(): void {
    this.ticketInventory.currentPrice = 0
    this.ticketInventory.totalPrice = 0
  }

}
