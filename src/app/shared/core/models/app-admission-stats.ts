import { AppTicket, ITicketInventory, TicketInventory } from "./app-ticket";
import { Patient } from "./app-user";

export interface AdmissionStats {
  appTicketId: string;
  appTicket: AppTicket;
  patient: Patient;
  lab: number;
  pharmacy: number;
  radiology: number;
  surgery: number;
  nurse: number;
  ticketInventories: TicketInventory[];
}
