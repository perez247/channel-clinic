import { ITicketInventory, TicketInventory } from './../../../shared/core/models/app-ticket';
import { AppInventory } from './../../../shared/core/models/inventory';
import { FormBuilder, FormGroup } from "@angular/forms";
import { AppTicket } from "src/app/shared/core/models/app-ticket";
import { CustomValidator } from 'src/app/shared/validations/custom-validators';

export class PrivateGetInventoryFunctions {

  public static createForm(fb: FormBuilder,  canShowTimeAndFrequency: boolean, appinventory?: ITicketInventory): FormGroup
  {

    const hasId = appinventory?.inventoryId;

    if (!hasId) {
      const addDosage = canShowTimeAndFrequency ? {
        times: [null, [CustomValidator.CustomRequired('Times')]],
        dosage: [null, [CustomValidator.CustomRequired('Dosage')]],
        frequency: [null, [CustomValidator.CustomRequired('Frequency')]],
      } : {};

      return fb.group({
        inventoryName: [null],
        inventoryId: [null],
        ...addDosage,
        doctorsPrescription: [null, [CustomValidator.MinLength(5), CustomValidator.MaxLength(1000)]],
      });
    }
    else {
      const addDosage = canShowTimeAndFrequency ? {
        times: [appinventory.times, [CustomValidator.CustomRequired('Times')]],
        dosage: [appinventory.dosage, [CustomValidator.CustomRequired('Dosage')]],
        frequency: [appinventory.frequency, [CustomValidator.CustomRequired('Frequency')]],
      } : {};

      return fb.group({
        inventoryName: [{value: appinventory?.inventoryName, disabled: true}],
        inventoryId: [appinventory.inventoryId],
        ...addDosage,
        doctorsPrescription: [appinventory?.doctorsPrescription, [CustomValidator.MinLength(5), CustomValidator.MaxLength(1000)]],
      });
    }

  }

}
