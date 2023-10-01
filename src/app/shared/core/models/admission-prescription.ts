import { TicketInventory } from "./app-ticket";
import { AppUser, Base } from "./app-user";

export class AdmissionPrescription {
  appInventoryType?: string;
  appTicketId?: string;
  appTicketStatus?: string;
  base?: Base
  overallDescription?: string;
  ticketInventories?: TicketInventory[];
  doctor?: AppUser
}
