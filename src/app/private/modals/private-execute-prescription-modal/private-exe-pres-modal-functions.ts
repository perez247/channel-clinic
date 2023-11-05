
import { FormBuilder, FormGroup } from "@angular/forms";
import { NgbCalendar } from "@ng-bootstrap/ng-bootstrap";
import { AppTicket, AppTicketTypes, TicketInventory } from "src/app/shared/core/models/app-ticket";
import { CustomValidator } from 'src/app/shared/validations/custom-validators';

export class PrivateExePresFunction {

  public static createForm(fb: FormBuilder, ticketInventory?: TicketInventory): FormGroup
  {
    const d = new Date();
    let hour = d.getHours();
    let minute = d.getMinutes();

    return fb.group({
      ticketInventoryId: [ticketInventory?.base.id],
      timeGiven: [d, [CustomValidator.CustomRequired('Date given')]],
      time: [{ hour, minute }, [CustomValidator.CustomRequired('Time')]],
    });
  }

}
