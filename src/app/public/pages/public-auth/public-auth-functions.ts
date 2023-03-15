import { TicketFilter } from 'src/app/shared/core/models/app-ticket';
import { FormBuilder, FormGroup } from "@angular/forms";
import { CustomValidator } from "src/app/shared/validations/custom-validators";

export class PublicAuthFunctions {

  public static createForm(fb: FormBuilder): FormGroup
  {
    return fb.group({
      email: [null, [CustomValidator.CustomEmail(), CustomValidator.CustomRequired('Email')]],
      password: [null, [CustomValidator.CustomRequired('Password')]],
    });
  }

}
