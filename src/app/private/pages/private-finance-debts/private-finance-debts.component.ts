import { finalize } from 'rxjs';
import { FinancialService } from 'src/app/shared/services/api/financial/financial.service';
import { Debt, FinancialDebtFilter } from './../../../shared/core/models/financial';
import { Component, OnInit } from '@angular/core';
import { faSackXmark } from '@fortawesome/free-solid-svg-icons';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { AppPagination, PaginationRequest, PaginationResponse } from 'src/app/shared/core/models/pagination';
import { ApplicationRoutes } from 'src/app/shared/core/routes/app-routes';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-private-finance-debts',
  templateUrl: './private-finance-debts.component.html',
  styleUrls: ['./private-finance-debts.component.scss']
})
export class PrivateFinanceDebtsComponent extends SharedUtilityComponent implements OnInit {

  fonts = { faSackXmark }

  routes = ApplicationRoutes.generateRoutes();

  debts: Debt[] = [];
  appPagination = new AppPagination();
  filter = new FinancialDebtFilter();
  paginationRequest = new PaginationRequest<FinancialDebtFilter>(this.appPagination, this.filter);
  paginationResponse = new PaginationResponse<Debt[]>();

  constructor(
    private modalService: NgbModal,
    private financialService: FinancialService
    ) {
    super();
  }

  override ngOnInit(): void {
    this.getDebts();
  }

  getDebts(): void {
    this.isLoading = true;
    const sub = this.financialService.debts(this.paginationRequest)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.paginationResponse = data;
          this.debts = data.result ?? [];
          console.log(this.debts);
        },
        error: (error) => {
          throw error;
        }
      });

    this.subscriptions.push(sub);
  }

  pageChanged(e: number) {
    this.appPagination.pageNumber = e;
    this.paginationRequest = new PaginationRequest<FinancialDebtFilter>(this.appPagination, this.filter);
    this.getDebts();
  }

}
