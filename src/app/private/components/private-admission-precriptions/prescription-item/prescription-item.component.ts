import { faEllipsisV, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdmissionPrescription } from 'src/app/shared/core/models/admission-prescription';
import { AdmissionService } from 'src/app/shared/services/api/admission/admission.service';
import { AppTicket, ITicketInventory, TicketInventory } from 'src/app/shared/core/models/app-ticket';
import { PrivateCreateTicketModalComponent } from 'src/app/private/modals/private-create-ticket-modal/private-create-ticket-modal.component';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { finalize } from 'rxjs';
import { Confirmable } from 'src/app/shared/decorators/confirm-action-method-decorator';
import { CustomToastService } from 'src/app/shared/services/common/custom-toast/custom-toast.service';
import { PrivateExecutePrescriptionModalComponent } from 'src/app/private/modals/private-execute-prescription-modal/private-execute-prescription-modal.component';

@Component({
  selector: 'app-prescription-item',
  templateUrl: './prescription-item.component.html',
  styleUrls: ['./prescription-item.component.scss']
})
export class PrescriptionItemComponent extends SharedUtilityComponent implements OnInit {

  @Input() admissionPrescription?: AdmissionPrescription;
  @Input() ticket: AppTicket = {} as AppTicket;
  @Output() reload = new EventEmitter();
  @Output() reloadLogged = new EventEmitter();

  fonts = { faEllipsisV, faPlusCircle }

  constructor(
    private modalService: NgbModal,
    private admissionService: AdmissionService,
    private toastService: CustomToastService
    ) {
      super()
     }

  override ngOnInit(): void {
  }

  updatePrescription(): void {
    const ticket = {
      overallDescription: this.admissionPrescription?.overallDescription,
      base: {
        id: this.admissionPrescription?.appTicketId
      }
    } as AppTicket;

    const ticketInventories = this.admissionPrescription?.ticketInventories?.map(x => {
      return {
        ticketInventoryId: x.base.id,
        inventoryId: x.inventory.base?.id,
        inventoryName: x.inventory.name,
        doctorsPrescription: x.doctorsPrescription,
        times: x.times,
        dosage: x.dosage,
        frequency: x.frequency,
        duration: x.duration
      } as ITicketInventory
    });

    const modalRef = this.modalService.open(PrivateCreateTicketModalComponent, { size: 'lg' });
    const component: PrivateCreateTicketModalComponent = modalRef.componentInstance;
    component.ticket = ticket;
    component.ticketInventories = ticketInventories ?? [];
    component.type = this.admissionPrescription?.appInventoryType ?? 'pharmacy';
    component.returnData = true;

    const sub = modalRef.componentInstance.saved.subscribe({
      next: (data: any) => {
        // console.log(data);
        this.savePrescription(data);
      },
      error: (error: any) => {
        throw error;
      }
    });
    this.subscriptions.push(sub);
  }

  @Confirmable({
    title: 'Conclude ticket',
    html: 'Are you sure you want to start using this prescription. you wont be able to change this anymore and the previous prescription will be concluded',
    confirmButtonText: 'Yes start using',
    denyButtonText: 'No I changed my mind',
  })
  public concludeStatus(): void {
    const data = {
      appInventoryType: this.admissionPrescription?.appInventoryType,
      overallDescription: this.admissionPrescription?.overallDescription,
      ticketId: this.admissionPrescription?.appTicketId,
      appTicketStatus: 'concluded',
      ticketInventories: []
    }

    this.savePrescription(data);
  }

  private savePrescription(data: any): void {
    data.prescriptionId = this.admissionPrescription?.base?.id;
    this.isLoading = true;
    const sub = this.admissionService.createPrescription(data)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: () => {
          this.reload.emit();
          this.toastService.success("Prescription saved successfully");
        },
        error: (error) => {
          throw error;
        }
      });

      this.subscriptions.push(sub);
  }

  @Confirmable({
    title: 'Delete Prescription',
    html: 'Are you sure you want to Delete this prescription. This cannot be undone',
    confirmButtonText: 'Yes delete',
    denyButtonText: 'No I changed my mind',
  })
  public deletePrescription(): void {
    this.isLoading = true;
    const sub = this.admissionService.deletePrescription({ admissionPrescriptionId: this.admissionPrescription?.base?.id })
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: () => {
          this.reload.emit();
          this.toastService.success("Prescription deleted successfully");
        },
        error: (error) => {
          throw error;
        }
      });

      this.subscriptions.push(sub);
  }


  logExecution(ticketInventory: TicketInventory): void {
    const modalRef = this.modalService.open(PrivateExecutePrescriptionModalComponent, { size: 'lg' });
    const component: PrivateExecutePrescriptionModalComponent = modalRef.componentInstance;

    component.ticketInventory = ticketInventory;
    component.ticketInventory.prescribedQuantity = ticketInventory.dosage;
    component.ticket = this.ticket;

    const sub = component.saved.subscribe({
      next: () => {
        this.reloadLogged.emit();
      }
    });
  }
}

