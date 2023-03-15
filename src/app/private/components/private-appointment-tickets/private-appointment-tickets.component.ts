import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { finalize } from 'rxjs';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { AppAppointment } from 'src/app/shared/core/models/app-appointment';
import { AppConstants } from 'src/app/shared/core/models/app-constants';
import { AppTicket, AppTicketTypes, TicketFilter } from 'src/app/shared/core/models/app-ticket';
import { AppPagination, PaginationRequest, PaginationResponse } from 'src/app/shared/core/models/pagination';
import { TicketService } from 'src/app/shared/services/api/ticket/ticket.service';
import { CustomToastService } from 'src/app/shared/services/common/custom-toast/custom-toast.service';

@Component({
  selector: 'app-private-appointment-tickets',
  templateUrl: './private-appointment-tickets.component.html',
  styleUrls: ['./private-appointment-tickets.component.scss']
})
export class PrivateAppointmentTicketsComponent extends SharedUtilityComponent implements OnInit {

  userSections = AppConstants.UserSections;

  @Input() appointment?: AppAppointment;
  @Input() currentSection = this.userSections.vitals;
  @Output() reload = new EventEmitter<string>();

  fonts = { faCalendar };

  pharmacies?: AppTicket[] = [];
  surgeries?: AppTicket[] = [];
  labs?: AppTicket[] = [];
  radiologies?: AppTicket[] = [];
  admissions?: AppTicket[] = [];

  appPagination = new AppPagination();
  filter = new TicketFilter();
  paginationRequest = new PaginationRequest<TicketFilter>(this.appPagination, this.filter);

  mouseOvered = false;

  constructor(
    private ticketService: TicketService,
    private router: Router,
    private toast: CustomToastService,
  ) {
    super()
   }

  override ngOnInit(): void {
    this.filter.appointmentId = this.appointment?.base?.id;
    this.appPagination.pageSize = 50;
    this.paginationRequest = new PaginationRequest<TicketFilter>(this.appPagination, this.filter);
    this.getTickets(this.currentSection);
  }

  getTickets(section: string): void {
    this.currentSection = section;
    this.isLoading = true;
    const sub = this.ticketService.getTickets(this.paginationRequest)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.pharmacies = data.result?.filter(x => x.appInventoryType === AppTicketTypes.pharmacy);
          this.surgeries = data.result?.filter(x => x.appInventoryType === AppTicketTypes.surgery);
          this.labs = data.result?.filter(x => x.appInventoryType === AppTicketTypes.lab);
          this.radiologies = data.result?.filter(x => x.appInventoryType === AppTicketTypes.radiology);
          this.admissions = data.result?.filter(x => x.appInventoryType === AppTicketTypes.admission);
        },
        error: (error) => {
          console.log(error);
        }
      });

    this.subscriptions.push(sub);
  }

  ticketTrackBy(index: any, ticket: AppTicket) {
    return ticket.base.id;
   }

}
