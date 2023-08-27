import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ITicketInventory, AppTicketTypes } from 'src/app/shared/core/models/app-ticket';
import { InventoryFilter, AppInventory } from 'src/app/shared/core/models/inventory';
import { CustomErrorService } from 'src/app/shared/services/common/custom-error/custom-error.service';
import { PrivateGetInventoryFunctions } from './private-get-inventory-functions';
import { AppConstants } from 'src/app/shared/core/models/app-constants';

@Component({
  selector: 'app-private-get-inventory-modal',
  templateUrl: './private-get-inventory-modal.component.html',
  styleUrls: ['./private-get-inventory-modal.component.scss']
})
export class PrivateGetInventoryModalComponent implements OnInit {

  @Input() appInventory?: ITicketInventory;
  @Input() type: string = AppTicketTypes.pharmacy;

  @Output() itemSaved = new EventEmitter();

  form: FormGroup = {} as any;
  filter: InventoryFilter = new InventoryFilter();

  canShowTimeAndFrequency = false;

  frequencies = AppConstants.TicketFrequency;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    public errorService: CustomErrorService,
    ) { }

  ngOnInit(): void {
    this.filter.appInventoryType = [this.type];
    this.canShowTimeAndFrequency = this.type == AppTicketTypes.pharmacy //|| this.type == AppTicketTypes.lab || this.type == AppTicketTypes.radiology;
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = PrivateGetInventoryFunctions.createForm(this.fb, this.canShowTimeAndFrequency, this.appInventory);
  }

  updateInventoryName(inventory: AppInventory): void {
    this.form.patchValue({
      inventoryId: inventory.base?.id,
      inventoryName: inventory.name,
    });
  }

  clearInventory(): void {
    this.form.patchValue({
      inventoryId: null,
    });
  }

  save(): void {
    this.itemSaved.emit(this.form.value);
    this.activeModal.close();
  }
}
