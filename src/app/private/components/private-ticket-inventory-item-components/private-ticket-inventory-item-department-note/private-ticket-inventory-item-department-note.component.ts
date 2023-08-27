import { Component, Input, OnInit } from '@angular/core';
import { AppTicket, TicketInventory } from 'src/app/shared/core/models/app-ticket';

@Component({
  selector: 'app-private-ticket-inventory-item-department-note',
  templateUrl: './private-ticket-inventory-item-department-note.component.html',
  styleUrls: ['./private-ticket-inventory-item-department-note.component.scss']
})
export class PrivateTicketInventoryItemDepartmentNoteComponent {

  @Input() ticket: AppTicket = {} as AppTicket;
  @Input() ticketInventory: TicketInventory = {} as TicketInventory;


}
