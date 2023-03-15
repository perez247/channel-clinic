import { TicketFilter } from 'src/app/shared/core/models/app-ticket';
import { FormBuilder, FormGroup } from "@angular/forms";
import { CustomValidator } from "src/app/shared/validations/custom-validators";

export class PrivateFilterTicketsModalFunctions {

  public static createForm(fb: FormBuilder, filter?: TicketFilter): FormGroup
  {
    return fb.group({
      appointmentId: [filter?.appointmentId],
      appInventoryType: [filter?.appInventoryType],
      patientId: [filter?.patientId],
      patientName: [filter?.patientName],
      doctorId: [filter?.doctorId],
      doctorName: [filter?.doctorName],
      ticketId: [filter?.ticketId],
      full: [filter?.full],
      sentToDepartment: [filter?.sentToDepartment],
      sentToFinance: [filter?.sentToFinance],
      appTicketStatus: [filter?.appTicketStatus],
    });
  }

}
