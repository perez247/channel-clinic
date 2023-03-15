import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { finalize } from "rxjs";
import { SharedUtilityComponent } from "src/app/shared/components/shared-utility/shared-utility.component";
import { ApplicationRoutes } from "src/app/shared/core/routes/app-routes";
import { CompanyService } from "src/app/shared/services/api/company/company.service";
import { CustomErrorService } from "src/app/shared/services/common/custom-error/custom-error.service";
import { CustomToastService } from "src/app/shared/services/common/custom-toast/custom-toast.service";
import { AddCompanyModalFunctions } from "./private-add-company-modal-functions";


@Component({
  selector: 'app-private-add-company-modal',
  templateUrl: './private-add-company-modal.component.html',
  styleUrls: ['./private-add-company-modal.component.scss']
})
export class PrivateAddCompanyModalComponent extends SharedUtilityComponent implements OnInit {

  form: FormGroup = {} as any;
  routes = ApplicationRoutes.generateRoutes();

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    public errorService: CustomErrorService,
    private router: Router,
    private toast: CustomToastService,
    private companyService: CompanyService,
    ) {
    super();
  }

  override ngOnInit(): void {
    this.form = AddCompanyModalFunctions.createForm(this.fb);
  }

  createNewCompany(): void {
    this.isLoading = true;
    const sub = this.companyService.createCompany(this.form.value)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.toast.success('Company created successfully');
          this.router.navigate([`${this.routes.privateRoute.single_company(data.companyId).$absolutePath}`]);
          this.activeModal.close();
        },
        error: (error) => {
          this.errorService.setFormErrors(error, this.form);
        }
      });

      this.subscriptions.push(sub);
  }

}
