
import { FormBuilder, FormGroup } from "@angular/forms";
import { AppTicket, AppTicketTypes, TicketInventory } from "src/app/shared/core/models/app-ticket";
import { CustomValidator } from 'src/app/shared/validations/custom-validators';

export class PrivateExePresFunction {

  public static createForm(fb: FormBuilder, ticketInventory?: TicketInventory): FormGroup
  {
    let hour = new Date().getHours();
    let minute = new Date().getMinutes();

    return fb.group({
      ticketInventoryId: [ticketInventory?.base.id],
      name: [{ disabled: true, value: ticketInventory?.inventory.name }],
      timeGiven: [{readonly: true, value: new Date()}, [CustomValidator.CustomRequired('Date given')]],
      time: [{ hour, minute }, [CustomValidator.CustomRequired('Time')]],
    });
  }

}
