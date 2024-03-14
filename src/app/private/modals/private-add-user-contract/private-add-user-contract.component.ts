import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { AddUserContractFunctions } from './private-add_user-contract-function';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomErrorService } from 'src/app/shared/services/common/custom-error/custom-error.service';
import { CustomToastService } from 'src/app/shared/services/common/custom-toast/custom-toast.service';
import { Observable, finalize } from 'rxjs';
import { PatientService } from 'src/app/shared/services/api/patient/patient.service';
import { CompanyService } from 'src/app/shared/services/api/company/company.service';
import * as moment from 'moment';

export interface IAddUserContract {
  patientId: string;
  companyId: string;
  fullName: string;
}

@Component({
  selector: 'app-private-add-user-contract',
  templateUrl: './private-add-user-contract.component.html',
  styleUrls: ['./private-add-user-contract.component.scss']
})
export class PrivateAddUserContractComponent extends SharedUtilityComponent implements OnInit {

  @Input() contractInfo?: IAddUserContract;
  @Output() reload = new EventEmitter();

  form: FormGroup = {} as any;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    public errorService: CustomErrorService,
    private router: Router,
    private toast: CustomToastService,
    private patientService: PatientService,
    private companyService: CompanyService
    ) {
    super();
  }

  override ngOnInit(): void {
    this.form = AddUserContractFunctions.createForm(this.fb);
  }

  addContract(): void {

    const dataFromForm = this.form.value;
    dataFromForm.durationInDays = moment().add(dataFromForm.durationInDays, 'years').diff(moment(), 'days');
    const dataFromInput = this.contractInfo;
    const dataToSend = {
      ...dataFromForm,
      ...dataFromInput,
    }

    console.log(dataToSend);

    const service = this.contractInfo?.patientId ? this.patientService.addContract(dataToSend) : this.companyService.addCompanyContract(dataToSend);
    this.isLoading = true;
    const sub = service
                      .pipe(finalize(() => this.isLoading = false))
                      .subscribe({
                        next: () => {
                          this.reload.emit();
                          this.activeModal.close();
                        },
                        error: (error) => {
                          throw error;
                        }
                      });

    this.subscriptions.push(sub);
  }
}
