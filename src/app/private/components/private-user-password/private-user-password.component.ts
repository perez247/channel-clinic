import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PrivateUserPasswordFunctions } from './private-user-password-functions';
import { AppConstants } from 'src/app/shared/core/models/app-constants';
import { AppRoles } from 'src/app/shared/core/models/app-roles';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { AuthService } from 'src/app/shared/services/api/auth/auth.service';
import { finalize } from 'rxjs';
import { CustomToastService } from 'src/app/shared/services/common/custom-toast/custom-toast.service';
import { CustomErrorService } from 'src/app/shared/services/common/custom-error/custom-error.service';
import { AppUser } from 'src/app/shared/core/models/app-user';
import { Confirmable } from 'src/app/shared/decorators/confirm-action-method-decorator';

@Component({
  selector: 'app-private-user-password',
  templateUrl: './private-user-password.component.html',
  styleUrls: ['./private-user-password.component.scss']
})
export class PrivateUserPasswordComponent extends SharedUtilityComponent implements OnInit {

  @Input() user?: AppUser;

  form: FormGroup = {} as FormGroup;
  disableForm = true;

  userSections = AppConstants.UserSections;

  roles = AppRoles;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toast: CustomToastService,
    public errorService: CustomErrorService,
  ) {
    super();
  }

  override ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = PrivateUserPasswordFunctions.createForm(this.fb);
  }

  edit(): void {
    this.disableForm = false;
  }

  cancelEdit(): void {
    this.form.reset();
    this.initializeForm();
  }

  changePassword(): void 
  {
    this.isLoading = true;
    const sub = this.authService.changePassword(this.form.value)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: () => {
          this.toast.success('Password changed successfully');
          this.form.reset();
        },
        error: (error) => {
          throw error;
        }
      });

    this.subscriptions.push(sub);
  }

  @Confirmable({
    title: 'Reset Password',
    html: 'Are you sure you want to reset this user\'s password?',
    confirmButtonText: 'Yes, reset',
    denyButtonText: 'No I changed my mind',
  })
  resetPassword(): void {
    this.isLoading = true;
    const sub = this.authService.resetPassword({userId: this.user?.base?.id})
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.toast.sweetAlertSuccess({ title: 'New Password', text: data.newPassword, icon: 'success', confirmButtonText: 'Close' });
          this.toast.success('Password reset successfully');
          this.form.reset();
        },
        error: (error) => {
          throw error;
        }
      });

    this.subscriptions.push(sub);
  }


}
