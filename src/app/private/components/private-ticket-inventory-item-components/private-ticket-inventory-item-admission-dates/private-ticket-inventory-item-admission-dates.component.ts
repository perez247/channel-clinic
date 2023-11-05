import { Component, Input, OnInit } from '@angular/core';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import { lastValueFrom } from 'rxjs';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { AppTicket, TicketInventory } from 'src/app/shared/core/models/app-ticket';
import { InventoryService } from 'src/app/shared/services/api/inventory/inventory.service';

@Component({
  selector: 'app-private-ticket-inventory-item-admission-dates',
  templateUrl: './private-ticket-inventory-item-admission-dates.component.html',
  styleUrls: ['./private-ticket-inventory-item-admission-dates.component.scss']
})
export class PrivateTicketInventoryItemAdmissionDatesComponent extends SharedUtilityComponent implements OnInit {

  @Input() ticket: AppTicket = {} as AppTicket;
  @Input() ticketInventory: TicketInventory = {} as TicketInventory;

  fonts = { faCalendar };

  hours = Array(24).fill(0).map((x,i)=>i + 1);
  selectedHourStart: any = null;
  selectedHourEnd: any = null;

  duration = 0;

  totalPrice = 0;

  constructor(
    private inventoryService: InventoryService
  ) {
    super();
  }

  override async ngOnInit(): Promise<void> {
    this.totalPrice = this.ticketInventory.totalPrice;
    await this.setDates();
  }

  async setDates(): Promise<void> {
    if (!this.ticket.sentToFinance && !this.ticketInventory.admissionStartDate) {
      this.ticketInventory.admissionStartDate = new Date();
      await this.quicklyUpdateAdmissionStartDate();
    } else {
      if (!this.ticketInventory.admissionEndDate) {
        this.ticketInventory.admissionEndDate = new Date();
      }

      const d = new Date(this.ticketInventory.admissionEndDate);

      this.ticketInventory.admissionStartDate = new Date(this.ticketInventory.admissionStartDate);
      this.ticketInventory.admissionEndDate = d;
      this.selectedHourEnd = d.getHours();
      this.setDuration();
    }

    const d = new Date(this.ticketInventory.admissionStartDate);

    this.selectedHourStart = d.getHours();
  }

  addHoursStart(): void {
    if (!this.selectedHourStart || this.selectedHourStart == 'null') {
      const dAsMoment = new Date((this.ticketInventory.admissionStartDate  as any).toDateString())
      this.ticketInventory.admissionStartDate = dAsMoment;
    } else {
      const hour = this.selectedHourStart;
      let dAsMoment = new Date((this.ticketInventory.admissionStartDate  as any).toDateString())
      dAsMoment.setHours(hour);
      this.ticketInventory.admissionStartDate = dAsMoment;
    }
  }

  addHoursEnd(): void {
    if (!this.selectedHourEnd || this.selectedHourEnd == 'null') {
      const dAsMoment = new Date((this.ticketInventory.admissionEndDate  as any).toDateString())
      this.ticketInventory.admissionEndDate = dAsMoment;
    } else {
      const hour = this.selectedHourEnd;
      let dAsMoment = new Date((this.ticketInventory.admissionEndDate  as any).toDateString())
      dAsMoment.setHours(hour);
      this.ticketInventory.admissionEndDate = dAsMoment;
    }
    this.setDuration();
  }

  setDuration(): void {
    this.duration = moment(this.ticketInventory.admissionEndDate).diff(this.ticketInventory.admissionStartDate, 'days');
    this.setnewCost();
  }

  setnewCost(): void {
    this.ticketInventory.totalPrice = this.totalPrice * (this.ticketInventory?.prescribedQuantity ?? 0) * this.duration;
  }

  async quicklyUpdateAdmissionStartDate(): Promise<void> {
    this.isLoading = true;
    const d = this.ticketInventory;
    await lastValueFrom(this.inventoryService.updateTicketInventory({ ...d, ticketInventoryId: d?.base.id }));
    this.isLoading = false;
  }
}
