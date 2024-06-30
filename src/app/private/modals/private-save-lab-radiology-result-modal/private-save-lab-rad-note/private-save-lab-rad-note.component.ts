import { Component, Input, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AppRoles } from 'src/app/shared/core/models/app-roles';
import { AppTicket, AppTicketTypes, TicketInventory } from 'src/app/shared/core/models/app-ticket';
import { AppUser } from 'src/app/shared/core/models/app-user';
import { EventBusService } from 'src/app/shared/services/common/event-bus/event-bus.service';

@Component({
  selector: 'app-private-save-lab-rad-note',
  templateUrl: './private-save-lab-rad-note.component.html',
  styleUrls: ['./private-save-lab-rad-note.component.scss']
})
export class PrivateSaveLabRadNoteComponent implements OnInit {

  @Input() ticket: AppTicket = {} as AppTicket;
  @Input() ticketInventory: TicketInventory = {} as TicketInventory;

  type = AppTicketTypes;

  roles = AppRoles;

  constructor(
    private eventBus: EventBusService
  ) { }

  editorConfig: AngularEditorConfig = {};

  ngOnInit(): void {
    this.editorConfig = {
      editable: this.getCanEdit(),
      spellcheck: true,
      height: '25rem',
      minHeight: '5rem',
    };
  }

  getCanEdit(): boolean {
    if (this.ticketInventory.concludedDate) {
      return false;
    }

    const currentUser = new AppUser(this.eventBus.state.user.value || {});

    return currentUser.hasClaim([this.roles.admin, this.ticketInventory.inventory.appInventoryType || ''], false);

  }

}
