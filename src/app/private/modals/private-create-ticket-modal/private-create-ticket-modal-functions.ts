
import { FormBuilder, FormGroup } from "@angular/forms";
import { AppTicket, AppTicketTypes } from "src/app/shared/core/models/app-ticket";
import { CustomValidator } from 'src/app/shared/validations/custom-validators';

export class PrivateCreateTicketFunctions {

  public static createForm(fb: FormBuilder, ticket?: AppTicket, inventoryType?: string): FormGroup
  {
    return fb.group({
      inventoryName: [null],
      inventoryId: [null],
      doctorsPrescription: [null, [CustomValidator.MinLength(5), CustomValidator.MaxLength(1000)]],
      overallDescription: [ticket?.overallDescription, [CustomValidator.MinLength(3), CustomValidator.MaxLength(1000)]],
      ticketId: [ticket?.base?.id],
      appInventoryType: [inventoryType]
    });
  }

}
