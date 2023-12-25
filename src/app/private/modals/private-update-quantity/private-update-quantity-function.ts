import { AppUser } from 'src/app/shared/core/models/app-user';
import { FormBuilder, FormGroup } from "@angular/forms";
import { filter } from "rxjs";
import { CustomValidator } from "src/app/shared/validations/custom-validators";
import { AppInventory } from 'src/app/shared/core/models/inventory';

export class PrivateUpdateQuantityFunction {
  public static createForm(fb: FormBuilder, inventory?: AppInventory): FormGroup
  {
    return fb.group({
      appInventoryId: [inventory?.base?.id],
      add: [null, [CustomValidator.CustomRequired('Action')]],
      amount: [null, [CustomValidator.CustomRequired('Amount')]],
      reason: [null, [CustomValidator.MaxLength(10000)]]
    });
  }
}
