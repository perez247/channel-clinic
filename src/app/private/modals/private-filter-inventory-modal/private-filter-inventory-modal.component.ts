import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ILookUp, AppConstants } from "src/app/shared/core/models/app-constants";
import { InventoryFilter } from "src/app/shared/core/models/inventory";
import { CustomErrorService } from "src/app/shared/services/common/custom-error/custom-error.service";
import { EventBusService } from "src/app/shared/services/common/event-bus/event-bus.service";
import { FilterInventoryModalFunctions } from "./private-filter-inventory-modal-functions";

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
    this.lookups = this.eventBus.getState().lookUps.value?.filter(x => x.type === this.lookupType.AppInventoryType) ?? [];
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
