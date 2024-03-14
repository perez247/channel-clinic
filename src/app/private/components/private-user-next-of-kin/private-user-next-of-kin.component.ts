import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { AppConstants } from 'src/app/shared/core/models/app-constants';
import { AppRoles } from 'src/app/shared/core/models/app-roles';
import { AppUser, NextOfKin } from 'src/app/shared/core/models/app-user';
import { UserService } from 'src/app/shared/services/api/user/user.service';
import { CustomErrorService } from 'src/app/shared/services/common/custom-error/custom-error.service';
import { PrivateUploadProfilePictureModalComponent } from '../../modals/private-upload-profile-picture-modal/private-upload-profile-picture-modal.component';
import { NextOfKinFunctions } from './private-next-of-kin-functions';

@Component({
  selector: 'app-private-user-next-of-kin',
  templateUrl: './private-user-next-of-kin.component.html',
  styleUrls: ['./private-user-next-of-kin.component.scss']
})
export class PrivateUserNextOfKinComponent extends SharedUtilityComponent implements OnInit {

  @Output() reload = new EventEmitter<string>();

  @Input() user?: AppUser;
  nextOfKin?: NextOfKin;

  fonts = { faPencilAlt, faTrash }

  profile? = '';

  form: FormGroup = {} as any;
  disableForm = true;

  userSections = AppConstants.UserSections;

  roles = AppRoles;
  editRoles: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
    public errorService: CustomErrorService,
    private modalService: NgbModal,
    private router: Router
  ) {
    super();
  }

  override ngOnInit(): void {
    this.getEditRoles();
    this.nextOfKin = this.user?.nextOfKin;
    this.profile = this.nextOfKin?.profile;
    this.initializeForm();
  }

  ngAfterContentChecked() {}

  initializeForm(): void {
    this.form = NextOfKinFunctions.createForm(this.fb, this.user?.nextOfKin);
    this.disableForm = true;
  }

  getEditRoles() {
    const url: string = this.router.url;
    if (url.includes('/private/patients/'))
    {
      this.editRoles = [ this.roles.admin, this.roles.nurse, this.roles.hr, this.roles.reception ]
    } else {
      this.editRoles = [ this.roles.admin, this.roles.hr ]
    }
  }

  edit(): void {
    this.disableForm = false;
  }

  cancelEdit(): void {
    this.form.reset();
    this.initializeForm();
    this.user!.profile = this.profile;
  }

  openUploadProfileModal(): void {
    const modalRef = this.modalService.open(PrivateUploadProfilePictureModalComponent, { size: 'lg'});

    const sub = modalRef.componentInstance.newImage.subscribe({
      next: (base64: string) => {
        this.updateProfilePicture(base64);
      }
    });

    this.subscriptions.push(sub);
  }

  updateProfilePicture(base64: string) {
    console.log(base64);
    this.nextOfKin!.profile = base64;
    this.form.patchValue({
      profile: this.nextOfKin!.profile
    });
  }

  beginUpdate(): void {
    this.isLoading = true;
    const sub = this.userService.editNextOfKin(this.form.value)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.reload.emit(this.userSections.nextOfKin);
        },
        error: (error) => {
          this.errorService.setFormErrors(error, this.form)
          // console.log(error);
        }
      });
    this.subscriptions.push(sub);
  }
}
