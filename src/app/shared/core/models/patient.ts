import { Base, Nurse } from "./app-user";

export class PatientVital {
    nurse?: Nurse
    data?: string
    base?: Base
}

export class PatientVitalFilter {
    patientId?: string;
  }