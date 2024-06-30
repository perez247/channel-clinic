import { AppTicketTypes } from 'src/app/shared/core/models/app-ticket';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { AppTicket, TicketInventory } from './../../../shared/core/models/app-ticket';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { AdmissionService } from 'src/app/shared/services/api/admission/admission.service';
import { Confirmable } from 'src/app/shared/decorators/confirm-action-method-decorator';
import { finalize } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PrivateExePresFunction } from './private-exe-pres-modal-functions';
import { faCalendar, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { CustomErrorService } from 'src/app/shared/services/common/custom-error/custom-error.service';
import { CustomToastService } from 'src/app/shared/services/common/custom-toast/custom-toast.service';
import * as moment from 'moment';
import { AppInventoryItem } from 'src/app/shared/core/models/inventory';
import { AppUser } from 'src/app/shared/core/models/app-user';

@Component({
  selector: 'app-private-execute-prescription-modal',
  templateUrl: './private-execute-prescription-modal.component.html',
  styleUrls: ['./private-execute-prescription-modal.component.scss']
})
export class PrivateExecutePrescriptionModalComponent extends SharedUtilityComponent implements OnInit {

  @Input() ticketInventory: TicketInventory = {} as TicketInventory;
  @Input() ticket: AppTicket = {} as AppTicket;
  @Output() saved = new EventEmitter();

  form: FormGroup = {} as any;

  fonts = { faCalendar, faTrashAlt }

  types = AppTicketTypes;

  inventoryItems: AppInventoryItem[] = [];

  staffResponsible?: AppUser;

  constructor(
    public activeModal: NgbActiveModal,
    private admissionService: AdmissionService,
    private fb: FormBuilder,
    public errorService: CustomErrorService,
    private toast: CustomToastService,
    private calendar: NgbCalendar,
    ) {
    super();
  }

  override ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = PrivateExePresFunction.createForm(this.fb, this.ticketInventory);
  }

  @Confirmable({
    title: 'Log prescription execution',
    html: 'Kindly confirm that this prescription has been completely executed by you.',
    confirmButtonText: 'Yes',
    denyButtonText: 'No I changed my mind',
  })
  save(): void {
    this.isLoading = true;
    const d = {...this.ticketInventory, ...this.form.value};
    let date = moment(d.timeGiven).toDate();
    date.setHours(d.time.hour);
    date.setMinutes(d.time.minute);
    // d.timeGiven = new Date(date.year(), date.month(), date.date(), d.time.hour, d.time.minute).toISOString();
    d.timeGiven =  date;
    d.staffResponsible = this.staffResponsible?.base?.id;
    const sub = this.admissionService.executePrescription(d)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: () => {
          this.form.reset();
          this.saved.emit();
          this.toast.success('Prescription logged successfully');
          this.activeModal.close();
        }
      });

    this.subscriptions.push(sub);
  }

}
