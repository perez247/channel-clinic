import { AppTicket } from 'src/app/shared/core/models/app-ticket';
import { Base } from './app-user';
import { AppUser } from 'src/app/shared/core/models/app-user';
import { Payment } from './app-ticket';

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
  patientId?: boolean;
  companyId?: boolean;
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
