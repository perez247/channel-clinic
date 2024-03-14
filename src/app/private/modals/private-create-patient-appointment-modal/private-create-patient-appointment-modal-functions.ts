import { FormBuilder, FormGroup } from "@angular/forms";
import { CustomValidator } from "src/app/shared/validations/custom-validators";

export class CreatePatientAppoitmentModalFunctions {
  public static createForm(fb: FormBuilder): FormGroup
  {
    const d = new Date();
    let hour = d.getHours() + 1;
    if (hour > 23) {
      hour = hour - 24;
    }

    return fb.group({
      patientId: [null, [CustomValidator.CustomRequired('Patient')]],
      patientName: [null],
      sponsorId: [null, [CustomValidator.CustomRequired('Sponsor')]],
      appointmentDate: [d, [CustomValidator.CustomRequired('Date'), CustomValidator.DateGreaterThanNow()]],
      appointmentTime: [{ hour, minute: 0 }, [CustomValidator.CustomRequired('Time') ]],
      doctorId: [null],
      doctorName: [null],
    });
  }
}
