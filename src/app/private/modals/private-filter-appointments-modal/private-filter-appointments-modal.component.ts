import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentFilter } from 'src/app/shared/core/models/app-appointment';
import { AppUser } from 'src/app/shared/core/models/app-user';
import { CustomErrorService } from 'src/app/shared/services/common/custom-error/custom-error.service';
import { PrivateFilterAppointmentsModalFunctions } from './private-filter-appointments-modal-functions';

@Component({
  selector: 'app-private-filter-appointments-modal',
  templateUrl: './private-filter-appointments-modal.component.html',
  styleUrls: ['./private-filter-appointments-modal.component.scss']
})
export class PrivateFilterAppointmentsModalComponent implements OnInit {

  @Input() filter?: AppointmentFilter;
  @Output() newFilter = new EventEmitter<AppointmentFilter>();

  form: FormGroup = {} as any;
  fonts = { faCalendar }

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    public errorService: CustomErrorService,
    ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.form = PrivateFilterAppointmentsModalFunctions.createForm(this.fb, this.filter);
  }

  updateDoctor(staff: AppUser): void {
    this.form.patchValue({
      doctorId: staff.staff?.base?.id,
      doctorName: `${staff.firstName} ${staff.lastName} ${staff.otherName}`
    });
  }

  clearDoctor(): void {
    this.form.patchValue({
      doctorId: null,
    });
  }

  updatePatient(patient: AppUser): void {
    this.form.patchValue({
      patientId: patient.patient?.base?.id,
      patientName: `${patient.firstName} ${patient.lastName} ${patient.otherName}`
    });
  }

  clearPatient(): void {
    this.form.patchValue({
      patientId: null,
    });
  }

  clearForm() {
    const appointmentDate: Date = new Date();
    this.filter = new AppointmentFilter();
    this.filter.startDate = `${appointmentDate?.getFullYear()}-${(appointmentDate?.getMonth() ?? 0) + 1}-${appointmentDate?.getDate()}`;
    this.initializeForm();
  }

  addFilter() {
    this.newFilter.emit(this.form.value);
    this.activeModal.close();
  }
}
