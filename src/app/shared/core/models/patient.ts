import { Base, Nurse } from "./app-user";

export class PatientVital {
    nurse?: Nurse
    data?: string
    base?: Base
}

export class PatientVitalFilter {
    patientId?: string;
}

export const DefaultVitals = [ 
    {
        name: 'Blood Pressure',
        value: '',
    }, 
    {
        name: 'Pulse',
        value: '',
    }, 
    {
        name: 'Temperature',
        value: '',
    }, 
    {
        name: 'Height',
        value: '',
    }, 
    {
        name: 'Weight',
        value: '',
    }, 
    {
        name: 'Spo2',
        value: '',
    }, 
    {
        name: 'Random Blood Sugar',
        value: '',
    }
]