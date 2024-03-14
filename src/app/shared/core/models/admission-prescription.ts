import { TicketInventory } from "./app-ticket";
import { Base, Staff } from "./app-user";

export class AdmissionPrescription {
  appInventoryType?: string;
  appTicketId?: string;
  appTicketStatus?: string;
  base?: Base
  overallDescription?: string;
  ticketInventories?: TicketInventory[];
  doctor?: Staff
}
