import { Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { finalize } from 'rxjs';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { AppTicket, TicketInventory } from 'src/app/shared/core/models/app-ticket';
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
  @Input() ticket?: AppTicket;
  @Input() isAdmission: boolean = false;
  @Output() reset = new EventEmitter<TicketInventory>();
  @Output() updating = new EventEmitter<TicketInventory>();
  oldTicketInventory: string = '';
  canUpdate = false;

  ignoreKeys = ['totalPrice'];

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
    // this.canUpdate = this.oldTicketInventory == JSON.stringify(this.ticketInventory);
    this.checkDifferences();
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

  @Confirmable({
    title: 'Conclude Ticket Inventory',
    html: 'Are you sure you want to conclude this ticket inventory. This action cannot be undone',
    confirmButtonText: 'Yes conclude',
    denyButtonText: 'No I changed my mind',
  })
  concludeTicketInventory(): void {

    if (!this.canUpdate) {
      this.notify.error("Kindly save all changes before concluding");
      return;
     }

    this.isLoading = true;
    const d = this.ticketInventory;

    this.updating.emit();

    const sub = this.inventoryService.concludeTicketInventory({ ticketInventoryId: d?.base.id })
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: () => {
          this.notify.success("Concluded successfully");
          this.ticketInventory!.concludedDate = new Date().toString();
          this.setValues();
          this.reset.emit(this.ticketInventory);
        },
        error: (error) => {
          throw error;
        }
      });

      this.subscriptions.push(sub);
  }

  checkDifferences(): void {
    const oldTicket = JSON.parse(this.oldTicketInventory);
    const obj: any =  this.ticketInventory;
    let canUpdate = false;
    for (const key in obj) {

      if (this.ignoreKeys.indexOf(key) < 0) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && typeof(obj[key]) !== 'object') {
          
          if (oldTicket[key] != obj[key]) {
            // console.log(key, '=>', 'old value => ', oldTicket[key], 'new value => ', obj[key]);
            canUpdate = true;
          }
        
        }
      }

    }
    this.canUpdate = canUpdate;
  }

}
