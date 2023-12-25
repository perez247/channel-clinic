import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppInventory } from 'src/app/shared/core/models/inventory';
import { InventoryService } from 'src/app/shared/services/api/inventory/inventory.service';
import { CustomErrorService } from 'src/app/shared/services/common/custom-error/custom-error.service';
import { CustomToastService } from 'src/app/shared/services/common/custom-toast/custom-toast.service';
import { PrivateUpdateQuantityFunction } from './private-update-quantity-function';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-private-update-quantity',
  templateUrl: './private-update-quantity.component.html',
  styleUrls: ['./private-update-quantity.component.scss']
})
export class PrivateUpdateQuantityComponent extends SharedUtilityComponent implements OnInit {

  @Input() inventory?: AppInventory;

  @Output() reload = new EventEmitter<string>();

  form: FormGroup = {} as any;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    public errorService: CustomErrorService,
    private inventoryService: InventoryService,
    private toast: CustomToastService) {
    super();
  }

  override ngOnInit(): void {
    this.initialiazeForm();
  }

  initialiazeForm(): void {
    this.form = PrivateUpdateQuantityFunction.createForm(this.fb, this.inventory);
  }

  updateQuantity(): void {
    this.isLoading = true;
    const sub = this.inventoryService.updateQuantity(this.form.value)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: () => {
          this.toast.success('Quantity updated successfully');
          this.reload.emit();
          this.activeModal.close();
        },
        error: (error) => {
          throw error;
        }
      })
  }
}
