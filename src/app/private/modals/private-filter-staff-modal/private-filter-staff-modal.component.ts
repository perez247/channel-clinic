import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { UserFilter } from "src/app/shared/core/models/app-user";
import { CustomErrorService } from "src/app/shared/services/common/custom-error/custom-error.service";
import { FilterStaffModalFunctions } from "./private-filter-staff-modal-functions";

@Component({
  selector: 'app-private-filter-staff-modal',
  templateUrl: './private-filter-staff-modal.component.html',
  styleUrls: ['./private-filter-staff-modal.component.scss']
})
export class PrivateFilterStaffModalComponent implements OnInit {

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
    this.form = FilterStaffModalFunctions.createForm(this.fb, this.filter);
  }

  clearForm() {
    this.filter = new UserFilter('staff');
    this.initializeForm();
  }

  addFilter() {
    this.newFilter.emit(this.form.value);
    this.activeModal.close();
  }
}
