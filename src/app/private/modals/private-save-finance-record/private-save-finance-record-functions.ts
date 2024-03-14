import { FormBuilder, FormGroup } from "@angular/forms";
import { CustomValidator } from "src/app/shared/validations/custom-validators";

export class PrivateSaveFinanceRecordFunctions {
    public static createForm(fb: FormBuilder): FormGroup
    {
        return fb.group({
            amount: [null, [CustomValidator.CustomRequired('Amount')]],
            appCostType: [null, [CustomValidator.CustomRequired('Cost Type')]],
            description: [null, [CustomValidator.CustomRequired('Description')]],
            acteeId: [null, [CustomValidator.CustomRequired('User Responsiple')]],
            actee: [null],
        });
    }
}
