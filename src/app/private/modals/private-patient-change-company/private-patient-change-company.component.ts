import { finalize } from 'rxjs';
import { AppUser } from 'src/app/shared/core/models/app-user';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { PatientService } from 'src/app/shared/services/api/patient/patient.service';
import { CustomErrorService } from 'src/app/shared/services/common/custom-error/custom-error.service';
import { CustomToastService } from 'src/app/shared/services/common/custom-toast/custom-toast.service';
import { PrivatePatientChangeCompanyModalFunctions } from './private-patient-change-company-functions';

@Component({
  selector: 'app-private-patient-change-company',
  templateUrl: './private-patient-change-company.component.html',
  styleUrls: ['./private-patient-change-company.component.scss']
})
export class PrivatePatientChangeCompanyComponent extends SharedUtilityComponent implements OnInit {

  @Input() appUser?: AppUser;

  @Output() reload = new EventEmitter<string>();

  form: FormGroup = {} as any;

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
    this.form = PrivatePatientChangeCompanyModalFunctions.createForm(this.fb, this.appUser);
  }

  updateFormFromAutoComplete(company: AppUser): void {
    this.form.patchValue({
      companyId: company.base?.id,
      companyName: company.company?.name,
    });
  }

  clearCompany(): void {
    this.form.patchValue({
      companyId: null,
    });
  }

  changeCompany(): void {
    this.isLoading = true;
    const sub = this.patientService.updateCompany(this.form.value)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: () => {
          this.toast.success('Company changed successfully');
          this.reload.emit();
          this.activeModal.close();
        },
        error: (error)=> {
          throw error;
        }
      });

    this.subscriptions.push(sub);
  }

}
