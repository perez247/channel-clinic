import { FormBuilder, FormGroup } from "@angular/forms";
import { InventoryFilter } from "src/app/shared/core/models/inventory";
import { CustomValidator } from "src/app/shared/validations/custom-validators";

export class FilterInventoryModalFunctions {

  public static createForm(fb: FormBuilder, filter?: InventoryFilter): FormGroup
  {
    return fb.group({
      name: [filter?.name, [CustomValidator.CustomPattern('^[a-zA-Z0-9._ ]*$', 'Only letters, numbers, periods and underscore'), CustomValidator.MaxLength(250)]],
      appInventoryType: [filter?.appInventoryType],
      low: [filter?.low],
      quantity: [filter?.quantity, [CustomValidator.isNumber]],
    });
  }

}
