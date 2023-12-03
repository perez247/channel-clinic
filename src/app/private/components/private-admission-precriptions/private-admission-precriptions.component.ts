import { finalize } from 'rxjs';
import { faPlus, faPlusCircle, faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrivateCreateTicketModalComponent } from '../../modals/private-create-ticket-modal/private-create-ticket-modal.component';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { AdmissionService } from 'src/app/shared/services/api/admission/admission.service';
import { AppPagination, PaginationRequest, PaginationResponse } from 'src/app/shared/core/models/pagination';
import { AdmissionPrescriptionFilter } from 'src/app/shared/core/models/admission-prescription-filter';
import { AdmissionPrescription } from 'src/app/shared/core/models/admission-prescription';
import { AppTicket } from 'src/app/shared/core/models/app-ticket';

@Component({
  selector: 'app-private-admission-precriptions',
  templateUrl: './private-admission-precriptions.component.html',
  styleUrls: ['./private-admission-precriptions.component.scss']
})
export class PrivateAdmissionPrecriptionsComponent extends SharedUtilityComponent implements OnChanges {

  @Input() sectionName: string = '';
  @Input() ticket: AppTicket = {} as AppTicket;

  fonts = { faPlus, faPlusCircle, faChevronCircleLeft, faChevronCircleRight }

  isCreatingPrescription = false;

  prescriptions: AdmissionPrescription[] = [];
  appPagination = new AppPagination();
  filter = new AdmissionPrescriptionFilter();
  paginationRequest = new PaginationRequest<AdmissionPrescriptionFilter>(this.appPagination, this.filter);
  paginationResponse = new PaginationResponse<AdmissionPrescription[]>();

  index = 0;
  selected?: AdmissionPrescription;
  loggedPrescriptionUpdate = '';

  constructor(
    private modalService: NgbModal,
    private admissionService: AdmissionService
    ) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.filter.ticketId = this.ticket.base.id;
    this.filter.appInventoryType = this.sectionName as any;
    this.paginationRequest = new PaginationRequest<AdmissionPrescriptionFilter>(this.appPagination, this.filter);
    this.getPrescriptions(true);
  }

  getPrescriptions(restart: boolean): void {
    this.isLoading = true;
    const sub = this.admissionService.getPrescriptions(this.paginationRequest)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.paginationResponse = data;
          const d = data.result ?? [];

          if (restart) { this.index = 0; this.prescriptions = [] }

          this.prescriptions = this.prescriptions.concat(d);

          this.setPrescription();

        },
        error: (error) => {
          throw error;
        }
      });
  }

  openAddNewDoctorsPrescription(): void
  {
    const modalRef = this.modalService.open(PrivateCreateTicketModalComponent, { size: 'lg' });
    const component: PrivateCreateTicketModalComponent = modalRef.componentInstance;

    component.type = this.sectionName;
    component.executeInParentComponent = true;
    component.singleType = true;
    component.executeAction = this.createPrescription.bind(this);
  }



  setPrescription(): void {
    this.selected = this.prescriptions[this.index] ?? null;
  }

  nextPreviousPrescription(increment: number): void {
    const index = this.index + increment;
    this.index = index;

    const newSelection = this.prescriptions[this.index];

    if (newSelection) {
      this.selected = newSelection;
      return;
    }

    this.appPagination.pageNumber++;

    this.getPrescriptions(false);
  }

  reloadLoggedPrescriptions(): void {
    this.loggedPrescriptionUpdate = Math.random().toString();
  }

  private createPrescription(data: any, activeModal: NgbActiveModal, setLoading: (state: boolean) => void): void {
    data.ticketId = this.ticket.base.id;
    data.appTicketStatus = 'ongoing';
    this.isCreatingPrescription = true;
    setLoading(true);
    const sub = this.admissionService.createPrescription(data)
      .pipe(finalize(() => { this.isCreatingPrescription = false; setLoading(false) }))
      .subscribe({
        next: () => {
          this.getPrescriptions(true);
          activeModal.close();
        },
        error: (error) => {
          throw error;
        }
      });
  }
}
