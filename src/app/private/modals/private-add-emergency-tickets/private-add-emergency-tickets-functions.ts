import { FormBuilder, FormGroup } from "@angular/forms";
import { CustomValidator } from "src/app/shared/validations/custom-validators";

export class PrivateAddEmergencyTicketsFunction {

  public static createForm(fb: FormBuilder): FormGroup {
    return fb.group({
      patientId: [null, [CustomValidator.CustomRequired('Patient')]],
      patientName: [null],
      doctorId: [null, [CustomValidator.CustomRequired('Doctor')]],
      doctorName: [null],
      overallAppointmentDescription: [null, [CustomValidator.MaxLength(5000)]],
      overallTicketDescription: [null, [CustomValidator.MaxLength(5000)]],
      appInventoryType: [null],
      sponsorId: [null, [CustomValidator.CustomRequired('Sponsor')]],
    });
  }
}
