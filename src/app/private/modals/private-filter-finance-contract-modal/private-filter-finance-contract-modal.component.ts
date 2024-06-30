import { FinancialFilter } from 'src/app/shared/core/models/financial';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomErrorService } from 'src/app/shared/services/common/custom-error/custom-error.service';
import { FilterInventoryModalFunctions } from '../private-filter-inventory-modal/private-filter-inventory-modal-functions';
import { PrivateFilterFinanceContractModalFunctions } from './private-filter-finance-contract-modal-functions';
import { ILookUp, AppConstants } from 'src/app/shared/core/models/app-constants';
import { EventBusService } from 'src/app/shared/services/common/event-bus/event-bus.service';

@Component({
  selector: 'app-private-filter-finance-contract-modal',
  templateUrl: './private-filter-finance-contract-modal.component.html',
  styleUrls: ['./private-filter-finance-contract-modal.component.scss']
})
export class PrivateFilterFinanceContractModalComponent implements OnInit {

  @Input() filter?: FinancialFilter;
  @Output() newFilter = new EventEmitter<FinancialFilter>();

  form: FormGroup = {} as any;

  lookups: ILookUp[] = [];
  lookupType = AppConstants.LookUpType;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    public errorService: CustomErrorService,
    private eventBus: EventBusService,
    ) { }

  ngOnInit(): void {
    this.setLookUp();
    this.initializeForm();
  }

  initializeForm() {
    this.form = PrivateFilterFinanceContractModalFunctions.createForm(this.fb, this.filter);
  }

  setLookUp(): void {
    this.lookups = this.eventBus.state.lookUps.value?.filter(x => x.type === this.lookupType.PaymentType) ?? [];
  }

  clearForm() {
    this.filter = new FinancialFilter();
    this.initializeForm();
  }

  addFilter() {
    this.newFilter.emit(this.form.value);
    this.activeModal.close();
  }
}
