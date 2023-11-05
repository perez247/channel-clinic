import { Component, Input } from '@angular/core';
import { AppTicket, TicketInventory } from 'src/app/shared/core/models/app-ticket';

@Component({
  selector: 'app-private-ticket-inventory-item-status',
  templateUrl: './private-ticket-inventory-item-status.component.html',
  styleUrls: ['./private-ticket-inventory-item-status.component.scss']
})
export class PrivateTicketInventoryItemStatusComponent {

  @Input() ticket: AppTicket = {} as AppTicket;
  @Input() ticketInventory: TicketInventory = {} as TicketInventory;
  @Input() isAdmission = false;

}
