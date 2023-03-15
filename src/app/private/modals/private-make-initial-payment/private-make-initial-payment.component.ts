import { finalize } from 'rxjs';
import { CustomToastService } from './../../../shared/services/common/custom-toast/custom-toast.service';
import { FileUpload } from './../private-upload-files-modal/private-upload-files-modal.component';
import { Company } from './../../../shared/core/models/app-user';
import { SharedUtilityComponent } from './../../../shared/components/shared-utility/shared-utility.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppTicket, TicketInventory } from 'src/app/shared/core/models/app-ticket';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppInventoryItem } from 'src/app/shared/core/models/inventory';
import { PrivateAddPaymentModalComponent } from '../private-add-payment-modal/private-add-payment-modal.component';
import { UtilityHelpers } from 'src/app/shared/core/functions/utility-helpers';
import * as saveAs from 'file-saver';
import { faFileAlt, faTrashAlt, faDownload, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FinancialService } from 'src/app/shared/services/api/financial/financial.service';
import { PaymentMade } from 'src/app/shared/core/models/payment-made-model';

@Component({
  selector: 'app-private-make-initial-payment',
  templateUrl: './private-make-initial-payment.component.html',
  styleUrls: ['./private-make-initial-payment.component.scss']
})
export class PrivateMakeInitialPaymentComponent extends SharedUtilityComponent implements OnInit {

  @Input() ticket: AppTicket = {} as AppTicket;
  @Input() inventoryItems: AppInventoryItem[] = [];
  @Input() payee: Company = {} as Company;

  @Output() reload = new EventEmitter<any>();

  total = 0;
  vat = 0.01;
  vatTotal = 0;
  sumTotal = 0;

  isPayeeIndividual? = false;

  payments: PaymentMade[] = [];

  fonts = { faFileAlt, faTrashAlt, faDownload, faTrash }

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private toast: CustomToastService,
    private financialService: FinancialService
  ) {
    super();
  }

  override ngOnInit(): void {
    this.calculateTotal();
    this.isPayeeIndividual = this.payee.forIndividual;
  }

  calculateTotal() {
    this.ticket.ticketInventories.forEach((a) => {

      const aItem = this.inventoryItems.find(x => x?.inventory?.base?.id === a.inventory.base?.id);

      if (aItem && a.appTicketStatus === 'ongoing') {
        this.total += Number(a.totalPrice);
      }

    });

    this.vatTotal = this.total * this.vat;
    this.sumTotal = this.vatTotal + this.total;
  }

  pricePerItem(ticketInventory: TicketInventory) : number
  {
    var item = this.inventoryItems.find(x => x?.inventory?.base?.id === ticketInventory.inventory.base?.id);

    if (!item) { return 0; }

    return item.pricePerItem ?? 0;
  }

  addPayment(): void {
    const modalRef = this.modalService.open(PrivateAddPaymentModalComponent, { size: 'lg' });

    const sub = modalRef.componentInstance.newPayment.subscribe({
      next: (data: FileUpload) => {
        this.payments.push(data);
      },
      error: (error: any) => {
        throw error;
      }
    });

    this.subscriptions.push(sub);
  }

  downloadFile(fileToDownload: FileUpload): void {
    const file = UtilityHelpers.dataURLtoFile(fileToDownload.base64String ?? '', fileToDownload.name ?? '')
    saveAs(file, fileToDownload.name ?? '');
  }

  removeFromList(index: any): void {
    this.payments.splice(index, 1);
  }

  uploadPayment(): void {
    const sum = this.getSumOfPayments();

    if (sum > this.sumTotal) {
      this.toast.error(`Total Amount to be paid is greater than sum total`);
      return;
    }

    const data = {
      companyId : this.payee.base?.id, // Id of the company
      appTicketId: this.ticket.base.id,
      vatTotal: this.vatTotal,
      total: this.total,
      sumTotal: this.sumTotal,
      ticketInventories: this.ticket.ticketInventories.map(x => {
        return {
          ticketInventoryId: x.base.id,
          appTicketStatus: x.appTicketStatus,
          currentPrice: x.currentPrice,
          totalPrice: x.totalPrice,
          prescribedQuantity: x.prescribedQuantity,
        }
      }),
      payments: this.payments
    }

    this.isLoading = true;
    const sub = this.financialService.initialPayment(data)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data)=> {
          this.toast.success('Payment logged successfully');
          this.reload.emit();
          this.activeModal.close();
        },
        error: (error)=> {
          throw error;
        }
      });

    this.subscriptions.push(sub);
  }

  getSumOfPayments(): number {
    let sum = 0;
    this.payments.forEach(x => {
      sum += x.amount ?? 0;
    });

    return sum;
  }
}
