import { Component, Input, OnInit } from '@angular/core';
import { AppTicket, TicketInventory } from 'src/app/shared/core/models/app-ticket';
import { AppInventoryItem } from 'src/app/shared/core/models/inventory';

@Component({
  selector: 'app-private-ticket-inventory-item-price',
  templateUrl: './private-ticket-inventory-item-price.component.html',
  styleUrls: ['./private-ticket-inventory-item-price.component.scss']
})
export class PrivateTicketInventoryItemPriceComponent {

  @Input() ticket: AppTicket = {} as AppTicket;
  @Input() ticketInventory: TicketInventory = {} as TicketInventory;
  @Input() inventoryItems: AppInventoryItem[] = [];

}
