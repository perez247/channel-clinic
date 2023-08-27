import { Component, Input, OnInit } from '@angular/core';
import { TicketInventory } from 'src/app/shared/core/models/app-ticket';

@Component({
  selector: 'app-private-ticket-inventory-item-doctor-prescription',
  templateUrl: './private-ticket-inventory-item-doctor-prescription.component.html',
  styleUrls: ['./private-ticket-inventory-item-doctor-prescription.component.scss']
})
export class PrivateTicketInventoryItemDoctorPrescriptionComponent {

  @Input() ticketInventory: TicketInventory = {} as TicketInventory;

  constructor() { }

}
