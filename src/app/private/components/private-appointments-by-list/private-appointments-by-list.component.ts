import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { AppAppointment, AppointmentFilter } from 'src/app/shared/core/models/app-appointment';
import { AppPagination, PaginationRequest, PaginationResponse } from 'src/app/shared/core/models/pagination';
import { ApplicationRoutes } from 'src/app/shared/core/routes/app-routes';
import { AppointmentService } from 'src/app/shared/services/api/appointment/appointment.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-private-appointments-by-list',
  templateUrl: './private-appointments-by-list.component.html',
  styleUrls: ['./private-appointments-by-list.component.scss']
})
export class PrivateAppointmentsByListComponent extends SharedUtilityComponent implements OnInit, OnChanges {

  @Input() filter = new AppointmentFilter();

  appointmentDate?: Date = new Date();
  appointments: AppAppointment[] = [];
  appPagination = new AppPagination();
  paginationRequest = new PaginationRequest<AppointmentFilter>(this.appPagination, this.filter);
  paginationResponse = new PaginationResponse<AppAppointment[]>();

  routes = ApplicationRoutes.generateRoutes();

  constructor(
    private appointmentService: AppointmentService,
    ) {
    super();
  }

  override ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.paginationRequest = new PaginationRequest<AppointmentFilter>(this.appPagination, this.filter);
    this.getAppointmentByDate();
  }

  getAppointmentByDate(): void {
    this.isLoading = true;
    const sub = this.appointmentService.getAppointmentsByDate(this.paginationRequest)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.paginationResponse = data;
          this.appointments = data.result ?? [];
        },
        error: (error) => {
          console.log(error);
        }
      });
      this.subscriptions.push(sub);
  }

  pageChanged(e: number) {
    this.appPagination.pageNumber = e;
    this.paginationRequest = new PaginationRequest<AppointmentFilter>(this.appPagination, this.filter);
    this.getAppointmentByDate();
  }

}
