import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PrivateSaveFinanceRecordFunctions } from './private-save-finance-record-functions';
import { CustomErrorService } from 'src/app/shared/services/common/custom-error/custom-error.service';
import { AppUser } from 'src/app/shared/core/models/app-user';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { FinancialService } from 'src/app/shared/services/api/financial/financial.service';
import { finalize } from 'rxjs';
import { CustomToastService } from 'src/app/shared/services/common/custom-toast/custom-toast.service';
import { Confirmable } from 'src/app/shared/decorators/confirm-action-method-decorator';

@Component({
  selector: 'app-private-save-finance-record',
  templateUrl: './private-save-finance-record.component.html',
  styleUrls: ['./private-save-finance-record.component.scss']
})
export class PrivateSaveFinanceRecordComponent extends SharedUtilityComponent implements OnInit {

  form: FormGroup = {} as any;

  recordAdded = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    public errorService: CustomErrorService,
    private financialService: FinancialService,
    private toast: CustomToastService
  ) {
    super();
  }

  override ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = PrivateSaveFinanceRecordFunctions.createForm(this.fb);
  }

  addUser(selectedActee: AppUser): void {
    this.form.patchValue({
      acteeId: selectedActee?.base?.id,
      actee: `${selectedActee.lastName} ${selectedActee.firstName} ${selectedActee.otherName}`,
    });
  }

  clearActee(): void {
    this.form.patchValue({
      acteeId: null
    });
  }

  @Confirmable({
    title: 'Add Record',
    html: 'Once added, it cannot be reomved. You will have to add a new record to counter any mistakes',
    confirmButtonText: 'Yes, Add record',
    denyButtonText: 'No I changed my mind',
  })
  save(): void {
    this.isLoading = true;
    const sub = this.financialService.addRecord(this.form.value)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: () => {
          this.toast.success('Record added sucessfully');
          this.recordAdded.emit();
          this.activeModal.close();
        }
      });
  }
}
