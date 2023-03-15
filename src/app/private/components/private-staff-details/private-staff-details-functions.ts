import { FormBuilder, FormGroup } from "@angular/forms";
import { filter } from "rxjs";
import { AppUser } from "src/app/shared/core/models/app-user";
import { CustomValidator } from "src/app/shared/validations/custom-validators";

export class StaffDetailFunctions {
  public static createForm(fb: FormBuilder, appUser?: AppUser): FormGroup
  {
    return fb.group({
      level: [appUser?.staff?.level, [CustomValidator.CustomRequired('Level'), CustomValidator.MaxLength(200)]],
      salary: [appUser?.staff?.salary, [CustomValidator.CustomRequired('Salary'), CustomValidator.MaxLength(200)]],
      position: [appUser?.staff?.position, [CustomValidator.CustomRequired('Position'), CustomValidator.MaxLength(200)]],
      active: [appUser?.staff?.active, [CustomValidator.CustomRequired('Status')]],
      accountNumber: [appUser?.staff?.accountNumber, [CustomValidator.CustomRequired('accoutNumber'), CustomValidator.MaxLength(200)]],
      bankName: [appUser?.staff?.bankName, [CustomValidator.CustomRequired('bankName'), CustomValidator.MaxLength(200)]],
      bankId: [appUser?.staff?.bankId, [CustomValidator.CustomRequired('bankName'), CustomValidator.MaxLength(200)]],
      staffId: [appUser?.staff?.base?.id]
    });
  }
}
