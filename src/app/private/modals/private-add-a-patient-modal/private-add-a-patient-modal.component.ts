import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { finalize } from "rxjs";
import { SharedUtilityComponent } from "src/app/shared/components/shared-utility/shared-utility.component";
import { AppUser } from "src/app/shared/core/models/app-user";
import { ApplicationRoutes } from "src/app/shared/core/routes/app-routes";
import { PatientService } from "src/app/shared/services/api/patient/patient.service";
import { CustomErrorService } from "src/app/shared/services/common/custom-error/custom-error.service";
import { CustomToastService } from "src/app/shared/services/common/custom-toast/custom-toast.service";
import { AddAPatientModalFunctions } from "./private-add-a-patient-modal-function";


@Component({
  selector: 'app-private-add-a-patient-modal',
  templateUrl: './private-add-a-patient-modal.component.html',
  styleUrls: ['./private-add-a-patient-modal.component.scss']
})
export class PrivateAddAPatientModalComponent extends SharedUtilityComponent implements OnInit {

  form: FormGroup = {} as any;
  routes = ApplicationRoutes.generateRoutes();

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    public errorService: CustomErrorService,
    private patientService: PatientService,
    private router: Router,
    private toast: CustomToastService
  ) {
    super();
  }

  override ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.form = AddAPatientModalFunctions.createForm(this.fb);
  }

  updateFormFromAutoComplete(staff: AppUser): void {
    this.form.patchValue({
      staffId: staff.staff?.base?.id,
      firstName: staff.firstName,
      lastName: staff.lastName,
      otherName: staff.otherName,
      address: staff.address,
      email: 'hidden@hidden.com'
    });

    this.form.disable();
  }

  createNewPatient(): void {
    this.isLoading = true;
    const sub = this.patientService.createPatient(this.form.value)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.toast.success('Patient created successfully');
          this.router.navigate([`${this.routes.privateRoute.single_patient(data.userId).$absolutePath}`]);
          this.activeModal.close();
        },
        error: (error) => {
          this.errorService.setFormErrors(error, this.form);
        }
      });

      this.subscriptions.push(sub);
  }

}
