import { FormBuilder, FormGroup } from "@angular/forms";
import { AppointmentFilter } from "src/app/shared/core/models/app-appointment";
import { UserFilter } from "src/app/shared/core/models/app-user";
import { CustomValidator } from "src/app/shared/validations/custom-validators";

export class PrivateFilterAppointmentsModalFunctions {

  public static createForm(fb: FormBuilder, filter?: AppointmentFilter): FormGroup
  {
    return fb.group({
      patientName: [filter?.patientName, [CustomValidator.CustomPattern('^[a-zA-Z0-9._ ]*$', 'Only letters, numbers, periods and underscore'), CustomValidator.MaxLength(250)]],
      patientId: [filter?.patientId],
      doctorName: [filter?.doctorName, [CustomValidator.CustomPattern('^[a-zA-Z0-9._ ]*$', 'Only letters, numbers, periods and underscore'), CustomValidator.MaxLength(250)]],
      doctorId: [filter?.doctorId],
      exactDate: [filter?.exactDate],
      startDate: [filter?.startDate],
      appointmentId: [filter?.appointmentId],
    });
  }

}
