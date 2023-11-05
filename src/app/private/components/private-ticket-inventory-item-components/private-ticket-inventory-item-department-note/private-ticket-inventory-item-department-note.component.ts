import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { AppRoles } from 'src/app/shared/core/models/app-roles';
import { AppTicket, TicketInventory } from 'src/app/shared/core/models/app-ticket';
import { AppUser } from 'src/app/shared/core/models/app-user';
import { EventBusService } from 'src/app/shared/services/common/event-bus/event-bus.service';

@Component({
  selector: 'app-private-ticket-inventory-item-department-note',
  templateUrl: './private-ticket-inventory-item-department-note.component.html',
  styleUrls: ['./private-ticket-inventory-item-department-note.component.scss']
})
export class PrivateTicketInventoryItemDepartmentNoteComponent implements OnInit, OnChanges {

  @Input() ticket: AppTicket = {} as AppTicket;
  @Input() ticketInventory: TicketInventory = {} as TicketInventory;
  @Input() isAdmission = false;

  constructor(
    private eventBus: EventBusService
  ) {}

  noteDisabled = true;

  roles = AppRoles;

  ngOnInit(): void {
    this.setNoteDisabled();
  }

  ngOnChanges(): void {
    this.setNoteDisabled();
  }

  setNoteDisabled(): void {
    if (this.ticket.cost) {
      this.noteDisabled = true;
      return;
    }

    if (this.isAdmission && this.ticketInventory.updated) {
      this.noteDisabled = true;
      return;
    }

    const currentUser = new AppUser(this.eventBus.getState().user.value || {});

    if (!currentUser.hasClaim([this.roles.admin, this.ticketInventory.inventory.appInventoryType || ''], false)) {
      this.noteDisabled = true;
      return;
    }

    this.noteDisabled = false;
  }
}
