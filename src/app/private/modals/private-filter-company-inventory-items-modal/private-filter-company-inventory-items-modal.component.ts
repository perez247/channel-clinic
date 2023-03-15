import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { InventoryItemFilter } from "src/app/shared/core/models/inventory";
import { CustomErrorService } from "src/app/shared/services/common/custom-error/custom-error.service";
import { EventBusService } from "src/app/shared/services/common/event-bus/event-bus.service";
import { FilterCompanyInventoryItemModalFunctions } from "./private-filter-company-inventory-items-modal-functions";

@Component({
  selector: 'app-private-filter-company-inventory-items-modal',
  templateUrl: './private-filter-company-inventory-items-modal.component.html',
  styleUrls: ['./private-filter-company-inventory-items-modal.component.scss']
})
export class PrivateFilterCompanyInventoryItemsModalComponent implements OnInit {

  @Input() filter?: InventoryItemFilter;
  @Output() newFilter = new EventEmitter<InventoryItemFilter>();

  form: FormGroup = {} as any;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    public errorService: CustomErrorService,
    private eventBus: EventBusService,
    ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.form = FilterCompanyInventoryItemModalFunctions.createForm(this.fb, this.filter);
  }

  clearForm() {
    const companyId = this.filter?.companyId;
    this.filter = new InventoryItemFilter();
    this.filter.companyId = companyId;
    this.initializeForm();
  }

  addFilter() {
    this.newFilter.emit(this.form.value);
    this.activeModal.close();
  }
}
