import { InventoryService } from 'src/app/shared/services/api/inventory/inventory.service';
import { AppTicket, AppTicketTypes, TicketInventory, TicketInventoryFilter } from './../../../../shared/core/models/app-ticket';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { UtilityHelpers } from 'src/app/shared/core/functions/utility-helpers';
import { AdmissionPrescription } from 'src/app/shared/core/models/admission-prescription';
import { finalize } from 'rxjs';
import { AppPagination, PaginationContext } from 'src/app/shared/core/models/pagination';
import { AppInventoryItem } from 'src/app/shared/core/models/inventory';
import { AppRoles } from 'src/app/shared/core/models/app-roles';

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
          this.calculateNewTotal(this.ticket.appointment.company?.base?.id || '');
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

  calculateNewTotal(companyId: string): void
  {
    if (this.pagination.elements.length <= 0) { return; }

    const data = {
      companyId: companyId,
      appInventories: this.pagination.elements.map(x => {
        return {
          appInventoryId: x.inventory.base?.id
        }
      }),
    }

    this.isLoading = true;
    const sub = this.inventoryService.getInventoryItemPrices(data)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.inventoryItems = data;
        },
        error: (error) => {
          this.inventoryItems = [];
          throw error;
        }
      });

    this.subscriptions.push(sub);
  }
}
