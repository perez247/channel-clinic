import { FormBuilder, FormGroup } from "@angular/forms";
import { CustomValidator } from "src/app/shared/validations/custom-validators";


export class AddUserContractFunctions {
  public static createForm(fb: FormBuilder): FormGroup
  {
    return fb.group({
        durationInDays: [null, [CustomValidator.CustomRequired('Amount')]],
        amount: [null, [CustomValidator.CustomRequired('Duration')]]
    });
  }
}

