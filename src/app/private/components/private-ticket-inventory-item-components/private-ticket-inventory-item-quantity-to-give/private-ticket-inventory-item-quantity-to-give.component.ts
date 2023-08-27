import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppTicket, TicketInventory } from 'src/app/shared/core/models/app-ticket';

@Component({
  selector: 'app-private-ticket-inventory-item-quantity-to-give',
  templateUrl: './private-ticket-inventory-item-quantity-to-give.component.html',
  styleUrls: ['./private-ticket-inventory-item-quantity-to-give.component.scss']
})
export class PrivateTicketInventoryItemQuantityToGiveComponent {

  @Input() ticket: AppTicket = {} as AppTicket;
  @Input() ticketInventory: TicketInventory = {} as TicketInventory;

  @Output() onBlur = new EventEmitter();

  blur(): void {
    this.onBlur.emit();
  }
}
