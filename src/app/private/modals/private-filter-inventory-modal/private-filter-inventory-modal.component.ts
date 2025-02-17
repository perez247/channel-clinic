import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FormGroup, FormBuilder } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ILookUp, AppConstants } from "src/app/shared/core/models/app-constants";
import { InventoryFilter } from "src/app/shared/core/models/inventory";
import { CustomErrorService } from "src/app/shared/services/common/custom-error/custom-error.service";
import { EventBusService } from "src/app/shared/services/common/event-bus/event-bus.service";
import { FilterInventoryModalFunctions } from "./private-filter-inventory-modal-functions";
import { AppUser } from "src/app/shared/core/models/app-user";

@Component({
  selector: 'app-private-filter-inventory-modal',
  templateUrl: './private-filter-inventory-modal.component.html',
  styleUrls: ['./private-filter-inventory-modal.component.scss']
})
export class PrivateFilterInventoryModalComponent implements OnInit {

  @Input() filter?: InventoryFilter;
  @Output() newFilter = new EventEmitter<InventoryFilter>();

  form: FormGroup = {} as any;

  lookups: ILookUp[] = [];
  lookupType = AppConstants.LookUpType;

  fonts = { faTrash }

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
    this.form = FilterInventoryModalFunctions.createForm(this.fb, this.filter);
  }

  setLookUp(): void {
    this.lookups = this.eventBus.state.lookUps.value?.filter(x => x.type === this.lookupType.AppInventoryType) ?? [];
  }

  setCompany(company: AppUser) {
    this.form.patchValue({
      companyId: company.company?.base?.id,
      companyName: company.company?.name,
    });
  }

  clearCompany() {
    this.form.patchValue({
      companyId: null,
      companyName: null,
    });
  }

  clearForm() {
    this.filter = new InventoryFilter();
    this.initializeForm();
  }

  addFilter() {
    this.newFilter.emit(this.form.value);
    this.activeModal.close();
  }
}
