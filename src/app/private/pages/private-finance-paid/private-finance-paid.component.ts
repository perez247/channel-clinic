import { FinancialService } from 'src/app/shared/services/api/financial/financial.service';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { Component, OnInit } from '@angular/core';
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';
import { ApplicationRoutes } from 'src/app/shared/core/routes/app-routes';
import { AppPaid, FinancialDebtFilter } from 'src/app/shared/core/models/financial';
import { AppPagination, PaginationContext, PaginationRequest, PaginationResponse } from 'src/app/shared/core/models/pagination';
import { finalize } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrivateFilterFinanceDebtsModalComponent } from '../../modals/private-filter-finance-debts-modal/private-filter-finance-debts-modal.component';
import { PrivateSaveFinanceRecordComponent } from '../../modals/private-save-finance-record/private-save-finance-record.component';
import * as moment from 'moment';

@Component({
  selector: 'app-private-finance-paid',
  templateUrl: './private-finance-paid.component.html',
  styleUrls: ['./private-finance-paid.component.scss']
})
export class PrivateFinancePaidComponent extends SharedUtilityComponent implements OnInit {

  fonts = { faHandHoldingDollar }

  routes = ApplicationRoutes.generateRoutes();

  item = 0;

  pagination = new PaginationContext<AppPaid, FinancialDebtFilter>();

  arr: any[] = [];

  revenue = {
    profit: 0,
    expense: 0,
    totalExpense: 0,
    totalProfit: 0
  }

  startDate = moment();
  endDate = moment();

  loadingRevenue = false;

  constructor(
    private financialService: FinancialService,
    private modalService: NgbModal,
  ) {
    super();
  }

  override ngOnInit(): void {
    this.pagination.initialize();
    this.pagination.request?.setFilter({ startDate: moment().startOf('month').startOf('day').toDate(), endDate: moment().endOf('month').startOf('day').toDate() })
    this.getPaid();
  }

  getPaid(): void {
    this.isLoading = true;
    const sub = this.financialService.paid(this.pagination.request)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.pagination.setResponse(data, false);
          if (this.pagination.request?.getFilter()?.startDate && this.pagination.request.getFilter()?.endDate) {
            this.getRevenue();
          }
        },
        error: (error) => {
          throw error;
        }
      });

    this.subscriptions.push(sub);
  }

  pageChanged(e: number) {
    this.pagination.request?.setPagination({ pageNumber: e } as AppPagination);
    this.getPaid();
  }

  openFilter() {
    const modalRef = this.modalService.open(PrivateFilterFinanceDebtsModalComponent, { size: 'lg' });
    modalRef.componentInstance.filter = this.pagination.request?.getFilter();

    const sub = modalRef.componentInstance.newFilter.subscribe({
      next: (filter: FinancialDebtFilter) => {
        this.pagination.request?.setFilter(filter);
        this.pageChanged(1);
      }
    });

    this.subscriptions.push(sub);
  }

  addRecordManually() {
    const modalRef = this.modalService.open(PrivateSaveFinanceRecordComponent, { size: 'lg' });
    const component: PrivateSaveFinanceRecordComponent = modalRef.componentInstance;

    const sub = component.recordAdded.subscribe({
      next: () => {
        this.pageChanged(1);
      }
    });

    this.subscriptions.push(sub);
  }

  getRevenue(): void {
    this.loadingRevenue = true;
    let { startDate, endDate } = this.pagination.request?.getFilter() || {};

    const sd = moment(startDate).local().toISOString();
    const ed = moment(endDate).local().toISOString();
    
    const sub = this.financialService.getRevenue({ startDate: sd, endDate: ed })
      .pipe(finalize(() => this.loadingRevenue = false))
      .subscribe({
        next: (data) => {
          this.revenue = data;
        },
        error: (error) => {
          throw error;
        }
      })
  }

}
