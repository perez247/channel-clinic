import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { Component, OnInit } from '@angular/core';
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';
import { ApplicationRoutes } from 'src/app/shared/core/routes/app-routes';
import { FinancialDebtFilter } from 'src/app/shared/core/models/financial';
import { AppPagination, PaginationRequest, PaginationResponse } from 'src/app/shared/core/models/pagination';

@Component({
  selector: 'app-private-finance-paid',
  templateUrl: './private-finance-paid.component.html',
  styleUrls: ['./private-finance-paid.component.scss']
})
export class PrivateFinancePaidComponent extends SharedUtilityComponent implements OnInit {

  fonts = { faHandHoldingDollar }

  routes = ApplicationRoutes.generateRoutes();

  debts: any[] = [];
  appPagination = new AppPagination();
  filter = new FinancialDebtFilter();
  paginationRequest = new PaginationRequest<FinancialDebtFilter>(this.appPagination, this.filter);
  paginationResponse = new PaginationResponse<any[]>();

  constructor() {
    super();
  }

  override ngOnInit(): void {
  }

}
