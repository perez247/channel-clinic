import { AdmissionService } from './../../../shared/services/api/admission/admission.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPills } from '@fortawesome/free-solid-svg-icons';
import { finalize } from 'rxjs';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { AdmissionStats } from 'src/app/shared/core/models/app-admission-stats';

@Component({
  selector: 'app-private-admission-section',
  templateUrl: './private-admission-section.component.html',
  styleUrls: ['./private-admission-section.component.scss']
})
export class PrivateAdmissionSectionComponent extends SharedUtilityComponent implements OnInit {

  constructor(
    private admissionService: AdmissionService,
    private route: ActivatedRoute
  ) {
    super();
  }

  fonts = { faPills }
  ticketId: string | null = '';
  admissionRoom? = '';
  sectionName: string | null = '';
  dashboard: AdmissionStats = {} as AdmissionStats;

  override ngOnInit(): void {
    this.listenForRoute();
  }

  listenForRoute(): void {
    const sub = this.route.paramMap.subscribe({
      next: (d) => {
        this.ticketId = d.get('id');
        this.sectionName = d.get('sectionName');
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
          console.log(this.dashboard);
        },
        error: (error) => {
          throw error;
        }
      });
  }

}
