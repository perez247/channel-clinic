import { FileUpload } from "src/app/private/modals/private-upload-files-modal/private-upload-files-modal.component";

export class PaymentMade extends FileUpload{
  amount?: number;
  paymentType?: string;
  typeDisplayName?: string;
}
