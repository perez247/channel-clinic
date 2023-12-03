import { AppRoles } from './app-roles';
import { AppTicket, TicketInventory } from 'src/app/shared/core/models/app-ticket';
import { Base } from './app-user';
import { AppUser } from 'src/app/shared/core/models/app-user';
import { Payment } from './app-ticket';
import { CalendarDatePipe } from 'angular-calendar/modules/common/calendar-date.pipe';
import { AppInventory } from './inventory';
import { UserIdPipe } from '../../pipes/user-id.pipe';

export class FinancialFilter {
  paymentStatus?: string;
  patient?: boolean;
  company?: boolean;
}

export interface PayerPayee {
  appUser: AppUser,
  payer: boolean
}

export class FinancialDebtFilter {
  patientId?: string;
  patientName?: string;
  companyId?: string;
  companyName?: string;
  startDate?: Date;
  endDate?: Date;
}

export class FinancialPaidFilter {
  patientId?: boolean;
  companyId?: boolean;
  startDate?: Date;
  endDate?: Date;
}

export class Debt {
  amount?: number;
  approvedPrice?: number;
  base?: Base;
  companyContract?: boolean;
  costType?: string;
  description?: string;
  patientContract?: boolean;
  payerPayee?: PayerPayee[];
  payment?: Payment[];
  paymentStatus?: string;
  ticket?: AppTicket
}

export class InvoiceCSV {
  Type?: string;
  Other?: string;
  Date?: string;
  Amount?: string;
  Paid?: string;
  Owing?: string;

  constructor(data: Debt)
  {
    this.Type = this.getType(data);
    this.Other = this.getOtherInformation(data);
    // this.Date = new Date(data.base?.dateCreated ?? '').toISOString().slice(0, 10);
    this.Amount = data.amount?.toString() ?? '';
    const paid = this.getPaid(data);
    this.Paid = paid.toString();
    this.Owing = (data.amount ?? 0 - paid).toString();
  }

  getType(debt: Debt): string {
    if (debt.companyContract) { return 'Company Contract'; }
    if (debt.patientContract) { return 'Patient Contract'; }

    const d = debt.ticket?.appInventoryType ?? '';
    return d == 'admission' ? d : 'appointment';
  }

  getOtherInformation(debt: Debt): string {
    if (debt.companyContract) { return 'Company Contract'; }
    if (debt.patientContract) { return 'Patient Contract'; }

    const roles = AppRoles;

    return this.initializeOtherInformation(debt);
  }

  getPaid(debt: Debt): number
  {
    let sub = 0;
    debt.payment?.forEach(x => {
      sub += x.amount;
    });
    return sub;
  }

  private initializeOtherInformation(debt: Debt): string {
    let data = '';

    data += this.getPatientDetails(debt.ticket)
    debt.ticket?.ticketInventories.forEach(x => {
      data += `
      ${this.getDefaultInformation(x)}`

      if (x.inventory.appInventoryType == 'admission') {
        data += this.getAdmissionInformation(x);
      }

      if (x.inventory.appInventoryType == 'surgery') {
        data += this.getSurgeryInformation(x);
      }

      data += `\n*********************************************************`

    });

    return `"${data}"`;
  }

  private getPatientDetails(ticket?: AppTicket ): string {
    return `
      -----------------------------------------------------------------------
      PATIENT: ${ticket?.patient.user?.lastName?.toUpperCase()} ${ticket?.patient.user?.firstName?.toUpperCase()} ${ticket?.patient.user?.otherName ? ticket.patient.user?.otherName?.toLocaleUpperCase() : ''}
      HOSPITAL ID: ${new UserIdPipe().transform(ticket?.patient.user?.base?.id)}
      COMPANY ID: ${ticket?.patient.companyUniqueId}
      OTHER INFORMATION: ${ticket?.patient.otherInformation}
      -----------------------------------------------------------------------`
  }

  private getDefaultInformation(x: TicketInventory): string {
    console.log(x.concludedDate);
    return `
      NAME: ${x.inventory.name} (${x.inventory.appInventoryType})
      QUANTITY: ${x.prescribedQuantity}
      TOTAL: ${x.totalPrice} (${x.currentPrice} * ${x.prescribedQuantity})
      DATE STARTED: ${new Date(x.base?.dateCreated ?? '').toISOString().slice(0, 10)}
      DATE CONCLUDED: ${x.concludedDate ? new Date(x.concludedDate).toISOString().slice(0, 10) : ''}
      ADDITIONAL INFO: ${x.additionalNote ? x.additionalNote : ''}`;
  }

  private getAdmissionInformation(x: TicketInventory): string {
    return `
      ADMITTED: ${x.admissionStartDate ? new Date(x.admissionStartDate).toISOString().slice(0, 10): ''}
      DISCHARGED: ${x.admissionEndDate ? new Date(x.admissionEndDate).toISOString().slice(0, 10): ''}`;
  }

  private getSurgeryInformation(x: TicketInventory): string {
    return `
      SURGERY DATE: ${x.surgeryDate  ? new Date(x.surgeryDate).toISOString().slice(0, 10) : ''}
      SURGERY PERSONNELS: ${x.surgeryTicketPersonnels?.length ?? 0}`;
  }
}

export class AppPaid {
  amount?: number;
  approvedPrice?: number;
  base?: Base;
  costType?: string;
  description?: string;
  payerPayee?: PayerPayee[];
  payment?: Payment[];
  paymentStatus?: string;
  totalAppCosts?: number;
}
