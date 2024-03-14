import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { ActivityLog, ActivityLogFilter } from 'src/app/shared/core/models/activity-log';
import { AppInventory } from 'src/app/shared/core/models/inventory';
import { AppPagination, PaginationContext } from 'src/app/shared/core/models/pagination';
import { ActivityLogService } from 'src/app/shared/services/api/activity-log/activity-log.service';
import { InventoryService } from 'src/app/shared/services/api/inventory/inventory.service';

@Component({
  selector: 'app-private-inventory-logs',
  templateUrl: './private-inventory-logs.component.html',
  styleUrls: ['./private-inventory-logs.component.scss']
})
export class PrivateInventoryLogsComponent extends SharedUtilityComponent implements OnInit {

  @Input() inventory?: AppInventory;

  pagination = new PaginationContext<ActivityLog, ActivityLogFilter>();

  constructor(
    private activityLogService: ActivityLogService
  ) {
    super();
  }

  override ngOnInit(): void {
    this.pagination.initialize();
    this.pagination.request?.setFilter({ objectId: this.inventory?.base?.id, actionType: 'UpdateQuantityCommand' })
    this.getLogs();
  }

  getLogs(): void {
    this.isLoading = true;
    const sub = this.activityLogService.getLogs(this.pagination.request)
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
    this.getLogs();
  }
}
