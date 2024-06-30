import { UserContract } from './../../../shared/core/models/app-user';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppUser } from 'src/app/shared/core/models/app-user';
import * as moment from 'moment';
import { faCircleCheck, faExclamationTriangle, faTimesCircle, faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PatientService } from 'src/app/shared/services/api/patient/patient.service';
import { SharedConfirmActionModalComponent, IConfirmAction } from 'src/app/shared/modals/shared-confirm-action-modal/shared-confirm-action-modal.component';
import { finalize } from 'rxjs';
import { ApplicationRoutes } from 'src/app/shared/core/routes/app-routes';
import { PrivatePatientChangeCompanyComponent } from '../../modals/private-patient-change-company/private-patient-change-company.component';
import { AppRoles } from 'src/app/shared/core/models/app-roles';
import { IAddUserContract, PrivateAddUserContractComponent } from '../../modals/private-add-user-contract/private-add-user-contract.component';

@Component({
  selector: 'app-private-patient-contract',
  templateUrl: './private-patient-contract.component.html',
  styleUrls: ['./private-patient-contract.component.scss']
})
export class PrivatePatientContractComponent extends SharedUtilityComponent implements OnInit {

  @Input() user?: AppUser;
  @Output() avaliable = new EventEmitter<boolean>();
  @Output() reload = new EventEmitter();

  startDate?: moment.Moment;
  endDate?: moment.Moment;
  daysRemaining = 0;

  companyName?: string;
  companyId?: string;

  hasContract = true;
  hasApproved = true;
  expired = false;
  loadingContract = false;

  iconStat = faCircleCheck;
  iconCss = 'text-success';

  fonts = { faCircleCheck, faExclamationTriangle, faTimesCircle, faArrowRightArrowLeft }

  routes = ApplicationRoutes.generateRoutes();

  roles = AppRoles;

  constructor(
    private patientService: PatientService,
    private modalService: NgbModal
    ) {
    super();
  }

  override ngOnInit(): void {
    this.setValues();
  }

  ngOnChanges(): void {
    setTimeout(() => {
      this.setValues();
    }, 1000);
  }

  setValues(): void {
    if (this.user?.patient?.company && !this.user?.patient?.company.forIndividual) {
      this.companyId = this.user.patient.company.userId;
      this.companyName = this.user.patient.company.name;
      this.setContract(this.user?.patient.company.companyContract);
    } else {
      this.setContract(this.user?.patient?.patientContract);
    }
  }

  setContract(contract?: UserContract): void {
    if (!contract) {
      this.hasContract = false;
      return;
     }

    if (!contract.appCost) {
      this.hasContract = false;
      return;
    }


    if (contract.appCost.paymentStatus != 'approved' && contract.appCost.paymentStatus != 'owing') {
      this.hasApproved = false;
      return;
    }

    this.startEndDate(contract.startDate, contract.duration);
  }

  private startEndDate(date?: string, duration?: number)
  {
    this.startDate = moment(date);
    this.endDate = moment(this.startDate).add(duration, 'days');
    this.setIcons();
  }

  private setIcons(): void {
    this.daysRemaining = this.endDate?.diff(this.startDate, 'days') ?? 0;

    if (this.daysRemaining <= 30 && this.daysRemaining > 0) {
      this.iconStat = faExclamationTriangle
      this.iconCss = 'text-warning'
      this.expired = false;
      this.avaliable.emit(true);
    }else if (this.daysRemaining <= 0) {
      this.expired = true;
    } else {
      this.expired = false;
      this.avaliable.emit(true);
    }
  }

  changeCompanyModal(): void {
    const modalRef = this.modalService.open(PrivatePatientChangeCompanyComponent, { size: 'lg' });
    modalRef.componentInstance.appUser = this.user;

    const sub = modalRef.componentInstance.reload.subscribe({
      next: () => {
        this.reload.emit();
      },
      error: (error: any) => {
        throw error;
      }
    });

    this.subscriptions.push(sub);
  }

  addContract(): void {
    const modalRef = this.modalService.open(PrivateAddUserContractComponent, { size: 'lg' });
    const component: PrivateAddUserContractComponent = modalRef.componentInstance;

    component.contractInfo = {
      patientId: this.user?.patient?.base?.id,
      fullName: this.user?.lastName + ' ' + this.user?.firstName,
    } as IAddUserContract;

    const sub = component.reload.subscribe({
      next: () => {
        this.reload.emit();
      }
    });

    this.subscriptions.push(sub);
  }
}
