import { FormBuilder, FormGroup } from "@angular/forms";
import { CustomValidator } from "src/app/shared/validations/custom-validators";

export class CreatePatientAppoitmentModalFunctions {
  public static createForm(fb: FormBuilder): FormGroup
  {
    return fb.group({
      patientId: [null, [CustomValidator.CustomRequired('Patient')]],
      patientName: [null],
      appointmentDate: [null, [CustomValidator.CustomRequired('Date'), CustomValidator.DateGreaterThanNow()]],
      appointmentTime: [null, [CustomValidator.CustomRequired('Time') ]],
      doctorId: [null],
      doctorName: [null],
    });
  }
}
