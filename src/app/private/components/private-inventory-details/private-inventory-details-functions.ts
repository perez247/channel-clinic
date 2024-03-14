import { FormBuilder, FormGroup } from "@angular/forms";
import { AppInventory } from "src/app/shared/core/models/inventory";
import { CustomValidator } from "src/app/shared/validations/custom-validators";

export class PrivateInventoryDetailsFunctions {
  public static createForm(fb: FormBuilder, inventory?: AppInventory): FormGroup
  {
    return fb.group({
      name: [inventory?.name, [CustomValidator.CustomRequired('Name'), CustomValidator.MaxLength(250)]],
      quantity: [{value: inventory?.quantity, disabled: true}, [CustomValidator.CustomRequired('Last Name')]],
      appInventoryType: [inventory?.appInventoryType, [CustomValidator.CustomRequired('Type')]],
      notifyWhenLow: [inventory?.notifyWhenLow],
      howLow: [inventory?.howLow],
      profile: [inventory?.profile],
      appInventoryId: [inventory?.base?.id]
    });
  }
}
