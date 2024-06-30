import { Component, Input, OnInit } from '@angular/core';
import { TicketInventory } from 'src/app/shared/core/models/app-ticket';
import { AppUser } from 'src/app/shared/core/models/app-user';
import { EventBusService } from 'src/app/shared/services/common/event-bus/event-bus.service';

@Component({
  selector: 'app-private-ticket-inventory-item-basic-info',
  templateUrl: './private-ticket-inventory-item-basic-info.component.html',
  styleUrls: ['./private-ticket-inventory-item-basic-info.component.scss']
})
export class PrivateTicketInventoryItemBasicInfoComponent implements OnInit {

  @Input() ticketInventory: TicketInventory = {} as TicketInventory;

  staffResponsible?: AppUser;

  constructor(
    private eventBus: EventBusService
  ) { }

  ngOnInit(): void {
    this.setStaff();
  }

  setStaff(): void {
    if (this.ticketInventory.base.staffResponsible) {
      this.staffResponsible = this.eventBus.stateInMemory.staff.value?.find(x => x.base?.id == this.ticketInventory.base.staffResponsible) || undefined;
    } else {
      this.staffResponsible = this.ticketInventory?.staff?.user;
    }
  }

}
