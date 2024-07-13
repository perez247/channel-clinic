import { FormBuilder, FormGroup } from "@angular/forms";
import { filter } from "rxjs";
import { AppUser, NextOfKin } from "src/app/shared/core/models/app-user";
import { CustomValidator } from "src/app/shared/validations/custom-validators";

export class NextOfKinFunctions {
  public static createForm(fb: FormBuilder, appUser?: NextOfKin, userId?: string): FormGroup
  {
    return fb.group({
      firstName: [appUser?.firstName, [CustomValidator.CustomRequired('First Name'), CustomValidator.MaxLength(200)]],
      lastName: [appUser?.lastName, [CustomValidator.CustomRequired('Last Name'), CustomValidator.MaxLength(200)]],
      phone1: [appUser?.phone1, [CustomValidator.CustomRequired('Phone 1'), CustomValidator.CustomPattern('^[0-9+]*$', 'Phone is invalid')]],
      phone2: [appUser?.phone2, [CustomValidator.CustomPattern('^[0-9+]*$', 'Phone is invalid')]],
      otherName: [appUser?.otherName, [CustomValidator.MaxLength(200)]],
      address: [appUser?.address, [CustomValidator.CustomRequired('Address'), CustomValidator.MaxLength(2000)]],
      profile: [appUser?.profile],
      email: [appUser?.email, [CustomValidator.CustomEmail()]],
      userId: [userId]
    });
  }
}
