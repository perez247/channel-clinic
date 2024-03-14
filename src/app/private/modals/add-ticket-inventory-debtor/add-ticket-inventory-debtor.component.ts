import { Component, Input, OnInit } from '@angular/core';
import { faPlusCircle, faTrash, faNairaSign } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ITicketInventoryDebtor, TicketInventory } from 'src/app/shared/core/models/app-ticket';
import { Company } from 'src/app/shared/core/models/app-user';

@Component({
  selector: 'app-add-ticket-inventory-debtor',
  templateUrl: './add-ticket-inventory-debtor.component.html',
  styleUrls: ['./add-ticket-inventory-debtor.component.scss']
})
export class AddTicketInventoryDebtorComponent implements OnInit {

  @Input() ticketInventory: TicketInventory = {} as TicketInventory;
  @Input() sumTotal = 0;

  payers: Company[] = [];
  debtors: ITicketInventoryDebtor[] = [];

  fonts = { faPlusCircle, faTrash, faNairaSign }

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.payers = this.ticketInventory.payers;
    const d = JSON.stringify(this.ticketInventory.debtors);
    this.debtors = JSON.parse(d);
  }

  addPayer(): void {
    this.debtors.push({} as ITicketInventoryDebtor);
  }

  removePayer(i: number): void {
    const payerRemoved = this.debtors.splice(i, 1);
  }

  selected(itemSelected: any, debtor: ITicketInventoryDebtor): void {
    const payerAdded = itemSelected.target.value;

    if (payerAdded == 'null') { debtor.payerId = ''; return; }

    const payerFound = this.payers.find(x => x.userId == payerAdded);

    if (!payerFound) { debtor.payerId = ''; return; }

    debtor.payer = payerFound;
    debtor.payerId = payerAdded;
  }

  get canSave(): boolean {
    let save = false;

    this.debtors.forEach(x => {

      if (x.payerId != null && x.payerId != 'null' && x.amount && x.amount > 0) {
        save = true;
      } else {
        save = false;
      }

    });

    return !save;
  }

  saveDebtors(): void {
    this.ticketInventory.debtors = this.debtors;
    this.activeModal.close();
  }
}
