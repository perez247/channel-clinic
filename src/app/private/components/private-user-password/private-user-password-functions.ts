import { FormBuilder, FormGroup } from "@angular/forms";
import { CustomValidator } from "src/app/shared/validations/custom-validators";

export class PrivateUserPasswordFunctions {
  public static createForm(fb: FormBuilder): FormGroup
  {
    return fb.group({
      oldPassword: [null, [CustomValidator.CustomRequired('Current Password'), CustomValidator.MinLength(6), CustomValidator.MaxLength(50)]],
      newPassword: [null, [CustomValidator.CustomRequired('New Password'), CustomValidator.MinLength(6), CustomValidator.MaxLength(200)]],
      confirmNewPassword: [null, [CustomValidator.MustEqual('newPassword', 'New Password')]],
    });
  }
}
