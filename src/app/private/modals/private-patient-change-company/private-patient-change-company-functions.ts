import { AppUser } from 'src/app/shared/core/models/app-user';
import { FormBuilder, FormGroup } from "@angular/forms";
import { filter } from "rxjs";
import { CustomValidator } from "src/app/shared/validations/custom-validators";

export class PrivatePatientChangeCompanyModalFunctions {
  public static createForm(fb: FormBuilder, user?: AppUser): FormGroup
  {
    return fb.group({
      userId: [user?.base?.id],
      companyId: [null, [CustomValidator.CustomRequired('Company')]],
      companyName: [null]
    });
  }
}
