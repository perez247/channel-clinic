import { faEllipsisV, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdmissionPrescription } from 'src/app/shared/core/models/admission-prescription';
import { AdmissionService } from 'src/app/shared/services/api/admission/admission.service';
import { AppTicket, ITicketInventory, TicketInventory } from 'src/app/shared/core/models/app-ticket';
import { PrivateCreateTicketModalComponent } from 'src/app/private/modals/private-create-ticket-modal/private-create-ticket-modal.component';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { finalize } from 'rxjs';
import { Confirmable } from 'src/app/shared/decorators/confirm-action-method-decorator';
import { CustomToastService } from 'src/app/shared/services/common/custom-toast/custom-toast.service';
import { PrivateExecutePrescriptionModalComponent } from 'src/app/private/modals/private-execute-prescription-modal/private-execute-prescription-modal.component';
import { AppRoles } from 'src/app/shared/core/models/app-roles';
import { ActivatedRoute } from '@angular/router';

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

  roles = AppRoles;

  frequency = {
    Daily: 'day',
    Weekly: 'week',
    Monthly: 'month',
    Yearly: 'year'
  } as any;

  constructor(
    private modalService: NgbModal,
    private admissionService: AdmissionService,
    private toastService: CustomToastService,
    private route: ActivatedRoute
    ) {
      super()
     }

  section = '';

  override ngOnInit(): void {
    this.section = this.route.snapshot.paramMap.get('sectionName') || '';
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
        type: x.inventory.appInventoryType,
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
    component.executeInParentComponent = true;
    component.singleType = true;
    component.executeAction = this.savePrescription.bind(this);
  }

  @Confirmable({
    title: 'Conclude ticket',
    html: 'Are you sure you want to start using this prescription. you won\'t be able to change this anymore and the previous prescription will be concluded',
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

  private savePrescription(data: any, activeModal?: NgbActiveModal, setLoading?: (state: boolean) => void): void {
    data.prescriptionId = this.admissionPrescription?.base?.id;
    this.isLoading = true;
    if (setLoading) { setLoading(true); }
    data.appTicketStatus = data.appTicketStatus ? data.appTicketStatus : 'ongoing';
    const sub = this.admissionService.createPrescription(data)
      .pipe(finalize(() => {
        this.isLoading = false;
        if (setLoading) { setLoading(false); }
      }))
      .subscribe({
        next: () => {
          this.reload.emit();
          this.toastService.success("Prescription saved successfully");
          if (activeModal) { activeModal.close(); }
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

