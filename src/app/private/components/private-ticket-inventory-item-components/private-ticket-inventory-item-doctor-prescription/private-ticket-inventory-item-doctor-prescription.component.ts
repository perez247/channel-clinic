import { Component, Input, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/shared/core/models/app-constants';
import { AppRoles } from 'src/app/shared/core/models/app-roles';
import { AppTicket, TicketInventory } from 'src/app/shared/core/models/app-ticket';
import { AppUser } from 'src/app/shared/core/models/app-user';
import { EventBusService } from 'src/app/shared/services/common/event-bus/event-bus.service';

@Component({
  selector: 'app-private-ticket-inventory-item-doctor-prescription',
  templateUrl: './private-ticket-inventory-item-doctor-prescription.component.html',
  styleUrls: ['./private-ticket-inventory-item-doctor-prescription.component.scss']
})
export class PrivateTicketInventoryItemDoctorPrescriptionComponent implements OnInit {

  @Input() ticket: AppTicket = {} as AppTicket;
  @Input() ticketInventory: TicketInventory = {} as TicketInventory;

  durations = Array.from({length: 30}, (_, i) => i + 1);

  frequencies = AppConstants.TicketFrequency;

  roles = AppRoles;

  notInRole = true;

  constructor(
    private eventBus: EventBusService
  ) { }

  ngOnInit(): void {
    this.setRole();
  }

  setRole(): void {
    const requiredRoles = [this.roles.admin, this.roles.doctor];
    const currentUser = new AppUser(this.eventBus.getState().user.value || {});
    this.notInRole = !currentUser?.hasClaim(requiredRoles, false);
  }

  durationChanged(): void {
    if (typeof this.ticketInventory.duration == 'string' && this.ticketInventory.duration == 'null') {
      this.ticketInventory.duration = 1;
    }
  }
}
