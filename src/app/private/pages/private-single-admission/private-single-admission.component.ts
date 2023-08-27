import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/shared/services/api/ticket/ticket.service';
import { faPills, faFlask, faXRay, faSyringe } from '@fortawesome/free-solid-svg-icons';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { AdmissionService } from 'src/app/shared/services/api/admission/admission.service';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { AdmissionStats } from 'src/app/shared/core/models/app-admission-stats';
import { AppConstants } from 'src/app/shared/core/models/app-constants';
import * as moment from 'moment';
import { ApplicationRoutes } from 'src/app/shared/core/routes/app-routes';

@Component({
  selector: 'app-private-single-admission',
  templateUrl: './private-single-admission.component.html',
  styleUrls: ['./private-single-admission.component.scss']
})
export class PrivateSingleAdmissionComponent extends SharedUtilityComponent implements OnInit {

  constructor(
    private admissionService: AdmissionService,
    private route: ActivatedRoute
  ) {
    super()
   }

  fonts = { faPills, faFlask, faXRay, faSyringe }
  ticketId: string | null = '';
  dashboard: AdmissionStats = {} as AdmissionStats;

  userSections = AppConstants.UserSections;
  currentSection = '';

  currentDate = new Date().toUTCString();
  admissionRoom? = '';
  duration: number = 0;

  routes = ApplicationRoutes.generateRoutes();

  override ngOnInit(): void {
    this.listenForRoute();
  }

  listenForRoute(): void {
    const sub = this.route.paramMap.subscribe({
      next: (d) => {
        this.ticketId = d.get('id');
        this.getStats('');
      }
    });

    this.subscriptions.push(sub);
  }

  getStats(section: string): void {
    this.currentSection = section;
    this.isLoading = true;
    const sub = this.admissionService.getStats(this.ticketId || '')
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.dashboard = data;
          this.admissionRoom = this.dashboard.ticketInventories[0].inventory.name;
          this.setDuration();
        },
        error: (error) => {
          throw error;
        }
      });
  }

  setDuration(): void {
    const endDate = this.dashboard.ticketInventories[0].admissionEndDate ? this.dashboard.ticketInventories[0].admissionEndDate : this.currentDate
    const endDateMoment = moment(endDate);

    const startDate = moment(this.dashboard.ticketInventories[0].admissionStartDate)

    this.duration = endDateMoment.diff(startDate, 'days');
  }
}
