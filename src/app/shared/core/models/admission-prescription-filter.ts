export class AdmissionPrescriptionFilter {
  appInventoryType?: 'admission' | 'pharmacy' | 'lab' | 'surgery' | 'radiology';
  ticketId?: string;
  prescriptionId?: string;
}
