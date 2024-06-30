import { PayerPayee } from './financial';
import { Company } from 'src/app/shared/core/models/app-user';
import { AppUser, Base, Patient, Staff, UserContract } from "./app-user";
import { AppInventory } from "./inventory";
import { AppAppointment } from './app-appointment';

export class TicketFilter {
  appointmentId?: string;
  appInventoryType?: 'admission' | 'pharmacy' | 'lab' | 'surgery' | 'radiology' | '';
  patientId?: string;
  patientName?: string;
  doctorId?: string;
  doctorName?: string;
  ticketId?: string;
  full?: boolean;
  sentToDepartment?: boolean;
  sentToFinance?: boolean;
  appTicketStatus?: string;
  paymentStatus?: string[];
  beforeDateTime?: any;
}

export interface AppTicket {
  base: Base
  appointmentId: string
  appointment: AppAppointment
  cost: AppCost
  overallDescription: string
  overallAppointmentDescription: string
  sent: boolean
  sentToFinance: boolean
  appTicketStatus: string
  appInventoryType: string
  ticketInventories: TicketInventory[]
  doctor: Staff
  patient: Patient
  payerPayee: PayerPayee[]
}

export const AppTicketTypes = {
  pharmacy: 'pharmacy',
  surgery: 'surgery',
  lab: 'lab',
  radiology: 'radiology',
  admission: 'admission',
  nurse: 'nurse',
}

export interface TicketInventory {
  appTicketId: string
  inventory: AppInventory
  appInventoryQuantity: number
  currentPrice: any
  totalPrice: any
  concludedPrice: any
  concludedDate: any
  appTicketStatus: string
  proof: string[]
  description: any
  staffPrescription?: string
  staffObservation?: string
  doctorsPrescription?: string
  departmentDescription?: string
  financeDescription?: string
  prescribedQuantity?: number
  surgeryDate?: any
  surgeryTicketStatus: string
  surgeryTicketPersonnels: SurgeryTicketPersonnel[]
  prescribedSurgeryDescription?: string
  surgeryTestResult: string
  prescribedLabRadiologyFeature?: string
  dateOfLabTest?: string
  labRadiologyTestResult: any
  prescribedAdmission?: string
  admissionStartDate?: any
  admissionEndDate: any
  base: Base
  pricePerItem: number
  times: number;
  dosage: number;
  frequency: string;
  duration: number;
  itemsUsed: AppInventory[];
  updated: string;
  additionalNote: string;
  staff: Staff;
  timeGiven: string;
  debtors: ITicketInventoryDebtor[];
  payers: Company[];
}

export class TicketInventoryFilter {
  appTicketId?: string;
  prescriptionId?: string;
  isTickets?: boolean;
  isPrescriptions?: boolean;
  roles: string[] = [];
}

export interface SurgeryTicketPersonnel {
  base: Base
  personnel: AppUser
  personnelId: string
  surgeryRole: string
  description: string
  summaryOfSurgery: any
  isHeadPersonnel?: boolean
  isPatient?: boolean
  id: any;
  fullName: string;
}

export interface Payment {
  amount: number
  tax: number
  paymentType: string
  proof: string
  paymentDetails: any
  additionalDetail: any
  datePaid: Date
}

export interface AppCost {
  amount: number
  approvedPrice: number
  description: any
  payment: Payment[]
  costType: string
  paymentStatus: string
  patientContractObj: UserContract,
  companyContractObj: UserContract
  patientContract: boolean,
  companyContract: boolean
  base: Base
}

export interface ITicketInventory {
  doctorsPrescription: string,
  inventoryId: string,
  ticketInventoryId: string,
  inventoryName: string,
  times: number;
  dosage: number;
  frequency: string;
  duration: number;
  type: string;
}

export interface ITicketInventoryDebtor {
  payerId: string,
  payer: AppUser | Company | any,
  amount: number,
  description: string,
}

export class TicketHelper {
  static toITicketInventory(ticketInventory: TicketInventory): ITicketInventory {
    const data = {} as ITicketInventory;
    data.doctorsPrescription = ticketInventory.doctorsPrescription || '';
    data.inventoryId = ticketInventory.inventory.id || '';
    data.ticketInventoryId = ticketInventory.base.id;
    data.inventoryName = ticketInventory.inventory.name || '';
    data.times = ticketInventory.times;
    data.dosage = ticketInventory.dosage;
    data.frequency = ticketInventory.frequency;
    data.duration = ticketInventory.duration;
    data.type = ticketInventory.inventory.appInventoryType || 'pharmacy';
    return data;
  }
}
