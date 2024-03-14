import { CustomValidator } from 'src/app/shared/validations/custom-validators';
import { FormBuilder, FormGroup } from "@angular/forms";
import { EventBusService } from "../../services/common/event-bus/event-bus.service";
import { AppConstants, ILookUp } from "../models/app-constants";
import { PaymentMade } from "../models/payment-made-model";
import { IFileStatus, UtilityHelpers } from '../functions/utility-helpers';
import * as saveAs from 'file-saver';

export class AddPaymentModelView {

  paymentMade: PaymentMade = new PaymentMade();
  paymentTypes: ILookUp[] = []
  form: FormGroup = {} as FormGroup;
  fileStatus: IFileStatus = { isSuccess: true, errorMessage: undefined };

  constructor(
    private eventBus: EventBusService,
    private fb: FormBuilder
  )
  {
    this.setPaymentTypes();
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      amount: [null, [CustomValidator.CustomRequired('Amount'), CustomValidator.isNumber]],
      paymentType: [null, [CustomValidator.CustomRequired('Payment')]],
      name: [{ value: null, disable: true }, [CustomValidator.CustomRequired('Name')]],
    });
  }

  setPaymentTypes(): void {
    this.paymentTypes = this.eventBus.getState().lookUps.value?.filter(x => x.type === AppConstants.LookUpType.PaymentType) ?? [];
  }

  addFile(base64String: string): void {

    this.paymentMade.base64String = base64String;
    this.form.patchValue({
      name: 'Proof of Payment'
    });
  }

  resetError() {
    this.fileStatus = { isSuccess: true, errorMessage: undefined }
  }

  clearDownload(): void {
    this.paymentMade.base64String = undefined;
  }

  downloadFile(): void {
    const file = UtilityHelpers.dataURLtoFile(this.paymentMade.base64String ?? '', this.paymentMade.name ?? '')
    saveAs(file, this.paymentMade.name);
  }

  addPayment(): PaymentMade | null {
    const data = this.form.value;
    this.paymentMade = {
      ...data,
      base64String: this.paymentMade.base64String
    };

    this.paymentMade.typeDisplayName = this.paymentTypes.find(x => x.name == this.paymentMade.paymentType)?.display ?? 'None';

    // if (!this.paymentMade.base64String) {
    //   // this.fileStatus = { isSuccess: false, errorMessage: 'Proof of payment is required' };
    //   // return null;
    //   return this.paymentMade;
    // }
    
    // const base64String = this.paymentMade.base64String;
    // this.paymentMade = {
    //   ...data,
    //   base64String: base64String
    // };

    // this.paymentMade.typeDisplayName = this.paymentTypes.find(x => x.name == this.paymentMade.paymentType)?.display ?? 'None';

    return this.paymentMade;
  }
}
