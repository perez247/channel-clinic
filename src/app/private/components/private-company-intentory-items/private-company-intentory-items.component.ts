import { EventBusService } from './../../../shared/services/common/event-bus/event-bus.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faKitMedical, faNairaSign, faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { AppConstants } from 'src/app/shared/core/models/app-constants';
import { AppRoles } from 'src/app/shared/core/models/app-roles';
import { AppUser } from 'src/app/shared/core/models/app-user';
import { AppInventory, AppInventoryItem, InventoryItemFilter } from 'src/app/shared/core/models/inventory';
import { AppPagination, PaginationContext, PaginationRequest, PaginationResponse } from 'src/app/shared/core/models/pagination';
import { ApplicationRoutes } from 'src/app/shared/core/routes/app-routes';
import { InventoryService } from 'src/app/shared/services/api/inventory/inventory.service';
import { PrivateAddCompanyInventoryItemModalComponent } from '../../modals/private-add-company-inventory-item-modal/private-add-company-inventory-item-modal.component';
import { PrivateFilterCompanyInventoryItemsModalComponent } from '../../modals/private-filter-company-inventory-items-modal/private-filter-company-inventory-items-modal.component';
import { PrivateBulkUploadInventoryComponent } from '../../modals/private-bulk-upload-inventory/private-bulk-upload-inventory.component';

@Component({
  selector: 'app-private-company-intentory-items',
  templateUrl: './private-company-intentory-items.component.html',
  styleUrls: ['./private-company-intentory-items.component.scss']
})
export class PrivateCompanyIntentoryItemsComponent extends SharedUtilityComponent implements OnInit {

  @Output() reload = new EventEmitter<string>();
  @Input() company?: AppUser;

  fonts = { faKitMedical, faNairaSign, faTrash, faPencil }

  userSections = AppConstants.UserSections;

  routes = ApplicationRoutes.generateRoutes();

  pagination = new PaginationContext<AppInventoryItem, InventoryItemFilter>();

  roles = AppRoles;

  ticketRoles: (string | undefined)[] = []
  lookupType = AppConstants.LookUpType;

  constructor(
    private modalService: NgbModal,
    private inventoryService: InventoryService,
    private eventBus: EventBusService
    ) {
    super();
  }

  override ngOnInit(): void {
    this.pagination.initialize();
    this.pagination.request?.setFilter({ companyId: this.company?.company?.base?.id });
    this.setTicketRoles();
    this.getInventories();
  }

  setTicketRoles(): void {
    this.ticketRoles = this.eventBus.getState().lookUps.value?.filter(x => x.type === this.lookupType.AppInventoryType).map(y => y.name) || [];
    this.ticketRoles?.push(this.roles.admin);
  }

  getInventories(): void {
    this.isLoading = true;
    const sub = this.inventoryService.getInventoryItems(this.pagination.request)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.pagination.setResponse(data, false);
        },
        error: (error) => {
          throw error;
        }
      });
    this.subscriptions.push(sub);
  }

  pageChanged(e: number) {
    this.pagination.request?.setPagination({ pageNumber: e } as AppPagination);
    this.getInventories();
  }

  openFilterInventoryItems() {
    const modalRef = this.modalService.open(PrivateFilterCompanyInventoryItemsModalComponent);
    modalRef.componentInstance.filter = this.pagination.request?.getFilter();

    const sub = modalRef.componentInstance.newFilter.subscribe({
      next: (filter: InventoryItemFilter) => {
        this.pagination.request?.setFilter(filter);
        this.pageChanged(1);
      }
    });

    this.subscriptions.push(sub);
  }

  addCompanyInventoryItem(): void {
    const modalRef = this.modalService.open(PrivateAddCompanyInventoryItemModalComponent, { size: 'lg' });

    modalRef.componentInstance.company = this.company;
    modalRef.componentInstance.reload.subscribe({
      next: (data: any) => {
        this.reload.emit(this.userSections.companyInventoryItems);
      }
    })
  }

  addCompanyBulkFile(): void {
    const modalRef = this.modalService.open(PrivateBulkUploadInventoryComponent, { fullscreen: true });
    const component: PrivateBulkUploadInventoryComponent = modalRef.componentInstance;

    component.companyId = this.company?.company?.base?.id || '';
    component.reload.subscribe({
      next: (data: any) => {
        this.reload.emit(this.userSections.companyInventoryItems);
      }
    })
  }
}
