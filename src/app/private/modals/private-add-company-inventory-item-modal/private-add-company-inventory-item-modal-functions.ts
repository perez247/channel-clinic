import { FormBuilder, FormGroup } from "@angular/forms";
import { AppUser } from "src/app/shared/core/models/app-user";
import { CustomValidator } from "src/app/shared/validations/custom-validators";

export class AddCompanyInventoryItemModalFunctions {
  public static createForm(fb: FormBuilder, company?: AppUser): FormGroup
  {
    return fb.group({
      inventoryId: [null, [CustomValidator.CustomRequired('Inventory')]],
      inventoryName: [null],
      companyId: [company?.company?.base?.id],
      companyAmount: [null, [CustomValidator.CustomRequired('Amount'), CustomValidator.isNumber]],
    });
  }
}


