import { AppTicketTypes, ITicketInventory, TicketInventory, TicketInventoryFilter } from './../../../shared/core/models/app-ticket';
import { ApplicationRoutes } from './../../../shared/core/routes/app-routes';
import { CustomErrorService } from './../../../shared/services/common/custom-error/custom-error.service';
import { finalize, throwError, lastValueFrom } from 'rxjs';
import { TicketService } from 'src/app/shared/services/api/ticket/ticket.service';
import { CustomToastService } from './../../../shared/services/common/custom-toast/custom-toast.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { AppTicket } from 'src/app/shared/core/models/app-ticket';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { IConfirmAction, SharedConfirmActionModalComponent } from 'src/app/shared/modals/shared-confirm-action-modal/shared-confirm-action-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppRoles } from 'src/app/shared/core/models/app-roles';
import { AppAppointment } from 'src/app/shared/core/models/app-appointment';
import { Confirmable } from 'src/app/shared/decorators/confirm-action-method-decorator';
import { PrivateCreateTicketModalComponent } from '../../modals/private-create-ticket-modal/private-create-ticket-modal.component';
import { Router } from '@angular/router';
import { InventoryService } from 'src/app/shared/services/api/inventory/inventory.service';
import { PaginationContext } from 'src/app/shared/core/models/pagination';

@Component({
  selector: 'app-private-ticket-inventory-template',
  templateUrl: './private-ticket-inventory-template.component.html',
  styleUrls: ['./private-ticket-inventory-template.component.scss']
})
export class PrivateTicketInventoryTemplateComponent extends SharedUtilityComponent implements OnInit {

  @Input() ticket?: AppTicket;
  @Input() appointment?: AppAppointment;
  @Input() type?: string;
  @Input() isTodayAppointment? = true;
  @Output() reload = new EventEmitter<string>();

  fonts = { faEllipsisV };

  routes = ApplicationRoutes.generateRoutes();

  roles = AppRoles;

  appTicketTypes = AppTicketTypes;

  constructor(
    private toast: CustomToastService,
    private ticketService: TicketService,
    private errorService: CustomErrorService,
    private modalService: NgbModal,
    private router: Router,
    private inventoryService: InventoryService,
  ) {
    super();
  }

  override ngOnInit(): void {
  }

  @Confirmable({
    title: 'Send ticket to department',
    html: 'Are you sure you want to send this ticket to the department. This cannot be undone',
    confirmButtonText: 'Yes Send',
    denyButtonText: 'No I changed my mind',
  })
  sendToDepartment(): void {
    this.isLoading = true;
    const data = {
      ticketId: this.ticket?.base.id,
      overallDescription: this.ticket?.overallDescription,
      sent: true,
      sentToFinance: true,
      appTicketStatus: this.ticket?.appTicketStatus
    };
    const sub = this.ticketService.updateTicket(data)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.ticket!.sent = true;
          this.ticket!.sentToFinance = true;
          this.toast.success(`Ticket sent to the respective departments department`);
        },
        error: (error) => {
          throw error;
        }
      });

      this.subscriptions.push(sub);
  }


  @Confirmable({
    title: 'Delete Ticket',
    html: 'Are you sure you want to delete this ticket.',
    confirmButtonText: 'Yes Delete',
    denyButtonText: 'No I changed my mind',
  })
  deleteTicket(): void {
    this.isLoading = true;
    const data = {
      ticketId: this.ticket?.base.id,
    };
    const sub = this.ticketService.deleteTicket(data)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.reload.emit(this.type);
          this.toast.success(`Ticket deleted successfully`);
        },
        error: (error) => {
          throw error;
        }
      });

      this.subscriptions.push(sub);
  }

  async editTicket(): Promise<void> {
    this.isLoading = true;
    const ticketInventoriesFromServer = await this.getTicketInventories();
    this.isLoading = false;

    if (ticketInventoriesFromServer.length == 0) { return; }

    const ticketInventories = ticketInventoriesFromServer.map(x => {
      return {
        ticketInventoryId: x.base.id,
        inventoryId: x.inventory.base?.id,
        inventoryName: x.inventory.name,
        doctorsPrescription: x.doctorsPrescription,
        times: x.times,
        dosage: x.dosage,
        frequency: x.frequency,
        type: x.inventory.appInventoryType,
      } as ITicketInventory
    });

    const modalRef = this.modalService.open(PrivateCreateTicketModalComponent, { size: 'lg' });
    modalRef.componentInstance.ticket = this.ticket;
    modalRef.componentInstance.appointment = this.appointment;
    modalRef.componentInstance.ticketInventories = ticketInventories
    const sub = modalRef.componentInstance.saved.subscribe({
      next: (action: boolean) => {
        if (action) {
          this.deleteTicket();
        } else if (action == false) {
          this.reload.emit();
        }
      },
      error: (error: any) => {
        throw error;
      }
    });
    this.subscriptions.push(sub);
  }

  async getTicketInventories(): Promise<TicketInventory[]> {
    const pagination = new PaginationContext<TicketInventory, TicketInventoryFilter>();
    pagination.request?.setFilter({ appTicketId: this.ticket?.base.id });
    pagination.request?.setPagination({ pageSize: 100 });

    try {
      const data = await lastValueFrom(this.inventoryService.getTicketInventories(pagination.request));
      return data.result || [];
    } catch (error) {
      this.toast.error('Failed to get ticket inventories, kindly try again later')
      return [];
    }
  }

}
