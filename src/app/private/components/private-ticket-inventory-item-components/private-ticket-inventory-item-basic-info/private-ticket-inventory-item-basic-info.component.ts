import { Component, Input, OnInit } from '@angular/core';
import { TicketInventory } from 'src/app/shared/core/models/app-ticket';

@Component({
  selector: 'app-private-ticket-inventory-item-basic-info',
  templateUrl: './private-ticket-inventory-item-basic-info.component.html',
  styleUrls: ['./private-ticket-inventory-item-basic-info.component.scss']
})
export class PrivateTicketInventoryItemBasicInfoComponent implements OnInit {

  @Input() ticketInventory: TicketInventory = {} as TicketInventory;

  constructor() { }

  ngOnInit(): void {
  }

}
