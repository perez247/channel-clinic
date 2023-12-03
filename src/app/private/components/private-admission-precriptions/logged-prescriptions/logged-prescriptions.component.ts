import { InventoryService } from 'src/app/shared/services/api/inventory/inventory.service';
import { AppTicket, AppTicketTypes, TicketInventory, TicketInventoryFilter } from './../../../../shared/core/models/app-ticket';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { UtilityHelpers } from 'src/app/shared/core/functions/utility-helpers';
import { AdmissionPrescription } from 'src/app/shared/core/models/admission-prescription';
import { finalize } from 'rxjs';
import { AppPagination, PaginationContext } from 'src/app/shared/core/models/pagination';
import { AppInventoryItem } from 'src/app/shared/core/models/inventory';

@Component({
  selector: 'app-logged-prescriptions',
  templateUrl: './logged-prescriptions.component.html',
  styleUrls: ['./logged-prescriptions.component.scss']
})
export class LoggedPrescriptionsComponent extends SharedUtilityComponent implements OnInit, OnChanges {

  @Input() prescription?: AdmissionPrescription;
  @Input() update: string = '1';
  @Input() ticket: AppTicket = {} as AppTicket;

  pagination = new PaginationContext<TicketInventory, TicketInventoryFilter>();

  types = AppTicketTypes;

  inventoryItems: AppInventoryItem[] = [];

  constructor(
    private inventoryService: InventoryService
  ) {
    super();
  }

  override ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.pagination.initialize();

    this.pagination.request?.setFilter({ prescriptionId: this.prescription?.base?.id, isTickets: true });

    this.getLoggedPrescriptions();
  }

  getLoggedPrescriptions(): void {
    this.isLoading = true;
    const sub = this.inventoryService.getTicketInventories(this.pagination.request)
      .pipe(finalize(() => this.isLoading = false ))
      .subscribe({
        next: (data) => {
          this.pagination.setResponse(data, true);
        },
        error: (error) => {
          throw error;
        }
      });

      this.subscriptions.push(sub);
  }

  pageChanged(e: number) {
    this.pagination.request?.setPagination({ pageNumber: e } as AppPagination);
    this.getLoggedPrescriptions();
  }
}
