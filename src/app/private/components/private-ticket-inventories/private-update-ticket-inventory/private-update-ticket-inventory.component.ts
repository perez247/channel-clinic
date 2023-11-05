import { Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { finalize } from 'rxjs';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { TicketInventory } from 'src/app/shared/core/models/app-ticket';
import { Confirmable } from 'src/app/shared/decorators/confirm-action-method-decorator';
import { InventoryService } from 'src/app/shared/services/api/inventory/inventory.service';
import { CustomToastService } from 'src/app/shared/services/common/custom-toast/custom-toast.service';

@Component({
  selector: 'app-private-update-ticket-inventory',
  templateUrl: './private-update-ticket-inventory.component.html',
  styleUrls: ['./private-update-ticket-inventory.component.scss']
})
export class PrivateUpdateTicketInventoryComponent extends SharedUtilityComponent implements OnInit, DoCheck {

  @Input() ticketInventory?: TicketInventory;
  @Output() reset = new EventEmitter<TicketInventory>();
  @Output() updating = new EventEmitter<TicketInventory>();
  oldTicketInventory: string = '';
  canUpdate = true;

  constructor(
    private inventoryService: InventoryService,
    private notify: CustomToastService
  ) {
    super();
  }

  ngDoCheck(): void {
    this.setCanUpdate();
  }

  override ngOnInit(): void {
    this.setValues();
  }

  setValues(): void {
    this.oldTicketInventory = JSON.stringify(this.ticketInventory);
  }

  setCanUpdate(): void {
    this.canUpdate = this.oldTicketInventory == JSON.stringify(this.ticketInventory);
  }

  @Confirmable({
    title: 'Update Ticket Inventory',
    html: 'Are you sure you want to update this ticket inventory. For admission log, after this you will not be able to update it anymore',
    confirmButtonText: 'Yes update',
    denyButtonText: 'No I changed my mind',
  })
  updateTicketInventory(): void {

    this.isLoading = true;
    const d = this.ticketInventory;

    this.updating.emit();

    const sub = this.inventoryService.updateTicketInventory({ ...d, ticketInventoryId: d?.base.id })
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: () => {
          this.notify.success("Updated successfully");
          this.ticketInventory!.updated = new Date().toString();
          this.setValues();
          this.reset.emit(this.ticketInventory);
        },
        error: (error) => {
          throw error;
        }
      });

      this.subscriptions.push(sub);
  }

}
