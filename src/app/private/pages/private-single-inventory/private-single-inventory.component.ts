import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faWarehouse } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { AppConstants } from 'src/app/shared/core/models/app-constants';
import { AppInventory, InventoryFilter } from 'src/app/shared/core/models/inventory';
import { AppPagination, PaginationRequest, PaginationResponse } from 'src/app/shared/core/models/pagination';
import { ApplicationRoutes } from 'src/app/shared/core/routes/app-routes';
import { InventoryService } from 'src/app/shared/services/api/inventory/inventory.service';
import { CustomToastService } from 'src/app/shared/services/common/custom-toast/custom-toast.service';

@Component({
  selector: 'app-private-single-inventory',
  templateUrl: './private-single-inventory.component.html',
  styleUrls: ['./private-single-inventory.component.scss']
})
export class PrivateSingleInventoryComponent extends SharedUtilityComponent implements OnInit {

  fonts = { faWarehouse }
  userSections = AppConstants.UserSections;
  currentSection = this.userSections.inventoryDetails;

  routes = ApplicationRoutes.generateRoutes();

  inventories: AppInventory[] = [];
  inventory?: AppInventory;
  appPagination = new AppPagination();
  filter = new InventoryFilter();
  paginationRequest = new PaginationRequest<InventoryFilter>(this.appPagination, this.filter);
  paginationResponse = new PaginationResponse<any[]>();

  disableTabs = false;

  constructor(
    private modalService: NgbModal,
    private inventoryService: InventoryService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: CustomToastService,
    ) {
    super();
  }

  override ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.filter.inventoryId = id;
    this.paginationRequest = new PaginationRequest<InventoryFilter>(this.appPagination, this.filter);
    this.getInventories(this.currentSection);
  }

  getInventories(currentSection: string): void {
    this.currentSection = currentSection;
    this.isLoading = true;
    const sub = this.inventoryService.getInventories(this.paginationRequest)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {


          if (data.totalItems <= 0) {
            this.toast.error('Inventory not found');
            this.router.navigate([this.routes.privateRoute.inventories().$absolutePath]);
            return;
          }

          this.paginationResponse = data;
          this.inventories = data.result ?? [];
          this.inventory = this.inventories[0];
        },
        error: (error) => {
          console.log(error);
        }
      });
    this.subscriptions.push(sub);
  }
}
