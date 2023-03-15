import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { finalize } from "rxjs";
import { SharedUtilityComponent } from "src/app/shared/components/shared-utility/shared-utility.component";
import { AppUser } from "src/app/shared/core/models/app-user";
import { InventoryFilter, AppInventory } from "src/app/shared/core/models/inventory";
import { ApplicationRoutes } from "src/app/shared/core/routes/app-routes";
import { InventoryService } from "src/app/shared/services/api/inventory/inventory.service";
import { CustomErrorService } from "src/app/shared/services/common/custom-error/custom-error.service";
import { CustomToastService } from "src/app/shared/services/common/custom-toast/custom-toast.service";
import { AddCompanyInventoryItemModalFunctions } from "./private-add-company-inventory-item-modal-functions";

@Component({
  selector: 'app-private-add-company-inventory-item-modal',
  templateUrl: './private-add-company-inventory-item-modal.component.html',
  styleUrls: ['./private-add-company-inventory-item-modal.component.scss']
})
export class PrivateAddCompanyInventoryItemModalComponent extends SharedUtilityComponent implements OnInit {

  @Input() company?: AppUser;
  @Output() reload = new EventEmitter();

  form: FormGroup = {} as any;
  routes = ApplicationRoutes.generateRoutes();

  filter: InventoryFilter = new InventoryFilter();

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    public errorService: CustomErrorService,
    private router: Router,
    private toast: CustomToastService,
    private inventoryService: InventoryService,
    ) {
    super();
  }

  override ngOnInit(): void {
    this.form = AddCompanyInventoryItemModalFunctions.createForm(this.fb, this.company);
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
      // inventoryName: null,
    });
  }

  createNewInventoryForCompany(): void {

    this.errorService.validateAllFields(this.form);
    if (this.form.invalid) { return; }

    this.isLoading = true;
    const data = { inventoryId: this.form.value.inventoryId, inventoryItemRequests: [this.form.value] };

    const sub = this.inventoryService.saveInventoryItems(data)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.toast.success('Inventory created successfully');
          this.reload.emit();
          this.activeModal.close();
        },
        error: (error) => {
          console.log(error);
          this.errorService.setFormErrors(error, this.form);
        }
      });

      this.subscriptions.push(sub);
  }

}
