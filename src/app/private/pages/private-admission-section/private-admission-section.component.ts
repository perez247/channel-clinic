import { AdmissionService } from './../../../shared/services/api/admission/admission.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faArrowLeft, faFlask, faPills, faSyringe, faXRay, faChevronCircleDown, faUserNurse } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { AdmissionStats } from 'src/app/shared/core/models/app-admission-stats';
import { ApplicationRoutes } from 'src/app/shared/core/routes/app-routes';
import { PrivateCreateTicketModalComponent } from '../../modals/private-create-ticket-modal/private-create-ticket-modal.component';

@Component({
  selector: 'app-private-admission-section',
  templateUrl: './private-admission-section.component.html',
  styleUrls: ['./private-admission-section.component.scss']
})
export class PrivateAdmissionSectionComponent extends SharedUtilityComponent implements OnInit {

  constructor(
    private admissionService: AdmissionService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
  ) {
    super();
  }

  fonts: any = {
    pharmacy: { name: faPills, css: 'bg-primary' },
    lab: { name: faFlask, css: 'bg-success' },
    radiology: { name: faXRay, css: 'bg-danger' },
    surgery: { name: faSyringe, css: 'bg-warning' },
    nurse: { name: faUserNurse, css: 'bg-black' },
    dropdown: { name: faChevronCircleDown, css: 'text-primary' },
  };

  backIcon = faArrowLeft;

  ticketId?: string;
  admissionRoom? = '';
  sectionName = '';
  dashboard: AdmissionStats = {} as AdmissionStats;

  routes = ApplicationRoutes.generateRoutes();

  override ngOnInit(): void {
    this.listenForRoute();
  }

  listenForRoute(): void {
    const sub = this.route.paramMap.subscribe({
      next: (d) => {
        this.ticketId = d.get('id') ?? '';
        this.sectionName = d.get('sectionName') ?? '';
        this.getStats();
      }
    });

    this.subscriptions.push(sub);
  }

  getStats(): void {
    this.isLoading = true;
    const sub = this.admissionService.getStats(this.ticketId || '')
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.dashboard = data;
          this.admissionRoom = this.dashboard.ticketInventories[0].inventory.name;
        },
        error: (error) => {
          throw error;
        }
      });
  }

}
