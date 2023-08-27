import { Component, Input, OnInit } from '@angular/core';
import { faCheckCircle, faClock, faPencilAlt, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs';
import { PrivateSaveSurgeryStaffDateModalComponent } from 'src/app/private/modals/private-save-surgery-staff-date-modal/private-save-surgery-staff-date-modal.component';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { AppTicket, TicketInventory } from 'src/app/shared/core/models/app-ticket';
import { Confirmable } from 'src/app/shared/decorators/confirm-action-method-decorator';
import { InventoryService } from 'src/app/shared/services/api/inventory/inventory.service';
import { CustomToastService } from 'src/app/shared/services/common/custom-toast/custom-toast.service';

@Component({
  selector: 'app-private-ticket-inventory-item-staff-date',
  templateUrl: './private-ticket-inventory-item-staff-date.component.html',
  styleUrls: ['./private-ticket-inventory-item-staff-date.component.scss']
})
export class PrivateTicketInventoryItemStaffDateComponent extends SharedUtilityComponent {

  @Input() ticket: AppTicket = {} as AppTicket;
  @Input() ticketInventory: TicketInventory = {} as TicketInventory;

  fonts = { faCheckCircle, faClock, faPencilAlt, faMagnifyingGlass };

  constructor(
    private modalService: NgbModal,
    private inventoryService: InventoryService,
    private toastService: CustomToastService
  ) {
    super();
  }

  saveStaffAndDate(): void {
    const modalRef = this.modalService.open(PrivateSaveSurgeryStaffDateModalComponent, { size: 'lg' });
    const component: PrivateSaveSurgeryStaffDateModalComponent = modalRef.componentInstance;

    component.ticketInventory = this.ticketInventory;
  }

  @Confirmable({
    title: 'Update surgery staff and date',
    html: 'Are you sure you want to update surgery staff and date'
  })
  updateStaffAndDate(): void {

    this.isLoading = true;

    const data = {
      ticketId: this.ticket.base.id,
      ticketInventoryId: this.ticketInventory.base.id,
      surgeryDate: this.ticketInventory.surgeryDate,
      surgeryTicketPersonnels: this.ticketInventory.surgeryTicketPersonnels.map(x => ({
        personnelId: x.id ? x.id : x.personnel.base?.id,
        surgeryRole: x.surgeryRole,
        isHeadPersonnel: x.isHeadPersonnel
      })),
    }

    const sub = this.inventoryService.updateSurgeryInventory(data)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          console.log(data);
          this.toastService.success('Surgery updated successfully');
        },
        error: (error) => {
          throw error;
        }
      });

      this.subscriptions.push(sub);
  }
}
