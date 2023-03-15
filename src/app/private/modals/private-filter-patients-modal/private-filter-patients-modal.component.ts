import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { UserFilter, AppUser } from "src/app/shared/core/models/app-user";
import { CustomErrorService } from "src/app/shared/services/common/custom-error/custom-error.service";
import { FilterPatientsModalFunctions } from "./private-filter-patients-modal-functions";

@Component({
  selector: 'app-private-filter-patients-modal',
  templateUrl: './private-filter-patients-modal.component.html',
  styleUrls: ['./private-filter-patients-modal.component.scss']
})
export class PrivateFilterPatientsModalComponent implements OnInit {

  @Input() filter?: UserFilter;
  @Output() newFilter = new EventEmitter<UserFilter>();

  form: FormGroup = {} as any;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    public errorService: CustomErrorService,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.form = FilterPatientsModalFunctions.createForm(this.fb, this.filter);
  }

  setPatientComany(company: AppUser) {
    this.form.patchValue({
      patientCompanyId: company.company?.base?.id,
      patientCompanyName: company.company?.name,
    });
  }

  clear(): void {
    this.form.patchValue({
      patientCompanyId: null,
    });
  }

  clearForm() {
    this.filter = new UserFilter('patient');
    this.initializeForm();
  }

  addFilter() {
    this.newFilter.emit(this.form.value);
    this.activeModal.close();
  }
}
