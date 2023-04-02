import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomErrorService } from 'src/app/shared/services/common/custom-error/custom-error.service';
import { PrivateAddPharmacyTicketInventoryFunctions } from './private-add-pharmacy-ticket-inventory-modal-functions';
import { AppTicketTypes, ITicketInventory, TicketInventory } from 'src/app/shared/core/models/app-ticket';
import { AppInventory, InventoryFilter } from 'src/app/shared/core/models/inventory';

@Component({
  selector: 'app-private-add-pharmacy-ticket-inventory-modal',
  templateUrl: './private-add-pharmacy-ticket-inventory-modal.component.html',
  styleUrls: ['./private-add-pharmacy-ticket-inventory-modal.component.scss']
})
export class PrivateAddPharmacyTicketInventoryModalComponent implements OnInit {

  @Input() appInventory?: ITicketInventory;

  @Output() itemSaved = new EventEmitter();

  form: FormGroup = {} as any;
  filter: InventoryFilter = new InventoryFilter();

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    public errorService: CustomErrorService,
    ) { }

  ngOnInit(): void {
    this.filter.appInventoryType = [AppTicketTypes.pharmacy];
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = PrivateAddPharmacyTicketInventoryFunctions.createForm(this.fb, this.appInventory);
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
