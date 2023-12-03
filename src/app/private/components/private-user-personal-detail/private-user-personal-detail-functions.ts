import { FormBuilder, FormGroup } from "@angular/forms";
import { filter } from "rxjs";
import { AppUser } from "src/app/shared/core/models/app-user";
import { CustomValidator } from "src/app/shared/validations/custom-validators";

export class UserPersonalDetailFunctions {
  public static createForm(fb: FormBuilder, appUser?: AppUser): FormGroup
  {
    return fb.group({
      firstName: [appUser?.firstName, [CustomValidator.CustomRequired('First Name'), CustomValidator.MaxLength(200)]],
      lastName: [appUser?.lastName, [CustomValidator.CustomRequired('Last Name'), CustomValidator.MaxLength(200)]],
      phone: [appUser?.phone, [CustomValidator.CustomRequired('Phone'), CustomValidator.CustomPattern('^[0-9+]*$', 'Phone is invalid')]],
      otherName: [appUser?.otherName, [CustomValidator.MaxLength(200)]],
      address: [appUser?.address, [CustomValidator.MaxLength(2000)]],
      profile: [appUser?.profile],
      companyUniqueId: [appUser?.patient?.companyUniqueId, [CustomValidator.MaxLength(255)]],
      otherInformation: [appUser?.patient?.otherInformation, [CustomValidator.MaxLength(2000)]],
      email: {value: appUser?.email, disabled: true},
      userId: [appUser?.base?.id]
    });
  }
}
