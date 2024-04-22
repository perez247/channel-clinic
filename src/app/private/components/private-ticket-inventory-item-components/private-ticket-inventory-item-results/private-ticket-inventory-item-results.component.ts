import { Component, Input, OnInit } from '@angular/core';
import { faCheckCircle, faClock, faPencilAlt, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrivateAddItemUsedModalComponent } from 'src/app/private/modals/private-add-item-used-modal/private-add-item-used-modal.component';
import { PrivateSaveLabRadiologyResultModalComponent } from 'src/app/private/modals/private-save-lab-radiology-result-modal/private-save-lab-radiology-result-modal.component';
import { AppRoles } from 'src/app/shared/core/models/app-roles';
import { AppTicket, TicketInventory } from 'src/app/shared/core/models/app-ticket';

@Component({
  selector: 'app-private-ticket-inventory-item-results',
  templateUrl: './private-ticket-inventory-item-results.component.html',
  styleUrls: ['./private-ticket-inventory-item-results.component.scss']
})
export class PrivateTicketInventoryItemResultsComponent implements OnInit {

  @Input() ticket: AppTicket = {} as AppTicket;
  @Input() ticketInventory: TicketInventory = {} as TicketInventory;

  fonts = { faCheckCircle, faClock, faPencilAlt, faMagnifyingGlass };

  roles = AppRoles;

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  addResultModal(): void {
    const modalRef = this.modalService.open(PrivateSaveLabRadiologyResultModalComponent, { size: 'xl' });
    const component: PrivateSaveLabRadiologyResultModalComponent = modalRef.componentInstance;

    component.ticketInventory = this.ticketInventory;
    component.ticket = this.ticket;
  }

  addItemsUsed(): void {
    const modalRef = this.modalService.open(PrivateAddItemUsedModalComponent, { size: 'lg' });
    const component: PrivateAddItemUsedModalComponent = modalRef.componentInstance;
    component.ticketInventory = this.ticketInventory;
  }

}
