import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { faKitMedical, faNairaSign, faTrash, faPencil, faPlus, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { TicketInventory, AppTicketTypes, SurgeryTicketPersonnel } from 'src/app/shared/core/models/app-ticket';
import { AppUser } from 'src/app/shared/core/models/app-user';
import { AppInventory, InventoryFilter } from 'src/app/shared/core/models/inventory';
import { CustomErrorService } from 'src/app/shared/services/common/custom-error/custom-error.service';

@Component({
  selector: 'app-private-save-surgery-staff-date-modal',
  templateUrl: './private-save-surgery-staff-date-modal.component.html',
  styleUrls: ['./private-save-surgery-staff-date-modal.component.scss']
})
export class PrivateSaveSurgeryStaffDateModalComponent implements OnInit {

  @Input() ticketInventory: TicketInventory = {} as TicketInventory;

  leadingForm: SurgeryTicketPersonnel = {} as SurgeryTicketPersonnel;

  fonts = { faKitMedical, faNairaSign, faTrash, faPencil, faPlus, faCalendar }

  hasHead = false;

  hours = Array(24).fill(0).map((x,i)=>i + 1);
  selectedHour: any = null;

  constructor(
    public activeModal: NgbActiveModal,
    public errorService: CustomErrorService
    ) { }

  ngOnInit(): void {
    if (!this.ticketInventory.surgeryTicketPersonnels) {
      this.ticketInventory.surgeryTicketPersonnels = [];
    }

    if (this.ticketInventory.surgeryDate) {
      const d = new Date(this.ticketInventory.surgeryDate);
      this.selectedHour = d.getHours();
    }

    this.stillHasHead();
  }

  addFromSearchToLeading(user: AppUser): void {
    this.leadingForm.personnel = user;
    this.leadingForm.fullName = `${user.lastName} ${user.firstName} ${user.otherName ? user.otherName : ''}`;
    this.leadingForm!.id = this.leadingForm?.personnel?.base?.id;
  }

  addToData(): void {

    const alreadySaved = this.ticketInventory.surgeryTicketPersonnels.find(x => x.id == this.leadingForm.id);

    if (!alreadySaved) {
      this.ticketInventory.surgeryTicketPersonnels.push(this.leadingForm ?? {});
      this.stillHasHead();
    }

    this.leadingForm = {} as SurgeryTicketPersonnel;
  }

  removeItemInData(i: number): void {
    this.ticketInventory.surgeryTicketPersonnels.splice(i, 1);
    this.stillHasHead();
  }

  clearInventory(): void {
    this.leadingForm!.id = null;
  }

  clearSurgeryDate(): void {
    this.ticketInventory.surgeryDate = null;
    this.selectedHour = null;
  }

  addHours(): void {
    if (!this.selectedHour || this.selectedHour == 'null') {
      const dAsMoment = new Date((this.ticketInventory.surgeryDate  as any).toDateString())
      this.ticketInventory.surgeryDate = dAsMoment.toString();
    } else {
      const hour = this.selectedHour;
      let dAsMoment = new Date((this.ticketInventory.surgeryDate  as any).toDateString())
      dAsMoment.setHours(hour);
      this.ticketInventory.surgeryDate = dAsMoment;
    }
  }

  private stillHasHead(): void {
    this.hasHead = this.ticketInventory.surgeryTicketPersonnels.some(x => x.isHeadPersonnel);
  }


}
