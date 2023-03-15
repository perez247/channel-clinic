import { FormBuilder, FormGroup } from "@angular/forms";
import { InventoryItemFilter } from "src/app/shared/core/models/inventory";
import { CustomValidator } from "src/app/shared/validations/custom-validators";

export class FilterInventoryItemModalFunctions {

  public static createForm(fb: FormBuilder, filter?: InventoryItemFilter): FormGroup
  {
    return fb.group({
      companyName: [filter?.companyName],
      amount: [filter?.amount, [CustomValidator.isNumber]],
      appInventoryId: [filter?.appInventoryId],
    });
  }

}

