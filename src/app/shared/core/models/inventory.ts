import { Base, Company } from "./app-user";

  export class InventoryFilter {

    name?: string;
    appInventoryType?: string[];
    quantity?: number;
    inventoryId?: string;
    low?: boolean;
    companyId?: string;
    companyName?: string;
    inventoryIds?: string[];
    includeCompanyInventoryItem?: boolean;
  }

  export class InventoryItemFilter {
    companyId?: string;
    appInventoryId?: string;
    amount?: number;
    getDefault?: boolean;
    companyName?: string;
    appInventoryName?: string;
    InventoryItemNames?: string[];
  }

  export class AppInventory {
    base?: Base
    name?: string
    quantity?: number
    appInventoryType?: string
    notifyWhenLow?: boolean
    howLow?: number
    profile?: string
    id?: string
    sellType?: string;
  }

  export class AppInventoryCSV {
    name?: string;
    type?: string;
    quantity?: string;
    howlow?: string;

    constructor(data: AppInventory) {
      this.name = data.name,
      this.type = data.appInventoryType,
      this.quantity = data.quantity?.toString(),
      this.howlow = data.howLow?.toString();
    }
  }

  export class AppInventoryItem {
    base?: Base
    company?: Company
    inventory?: AppInventory
    pricePerItem?: number
  }
