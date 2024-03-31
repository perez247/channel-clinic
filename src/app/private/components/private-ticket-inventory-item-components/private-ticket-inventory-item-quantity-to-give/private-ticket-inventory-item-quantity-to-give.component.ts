import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { faNairaSign } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTicketInventoryDebtorComponent } from 'src/app/private/modals/add-ticket-inventory-debtor/add-ticket-inventory-debtor.component';
import { AppRoles } from 'src/app/shared/core/models/app-roles';
import { AppTicket, TicketInventory } from 'src/app/shared/core/models/app-ticket';
import { AppUser } from 'src/app/shared/core/models/app-user';
import { AppInventoryItem } from 'src/app/shared/core/models/inventory';
import { EventBusService } from 'src/app/shared/services/common/event-bus/event-bus.service';

@Component({
  selector: 'app-private-ticket-inventory-item-quantity-to-give',
  templateUrl: './private-ticket-inventory-item-quantity-to-give.component.html',
  styleUrls: ['./private-ticket-inventory-item-quantity-to-give.component.scss']
})
export class PrivateTicketInventoryItemQuantityToGiveComponent implements OnInit, OnChanges {

  @Input() ticket: AppTicket = {} as AppTicket;
  @Input() ticketInventory: TicketInventory = {} as TicketInventory;
  @Input() isAdmission = false;
  @Input() inventoryItems: AppInventoryItem[] = [];
  @Input() isAdmissionExecution = false;

  @Output() onBlur = new EventEmitter();

  canEdit = true;

  constructor(
    private modalService: NgbModal,
    private eventBus: EventBusService
  ) {}

  pricePerItem = 0;
  sumTotal = 0;

  roles = AppRoles;

  fonts = { faNairaSign }
  user: AppUser = {} as AppUser;

  ngOnInit(): void {
    this.user = new AppUser(this.eventBus.getState().user.value ?? {});
    this.canEditQuantity();
  }

  ngOnChanges(): void {
    this.setPrice();
  }

  blur(): void {
    this.setTotal();
    this.onBlur.emit();
  }

  setPrice(): void {
    const appInventory = this.inventoryItems.find(x => x.inventory?.base?.id == this.ticketInventory.inventory.base?.id);

    this.pricePerItem = appInventory?.pricePerItem || 0;

    this.setTotal();
  }

  setTotal(): void {
    this.sumTotal = (this.ticketInventory?.prescribedQuantity || 0) * this.pricePerItem;
    this.ticketInventory.totalPrice = this.ticketInventory.totalPrice ? this.ticketInventory.totalPrice : this.sumTotal;
    this.ticketInventory.concludedPrice = this.ticketInventory.concludedPrice ? this.ticketInventory.concludedPrice : this.sumTotal;
  }

  saveDebtor(): void {
    const modalRef = this.modalService.open(AddTicketInventoryDebtorComponent, { size: 'lg' });
    const component: AddTicketInventoryDebtorComponent = modalRef.componentInstance;

    component.ticketInventory = this.ticketInventory;
    component.sumTotal = this.ticketInventory.totalPrice ? this.ticketInventory.totalPrice : this.sumTotal;
  }

  canEditQuantity(): void {
    this.canEdit = this.user.hasClaim([AppRoles.admin, this.ticketInventory.inventory?.appInventoryType ?? ''], false);
  }
}
