import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TicketService } from 'src/app/shared/services/api/ticket/ticket.service';
import { TicketFilter, AppTicket } from 'src/app/shared/core/models/app-ticket';
import { Component, OnInit } from '@angular/core';
import { faTicket, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { AppPagination, PaginationRequest, PaginationResponse } from 'src/app/shared/core/models/pagination';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { finalize, filter } from 'rxjs';
import { PrivateFilterTicketsComponent } from '../../modals/private-filter-tickets/private-filter-tickets.component';
import { AppRoles } from 'src/app/shared/core/models/app-roles';
import { PrivateAddEmergencyTicketsComponent } from '../../modals/private-add-emergency-tickets/private-add-emergency-tickets.component';

@Component({
  selector: 'app-private-tickets',
  templateUrl: './private-tickets.component.html',
  styleUrls: ['./private-tickets.component.scss']
})
export class PrivateTicketsComponent extends SharedUtilityComponent implements OnInit {

  fonts = { faTicket, faEllipsisV }

  tickets: AppTicket[] = [];
  appPagination = new AppPagination();
  filter = new TicketFilter();
  paginationRequest = new PaginationRequest<TicketFilter>(this.appPagination, this.filter);
  paginationResponse = new PaginationResponse<AppTicket[]>();

  roles = AppRoles;

  constructor(
    private ticketService: TicketService,
    private modalService: NgbModal,
  ) {
    super();
  }

  override ngOnInit(): void {
    this.filter.sentToDepartment = true;
    this.filter.appTicketStatus = 'ongoing';
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
    modalRef.componentInstance.filter = this.filter;

    const sub = modalRef.componentInstance.newFilter.subscribe({
      next: (filter: TicketFilter) => {
        this.filter = filter;
        this.paginationRequest = new PaginationRequest<TicketFilter>(this.appPagination, this.filter);
        this.getTickets();
      }
    });
    this.subscriptions.push(sub);
  }

  openCreateTicket(): void {
    const modalRef = this.modalService.open(PrivateAddEmergencyTicketsComponent, { size: 'lg' });
  }
}
