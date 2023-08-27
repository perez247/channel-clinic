import { ITicketInventory, TicketInventory } from "./app-ticket";
import { Patient } from "./app-user";

export interface AdmissionStats {
  appTicketId: string;
  patient: Patient;
  lab: number;
  pharmacy: number;
  radiology: number;
  surgery: number;
  ticketInventories: TicketInventory[];
}
