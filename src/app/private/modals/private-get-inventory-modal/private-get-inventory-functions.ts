import { ITicketInventory, TicketInventory } from './../../../shared/core/models/app-ticket';
import { AppInventory } from './../../../shared/core/models/inventory';
import { FormBuilder, FormGroup } from "@angular/forms";
import { AppConstants } from 'src/app/shared/core/models/app-constants';
import { AppTicket } from "src/app/shared/core/models/app-ticket";
import { CustomValidator } from 'src/app/shared/validations/custom-validators';

export class PrivateGetInventoryFunctions {

  public static createForm(fb: FormBuilder, appinventory?: ITicketInventory): FormGroup
  {

    const hasId = appinventory?.inventoryId;

    if (!hasId) {
      const addDosage = PrivateGetInventoryFunctions.getData(false, appinventory);

      return fb.group({
        inventoryName: [null],
        inventoryId: [null],
        type: [null],
        ...addDosage,
        doctorsPrescription: [null, [CustomValidator.MinLength(5), CustomValidator.MaxLength(1000)]],
      });
    }
    else {
      const addDosage = PrivateGetInventoryFunctions.getData(true, appinventory);

      return fb.group({
        inventoryName: [{value: appinventory?.inventoryName, disabled: true}],
        inventoryId: [appinventory.inventoryId],
        type: [appinventory.type],
        ...addDosage,
        doctorsPrescription: [appinventory?.doctorsPrescription, [CustomValidator.MinLength(5), CustomValidator.MaxLength(1000)]],
      });
    }

  }

  static getData(hasId: boolean, appinventory?: ITicketInventory): any {
    return {
      times: [hasId ? appinventory?.times : 1, [CustomValidator.CustomRequired('Times')]],
      dosage: [hasId? appinventory?.dosage : 1, [CustomValidator.CustomRequired('Dosage')]],
      duration: [hasId? appinventory?.duration : 1, [CustomValidator.CustomRequired('Duration')]],
      frequency: [hasId? appinventory?.frequency: 'Once', [CustomValidator.CustomRequired('Frequency')]],
    };
  }

}
