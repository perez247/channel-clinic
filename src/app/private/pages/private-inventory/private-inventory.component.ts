import { Component, OnInit } from "@angular/core";
import { faWarehouse } from "@fortawesome/free-solid-svg-icons";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { finalize } from "rxjs";
import { SharedUtilityComponent } from "src/app/shared/components/shared-utility/shared-utility.component";
import { AppInventory, InventoryFilter } from "src/app/shared/core/models/inventory";
import { AppPagination, PaginationRequest, PaginationResponse } from "src/app/shared/core/models/pagination";
import { ApplicationRoutes } from "src/app/shared/core/routes/app-routes";
import { InventoryService } from "src/app/shared/services/api/inventory/inventory.service";
import { PrivateAddInventoryModalComponent } from "../../modals/private-add-inventory-modal/private-add-inventory-modal.component";
import { PrivateFilterInventoryModalComponent } from "../../modals/private-filter-inventory-modal/private-filter-inventory-modal.component";

@Component({
  selector: 'app-private-inventory',
  templateUrl: './private-inventory.component.html',
  styleUrls: ['./private-inventory.component.scss']
})
export class PrivateInventoryComponent extends SharedUtilityComponent implements OnInit {

  fonts = { faWarehouse }

  routes = ApplicationRoutes.generateRoutes();

  inventories: AppInventory[] = [];
  appPagination = new AppPagination();
  filter = new InventoryFilter();
  paginationRequest = new PaginationRequest<InventoryFilter>(this.appPagination, this.filter);
  paginationResponse = new PaginationResponse<any[]>();

  constructor(
    private modalService: NgbModal,
    private inventoryService: InventoryService
    ) {
    super();
  }

  override ngOnInit(): void {
    this.getInventories();
  }

  getInventories(): void {
    this.isLoading = true;
    const sub = this.inventoryService.getInventories(this.paginationRequest)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.paginationResponse = data;
          this.inventories = data.result ?? [];
        },
        error: (error) => {
          console.log(error);
        }
      });
    this.subscriptions.push(sub);
  }

  pageChanged(e: number) {
    this.appPagination.pageNumber = e;
    this.paginationRequest = new PaginationRequest<InventoryFilter>(this.appPagination, this.filter);
    this.getInventories();
  }

  openFilterPatients() {
    const modalRef = this.modalService.open(PrivateFilterInventoryModalComponent);
    modalRef.componentInstance.filter = this.filter;

    const sub = modalRef.componentInstance.newFilter.subscribe({
      next: (filter: InventoryFilter) => {
        this.filter = filter;
        this.pageChanged(1);
      }
    });

    this.subscriptions.push(sub);
  }

  openAddInventoryModal() {
    this.modalService.open(PrivateAddInventoryModalComponent, { size: 'lg' });
  }

}
