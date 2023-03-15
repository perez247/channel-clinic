import { Component, OnInit, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { finalize } from "rxjs";
import { SharedUtilityComponent } from "src/app/shared/components/shared-utility/shared-utility.component";
import { AppAppointment, AppointmentFilter } from "src/app/shared/core/models/app-appointment";
import { AppPagination, PaginationRequest, PaginationResponse } from "src/app/shared/core/models/pagination";
import { ApplicationRoutes } from "src/app/shared/core/routes/app-routes";
import { AppointmentService } from "src/app/shared/services/api/appointment/appointment.service";

@Component({
  selector: 'app-private-view-appointments-by-date-modal',
  templateUrl: './private-view-appointments-by-date-modal.component.html',
  styleUrls: ['./private-view-appointments-by-date-modal.component.scss']
})
export class PrivateViewAppointmentsByDateModalComponent extends SharedUtilityComponent implements OnInit {

  @Input() appointmentDate?: Date;
  @Input() pageSize: number = 10;

  appointments: AppAppointment[] = [];
  appPagination = new AppPagination();
  filter = new AppointmentFilter();
  paginationRequest = new PaginationRequest<AppointmentFilter>(this.appPagination, this.filter);
  paginationResponse = new PaginationResponse<AppAppointment[]>();

  routes = ApplicationRoutes.generateRoutes();

  constructor(
    public activeModal: NgbActiveModal,
    private appointmentService: AppointmentService
    ) {
    super();
  }

  override ngOnInit(): void {
    this.filter.exactDate = `${this.appointmentDate?.getFullYear()}-${(this.appointmentDate?.getMonth() ?? 0) + 1}-${this.appointmentDate?.getDate()}`;
    this.appPagination.pageSize = this.pageSize;
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
  }

  closeModal(): void {
    this.activeModal.close();
  }

}
