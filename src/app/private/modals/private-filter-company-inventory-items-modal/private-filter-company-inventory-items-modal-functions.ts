import { FormBuilder, FormGroup } from "@angular/forms";
import { InventoryItemFilter } from "src/app/shared/core/models/inventory";
import { CustomValidator } from "src/app/shared/validations/custom-validators";


export class FilterCompanyInventoryItemModalFunctions {

  public static createForm(fb: FormBuilder, filter?: InventoryItemFilter): FormGroup
  {
    return fb.group({
      appInventoryName: [filter?.appInventoryName],
      companyId: [filter?.companyId],
      amount: [filter?.amount, [CustomValidator.isNumber]],
    });
  }

}

