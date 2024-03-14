import { Component, Input, OnInit } from '@angular/core';
import { TicketInventory } from 'src/app/shared/core/models/app-ticket';

@Component({
  selector: 'app-private-ticket-inventory-item-available-quantity',
  templateUrl: './private-ticket-inventory-item-available-quantity.component.html',
  styleUrls: ['./private-ticket-inventory-item-available-quantity.component.scss']
})
export class PrivateTicketInventoryItemAvailableQuantityComponent {

  @Input() ticketInventory: TicketInventory = {} as TicketInventory;

}
