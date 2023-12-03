import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { PrivateGetInventoryModalComponent } from 'src/app/private/modals/private-get-inventory-modal/private-get-inventory-modal.component';
import { AppTicket, AppTicketTypes, TicketHelper, TicketInventory } from 'src/app/shared/core/models/app-ticket';

@Component({
  selector: 'app-private-ticket-inventory-item-status',
  templateUrl: './private-ticket-inventory-item-status.component.html',
  styleUrls: ['./private-ticket-inventory-item-status.component.scss']
})
export class PrivateTicketInventoryItemStatusComponent implements OnDestroy {

  @Input() ticket: AppTicket = {} as AppTicket;
  @Input() ticketInventory: TicketInventory = {} as TicketInventory;
  @Input() isAdmission = false;

  @Output() reload = new EventEmitter();

  fonts = { faPencil }

  sub?: Subscription;

  types = AppTicketTypes;

  constructor(
    private modalService: NgbModal
  ) {}

  updateInventoryType(): void {
    const inventoryToUpdate = TicketHelper.toITicketInventory(this.ticketInventory);

    const modalRef = this.modalService.open(PrivateGetInventoryModalComponent, { size: 'lg' });
    const component: PrivateGetInventoryModalComponent = modalRef.componentInstance;

    component.appInventory = inventoryToUpdate;
    component.type = inventoryToUpdate.type;
    component.admissionOnly = true;
    this.sub = component.itemSaved.subscribe({
      next: (data: any) => {
        this.ticketInventory.inventory.base!.id = data.inventoryId;
        this.ticketInventory.inventory.name = data.inventoryName;
        this.reload.emit();
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
