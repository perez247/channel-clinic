import { InventoryService } from 'src/app/shared/services/api/inventory/inventory.service';
import { TicketInventory, TicketInventoryFilter } from './../../../../shared/core/models/app-ticket';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { UtilityHelpers } from 'src/app/shared/core/functions/utility-helpers';
import { AdmissionPrescription } from 'src/app/shared/core/models/admission-prescription';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-logged-prescriptions',
  templateUrl: './logged-prescriptions.component.html',
  styleUrls: ['./logged-prescriptions.component.scss']
})
export class LoggedPrescriptionsComponent extends SharedUtilityComponent implements OnInit, OnChanges {

  @Input() prescription?: AdmissionPrescription;
  @Input() update: string = '1';

  pagination = UtilityHelpers.initializePagination<TicketInventory, TicketInventoryFilter>(new TicketInventoryFilter());

  constructor(
    private inventoryService: InventoryService
  ) {
    super();
  }

  override ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (Object.keys(this.pagination.paginationRequest.getFilter() || {}).length <= 0) {
      this.pagination.paginationRequest.setFilter({ prescriptionId: this.prescription?.base?.id, isTickets: true })
    }
    this.getLoggedPrescriptions();
  }

  getLoggedPrescriptions(): void {
    this.isLoading = true;
    const sub = this.inventoryService.getTicketInventories(this.pagination.paginationRequest)
      .pipe(finalize(() => this.isLoading = false ))
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          throw error;
        }
      });

      this.subscriptions.push(sub);
  }
}
