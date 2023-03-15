import { FormBuilder, FormGroup } from "@angular/forms";
import { FinancialFilter } from "src/app/shared/core/models/financial";
import { InventoryFilter } from "src/app/shared/core/models/inventory";
import { CustomValidator } from "src/app/shared/validations/custom-validators";

export class PrivateFilterFinanceContractModalFunctions {

  public static createForm(fb: FormBuilder, filter?: FinancialFilter): FormGroup
  {
    return fb.group({
      paymentStatus: [filter?.paymentStatus],
      patient: [filter?.patient],
      company: [filter?.company],
    });
  }

}
