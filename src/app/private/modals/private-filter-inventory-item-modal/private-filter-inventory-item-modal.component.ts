import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { AppUser } from "src/app/shared/core/models/app-user";
import { InventoryItemFilter } from "src/app/shared/core/models/inventory";
import { CustomErrorService } from "src/app/shared/services/common/custom-error/custom-error.service";
import { EventBusService } from "src/app/shared/services/common/event-bus/event-bus.service";
import { FilterInventoryItemModalFunctions } from "./private-filter-inventory-item-modal-functions";

@Component({
  selector: 'app-private-filter-inventory-item-modal',
  templateUrl: './private-filter-inventory-item-modal.component.html',
  styleUrls: ['./private-filter-inventory-item-modal.component.scss']
})
export class PrivateFilterInventoryItemModalComponent implements OnInit {

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
    this.form = FilterInventoryItemModalFunctions.createForm(this.fb, this.filter);
  }

  setCompany(company: AppUser) {
    this.form.patchValue({
      companyId: company.company?.base?.id,
      companyName: company.company?.name,
    });
  }

  clearForm() {
    const appInventoryId = this.filter?.appInventoryId;
    this.filter = new InventoryItemFilter();
    this.filter.appInventoryId = appInventoryId;
    this.initializeForm();
  }

  addFilter() {
    this.newFilter.emit(this.form.value);
    this.activeModal.close();
  }
}
