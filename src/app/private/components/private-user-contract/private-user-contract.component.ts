import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { AppUser } from 'src/app/shared/core/models/app-user';
import * as moment from 'moment';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCircleCheck, faExclamationTriangle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { finalize, Observable } from 'rxjs';
import { IConfirmAction, SharedConfirmActionModalComponent } from 'src/app/shared/modals/shared-confirm-action-modal/shared-confirm-action-modal.component';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PatientService } from 'src/app/shared/services/api/patient/patient.service';
import { CompanyService } from 'src/app/shared/services/api/company/company.service';
import { ApplicationRoutes } from 'src/app/shared/core/routes/app-routes';

@Component({
  selector: 'app-private-user-contract',
  templateUrl: './private-user-contract.component.html',
  styleUrls: ['./private-user-contract.component.scss']
})
export class PrivateUserContractComponent extends SharedUtilityComponent implements OnInit, OnChanges {

  @Input() user?: AppUser;
  @Output() avaliable = new EventEmitter<boolean>();
  @Output() reload = new EventEmitter();

  startDate?: moment.Moment;
  endDate?: moment.Moment;
  daysRemaining = 0;

  companyName?: string;
  companyId?: string;

  iconStat = faCircleCheck;
  iconCss = 'text-success';

  hasContract = false;
  loadingContract = false;

  call?: Observable<any>;

  routes = ApplicationRoutes.generateRoutes();

  constructor(
    private patientService: PatientService,
    private companyService: CompanyService,
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
    console.log(this.user);
    if (this.user?.patient)
    {
      if (this.user.patient.company) {
        this.companyId = this.user.patient.company.userId;
        this.companyName = this.user.patient.company.name;
        this.startEndDate(this.user.patient?.company?.companyContract?.startDate, this.user.patient?.company?.companyContract?.duration);
      } else if (this.user.patient.patientContract) {
        this.startEndDate(this.user.patient.patientContract.startDate, this.user.patient.patientContract.duration);
      }
      else {
        this.setContract(false);
      }
    }

    if (this.user?.company)
    {
      if (this.user.company.companyContract) {
        this.startEndDate(this.user.company.companyContract.startDate, this.user.company.companyContract.duration);
      }
      else {
        this.setContract(false);
      }
    }
  }

  confirmAddContract(): void {
    const modalRef = this.modalService.open(SharedConfirmActionModalComponent);
    const confirmData = {
      title: `Add a new contract`,
      body: `Are you sure you want to add a new contract for this patient`,
      positiveBtn: `Yes, Add`,
      positiveBtnCss: `btn btn-primary`,
      nagativeBtn: `No, Cancel`,
      negativeBtnCss: `btn btn-danger`
    } as IConfirmAction;

    modalRef.componentInstance.confirmData = confirmData;
    const sub = modalRef.componentInstance.actionTaken.subscribe({
      next: (takeAction: boolean) => {
        if(takeAction) {
          this.addNewContract();
        }
      }
    });
    this.subscriptions.push(sub)
  }

  private addNewContract(): void {
    this.loadingContract = true;
    this.setCall();
    const sub = this.call!
      .pipe(finalize(() => this.loadingContract = false))
      .subscribe({
        next: (result) => {
          this.reload.emit();
        }
      });

    this.subscriptions.push(sub);
  }

  private setCall(): void {

    if(this.user?.patient) {
      const data = { patientId: this.user?.patient?.base?.id, durationInDays: 180 }
      this.call = this.patientService.addContract(data);
    }

    if (this.user?.company) {
      const data = { companyId: this.user?.company?.base?.id, durationInDays: 180 }
      this.call = this.companyService.addCompanyContract(data);
    }

  }

  private setIcons(): void {
    this.daysRemaining = this.endDate?.diff(this.startDate, 'days') ?? 0;
    // this.daysRemaining = -1;

    if (this.daysRemaining <= 30 && this.daysRemaining > 0) {
      this.iconStat = faExclamationTriangle
      this.iconCss = 'text-warning'
      this.setContract(true);
    }else if (this.daysRemaining <= 0) {
      this.setContract(false);
    } else {
      this.setContract(true);
    }
  }

  private setContract(state: boolean) {
    if (!state) {
      this.iconStat = faTimesCircle;
      this.iconCss = 'text-danger';
    }

    this.hasContract = state;
    this.avaliable.emit(state);
  }

  private startEndDate(date?: string, duration?: number)
  {
    this.startDate = moment(date);
    this.endDate = moment(this.startDate).add(duration, 'days');
    this.setIcons();
  }
}
