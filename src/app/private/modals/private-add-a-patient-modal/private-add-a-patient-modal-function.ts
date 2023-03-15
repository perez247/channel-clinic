import { FormBuilder, FormGroup } from "@angular/forms";
import { filter } from "rxjs";
import { CustomValidator } from "src/app/shared/validations/custom-validators";

export class AddAPatientModalFunctions {
  public static createForm(fb: FormBuilder): FormGroup
  {
    return fb.group({
      email: [null, [CustomValidator.CustomRequired('Email'), CustomValidator.CustomEmail(), CustomValidator.MaxLength(200)]],
      firstName: [null, [CustomValidator.CustomRequired('First Name'), CustomValidator.MaxLength(200)]],
      lastName: [null, [CustomValidator.CustomRequired('Last Name'), CustomValidator.MaxLength(200)]],
      otherName: [null, [CustomValidator.MaxLength(200)]],
      address: [null, [CustomValidator.CustomRequired('Address'), CustomValidator.MaxLength(2000)]],
      staffId: [null],
    });
  }
}
