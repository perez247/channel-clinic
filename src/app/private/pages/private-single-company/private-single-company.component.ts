import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faBuilding, faEllipsisV, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { finalize } from 'rxjs';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { AppConstants } from 'src/app/shared/core/models/app-constants';
import { AppUser, UserFilter } from 'src/app/shared/core/models/app-user';
import { AppPagination, PaginationRequest, PaginationResponse } from 'src/app/shared/core/models/pagination';
import { ApplicationRoutes } from 'src/app/shared/core/routes/app-routes';
import { UserService } from 'src/app/shared/services/api/user/user.service';
import { CustomToastService } from 'src/app/shared/services/common/custom-toast/custom-toast.service';

@Component({
  selector: 'app-private-single-company',
  templateUrl: './private-single-company.component.html',
  styleUrls: ['./private-single-company.component.scss']
})
export class PrivateSingleCompanyComponent  extends SharedUtilityComponent  implements OnInit {

  fonts = { faBuilding, faEllipsisV, faChevronDown }
  userSections = AppConstants.UserSections;
  currentSection = this.userSections.companyDetails;

  companies: AppUser[] = [];
  company?: AppUser;
  appPagination = new AppPagination();
  filter = new UserFilter('company');
  paginationRequest = new PaginationRequest<UserFilter>(this.appPagination, this.filter);
  paginationResponse = new PaginationResponse<AppUser[]>();

  disableTabs = true;
  routes = ApplicationRoutes.generateRoutes();

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private toast: CustomToastService,
  ) {
    super();
  }

  override ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.filter.userId = id;
    this.paginationRequest = new PaginationRequest<UserFilter>(this.appPagination, this.filter);
    this.getCompany(this.currentSection);
  }

  getCompany(currentSection: string): void {
    this.currentSection = currentSection;
    this.isLoading = true;
    const sub = this.userService.getUsers(this.paginationRequest)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {

          if (data.totalItems <= 0) {
            this.toast.error('Company not found');
            this.router.navigate([this.routes.privateRoute.companies().$absolutePath]);
            return;
          }

          this.paginationResponse = data;
          this.companies = data.result ?? [];
          this.company = this.companies[0];
        },
        error: (data) => {
          console.log(data);
        }
      });

      this.subscriptions.push(sub);
  }

}
