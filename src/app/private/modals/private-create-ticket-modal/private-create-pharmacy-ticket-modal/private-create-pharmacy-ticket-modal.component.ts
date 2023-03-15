import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { finalize } from "rxjs";
import { SharedUtilityComponent } from "src/app/shared/components/shared-utility/shared-utility.component";
import { AppAppointment } from "src/app/shared/core/models/app-appointment";
import { AppTicket, AppTicketTypes } from "src/app/shared/core/models/app-ticket";
import { InventoryFilter, AppInventory } from "src/app/shared/core/models/inventory";
import { TicketService } from "src/app/shared/services/api/ticket/ticket.service";
import { CustomErrorService } from "src/app/shared/services/common/custom-error/custom-error.service";
import { CustomToastService } from "src/app/shared/services/common/custom-toast/custom-toast.service";
import { SharedCreatePharmacyTicketFunctions } from "./private-create-pharmacy-ticket-functions";

@Component({
  selector: 'app-private-create-pharmacy-ticket-modal',
  templateUrl: './private-create-pharmacy-ticket-modal.component.html',
  styleUrls: ['./private-create-pharmacy-ticket-modal.component.scss']
})
export class PrivateCreatePharmacyTicketModalComponent extends SharedUtilityComponent implements OnInit {

  @Input() ticket?: AppTicket;
  @Input() appointment?: AppAppointment;
  @Output() saved = new EventEmitter();

  form: FormGroup = {} as any;

  filter: InventoryFilter = new InventoryFilter();

  ticketInventories: any[] = [];

  fonts = { faTrashAlt };

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    public errorService: CustomErrorService,
    private tickerService: TicketService,
    private toast: CustomToastService,
  ) {
    super();
  }

  override ngOnInit(): void {
    this.filter.appInventoryType = AppTicketTypes.pharmacy;
    this.initializeForm();
  }

  initializeForm(): void
  {
    this.form = SharedCreatePharmacyTicketFunctions.createForm(this.fb, this.ticket);
  }

  updateInventoryName(inventory: AppInventory): void {
    this.form.patchValue({
      inventoryId: inventory.base?.id,
      inventoryName: inventory.name,
    });
  }

  clearInventory(): void {
    this.form.patchValue({
      inventoryId: null,
      // inventoryName: null,
    });
  }

  addTicketInventory(): void {
    const inventoryId = this.form.get('inventoryId')?.value;

    const inventoryExists = this.ticketInventories.find(x => x.inventoryId === inventoryId);

    if (inventoryExists) { return; }

    const data = {
      doctorsPrescription: this.form.get('doctorsPrescription')?.value,
      inventoryId: this.form.get('inventoryId')?.value,
      inventoryName: this.form.get('inventoryName')?.value,
    };

    this.ticketInventories.push(data);
    this.form.patchValue({
      inventoryId: null,
      inventoryName: null,
      doctorsPrescription: null,
    });
  }

  removeTicketInventory(index: number): void {
     this.ticketInventories.splice(index, 1);
  }

  save(): void {
    const formData = this.form.value;
    const data = {
      ...formData,
      ticketInventories: this.ticketInventories,
      appointmentId: this.appointment?.base?.id,
    }

    this.isLoading = true;
    const sub = this.tickerService.saveTicketAndInventory(data)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.toast.success("Pharmacy ticket and inventories created successfully");
          this.saved.emit();
          this.activeModal.close();
        },
        error: (error) => {
          this.errorService.setFormErrors(error, this.form);
        }
      });

    this.subscriptions.push(sub);
  }
}
