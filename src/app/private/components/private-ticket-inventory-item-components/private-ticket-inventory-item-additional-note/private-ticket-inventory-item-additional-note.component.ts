import { Component, Input, OnInit } from '@angular/core';
import { AppRoles } from 'src/app/shared/core/models/app-roles';
import { TicketInventory } from 'src/app/shared/core/models/app-ticket';
import { AppUser } from 'src/app/shared/core/models/app-user';
import { EventBusService } from 'src/app/shared/services/common/event-bus/event-bus.service';

@Component({
  selector: 'app-private-ticket-inventory-item-additional-note',
  templateUrl: './private-ticket-inventory-item-additional-note.component.html',
  styleUrls: ['./private-ticket-inventory-item-additional-note.component.scss']
})
export class PrivateTicketInventoryItemAdditionalNoteComponent {

  @Input() ticketInventory: TicketInventory = {} as TicketInventory;

  roles = AppRoles;

  constructor() { }
}
