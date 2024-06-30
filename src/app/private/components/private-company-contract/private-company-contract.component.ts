import { CompanyService } from './../../../shared/services/api/company/company.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCircleCheck, faExclamationTriangle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { AppUser, UserContract } from 'src/app/shared/core/models/app-user';
import { ApplicationRoutes } from 'src/app/shared/core/routes/app-routes';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IConfirmAction, SharedConfirmActionModalComponent } from 'src/app/shared/modals/shared-confirm-action-modal/shared-confirm-action-modal.component';
import { finalize } from 'rxjs';
import * as moment from 'moment';
import { AppRoles } from 'src/app/shared/core/models/app-roles';
import { IAddUserContract, PrivateAddUserContractComponent } from '../../modals/private-add-user-contract/private-add-user-contract.component';

@Component({
  selector: 'app-private-company-contract',
  templateUrl: './private-company-contract.component.html',
  styleUrls: ['./private-company-contract.component.scss']
})
export class PrivateCompanyContractComponent extends SharedUtilityComponent implements OnInit {

  @Input() user?: AppUser;
  @Output() avaliable = new EventEmitter<boolean>();
  @Output() reload = new EventEmitter();

  startDate?: moment.Moment;
  endDate?: moment.Moment;
  daysRemaining = 0;

  companyName?: string;
  companyId?: string;

  forIndividual = false;
  homeCompany = false;
  hasContract = true;
  hasApproved = true;
  expired = false;
  loadingContract = false;

  iconStat = faCircleCheck;
  iconCss = 'text-success';

  fonts = { faCircleCheck, faExclamationTriangle, faTimesCircle }

  routes = ApplicationRoutes.generateRoutes();

  roles = AppRoles;

  constructor(
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

    if (this.user?.company?.forIndividual) {
      this.homeCompany = true;
      this.forIndividual = true;

      this.avaliable.emit(true);
      return;
    }

    // if (this.user?.company?.homeCompany) {
    //   this.homeCompany = true;
    //   this.forIndividual = true;

    //   this.avaliable.emit(true);
    //   return;
    // }

    this.setContract(this.user?.company?.companyContract);
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

  addContract(): void {
    const modalRef = this.modalService.open(PrivateAddUserContractComponent, { size: 'lg' });
    const component: PrivateAddUserContractComponent = modalRef.componentInstance;

    component.contractInfo = {
      companyId: this.user?.company?.base?.id,
      fullName: this.user?.firstName,
    } as IAddUserContract;

    const sub = component.reload.subscribe({
      next: () => {
        this.reload.emit();
      }
    });

    this.subscriptions.push(sub);
  }


}
