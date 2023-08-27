import { Component, OnInit } from '@angular/core';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { faEllipsisV, faBed } from '@fortawesome/free-solid-svg-icons';
import { AppTicket, TicketFilter } from 'src/app/shared/core/models/app-ticket';
import { AppPagination, PaginationRequest, PaginationResponse } from 'src/app/shared/core/models/pagination';
import { TicketService } from 'src/app/shared/services/api/ticket/ticket.service';
import { finalize } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrivateFilterTicketsComponent } from '../../modals/private-filter-tickets/private-filter-tickets.component';

@Component({
  selector: 'app-private-admissions',
  templateUrl: './private-admissions.component.html',
  styleUrls: ['./private-admissions.component.scss']
})
export class PrivateAdmissionsComponent extends SharedUtilityComponent implements OnInit {

  fonts = { faEllipsisV, faBed }

  tickets: AppTicket[] = [];
  appPagination = new AppPagination();
  filter = new TicketFilter();
  paginationRequest = new PaginationRequest<TicketFilter>(this.appPagination, this.filter);
  paginationResponse = new PaginationResponse<AppTicket[]>();

  constructor(
    private ticketService: TicketService,
    private modalService: NgbModal,
    ) {
    super();
  }

  override ngOnInit(): void {
    this.filter.appTicketStatus = 'ongoing';
    this.filter.appInventoryType = 'admission';
    this.filter.sentToFinance = true;
    this.filter.full = true;
    this.paginationRequest = new PaginationRequest<TicketFilter>(this.appPagination, this.filter);
    this.getTickets();
  }

  getTickets(): void {
    this.isLoading = true;
    const sub = this.ticketService.getTickets(this.paginationRequest)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.paginationResponse = data;
          this.tickets = data.result ?? [];
        },
        error: (error) => {
          throw error;
        }
      });
    this.subscriptions.push(sub);
  }

  pageChanged(e: number) {
    this.appPagination.pageNumber = e;
    this.paginationRequest = new PaginationRequest<TicketFilter>(this.appPagination, this.filter);
    this.getTickets();
  }

  openFilterTicketModal(): void {
    const modalRef = this.modalService.open(PrivateFilterTicketsComponent, { size: 'lg' });
    const component: PrivateFilterTicketsComponent = modalRef.componentInstance;
    component.filter = this.filter;
    component.admissionFilter = true;
    component.keepState = {
     appTicketStatus : 'ongoing',
     appInventoryType : 'admission',
     sentToFinance: true
    }

    const sub = component.newFilter.subscribe({
      next: (filter: TicketFilter) => {
        this.filter = filter;
        this.paginationRequest = new PaginationRequest<TicketFilter>(this.appPagination, this.filter);
        this.getTickets();
      }
    });
    this.subscriptions.push(sub);
  }

}
