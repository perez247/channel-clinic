import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faCalendar, faFilter } from '@fortawesome/free-solid-svg-icons';
import { finalize } from 'rxjs';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { AppAppointment } from 'src/app/shared/core/models/app-appointment';
import { AppConstants } from 'src/app/shared/core/models/app-constants';
import { AppTicket, AppTicketTypes, TicketFilter } from 'src/app/shared/core/models/app-ticket';
import { AppPagination, PaginationContext, PaginationRequest, PaginationResponse } from 'src/app/shared/core/models/pagination';
import { TicketService } from 'src/app/shared/services/api/ticket/ticket.service';
import { CustomToastService } from 'src/app/shared/services/common/custom-toast/custom-toast.service';

@Component({
  selector: 'app-private-appointment-tickets',
  templateUrl: './private-appointment-tickets.component.html',
  styleUrls: ['./private-appointment-tickets.component.scss']
})
export class PrivateAppointmentTicketsComponent extends SharedUtilityComponent implements OnInit {

  userSections = AppConstants.UserSections;
  ticketTypes = Object.keys(AppTicketTypes);

  @Input() appointment?: AppAppointment;
  @Output() reload = new EventEmitter<string>();
  @Input() isTodayAppointment? = true;

  fonts = { faCalendar, faFilter };

  pagination = new PaginationContext<AppTicket, TicketFilter>();

  constructor(
    private ticketService: TicketService,
  ) {
    super()
   }

  override ngOnInit(): void {
    this.pagination.request?.setFilter({ appointmentId: this.appointment?.base?.id, full: true });
    this.getTickets();
  }

  getTickets(): void {
    this.isLoading = true;
    const sub = this.ticketService.getTickets(this.pagination.request)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.pagination.setResponse(data, false);
        },
        error: (error) => {
          console.log(error);
          throw new error;
        }
      });

    this.subscriptions.push(sub);
  }

  ticketTrackBy(index: any, ticket: AppTicket) {
    return ticket.base.id;
   }

   addFilter(type: string): void {

    if (type == 'all') {
      this.pagination.request?.setFilter({ appInventoryType: "" });
    } else {
      this.pagination.request?.setFilter({ appInventoryType: type as any });
    }

      this.getTickets();
   }

   pageChanged(e: number) {
    this.pagination.request?.setPagination({ pageNumber: e } as AppPagination);
    this.getTickets();
  }
}
