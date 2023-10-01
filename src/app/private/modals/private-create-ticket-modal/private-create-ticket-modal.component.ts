import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { faTrashAlt, faPen, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { AppAppointment } from "src/app/shared/core/models/app-appointment";
import { AppTicket, ITicketInventory, TicketFilter } from "src/app/shared/core/models/app-ticket";
import { InventoryFilter } from "src/app/shared/core/models/inventory";
import { AppPagination, PaginationRequest, PaginationResponse } from "src/app/shared/core/models/pagination";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TicketService } from "src/app/shared/services/api/ticket/ticket.service";
import { CustomErrorService } from "src/app/shared/services/common/custom-error/custom-error.service";
import { CustomToastService } from "src/app/shared/services/common/custom-toast/custom-toast.service";
import { PrivateCreateTicketFunctions } from "./private-create-ticket-modal-functions";
import { SharedUtilityComponent } from "src/app/shared/components/shared-utility/shared-utility.component";
import { finalize } from "rxjs";
import { PrivateGetInventoryModalComponent } from "../private-get-inventory-modal/private-get-inventory-modal.component";


@Component({
  selector: 'app-private-create-ticket-modal',
  templateUrl: './private-create-ticket-modal.component.html',
  styleUrls: ['./private-create-ticket-modal.component.scss']
})
export class PrivateCreateTicketModalComponent extends SharedUtilityComponent implements OnInit {

  @Input() type = 'pharmacy';
  @Input() ticket?: AppTicket;
  @Input() appointment?: AppAppointment;
  @Output() saved = new EventEmitter<any>();
  @Input() ticketInventories: ITicketInventory[] = [];

  @Input() returnData = false;

  form: FormGroup = {} as any;

  filter: InventoryFilter = new InventoryFilter();

  fonts = { faTrashAlt, faPen, faPlusCircle };

  tickets: AppTicket[] = [];
  appPagination = new AppPagination();
  filterForTicket = new TicketFilter();
  paginationRequest = new PaginationRequest<TicketFilter>(this.appPagination, this.filterForTicket);
  paginationResponse = new PaginationResponse<AppTicket[]>();

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    public errorService: CustomErrorService,
    private toast: CustomToastService,
    private modalService: NgbModal,
    private ticketService: TicketService,
  ) {
    super();
  }

  override ngOnInit(): void {
    this.initializeForm(this.type);
  }

  initializeForm(type: string): void
  {
    this.filter.appInventoryType = [type];
    this.form = PrivateCreateTicketFunctions.createForm(this.fb, this.ticket, type);
  }

  saveTicketInventory(appTicket: any)
  {
    const modalRef = this.modalService.open(PrivateGetInventoryModalComponent, { size: 'lg' });
    modalRef.componentInstance.appInventory = appTicket;
    modalRef.componentInstance.type = this.type;

    const sub = modalRef.componentInstance.itemSaved.subscribe({
      next: (data: ITicketInventory) => {
        this.addTicketInventory(data);
      }
    });
  }

  addTicketInventory(ticketInventory: ITicketInventory): void {
    const inventoryId = ticketInventory.inventoryId;

    const inventoryExists = this.ticketInventories.find(x => x.inventoryId === inventoryId);

    if (inventoryExists) {
      inventoryExists.doctorsPrescription = ticketInventory.doctorsPrescription;
      inventoryExists.dosage = ticketInventory.dosage;
      inventoryExists.times = ticketInventory.times;
      inventoryExists.frequency = ticketInventory.frequency;
      return;
    }

    this.ticketInventories.push(ticketInventory);
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

    data.ticketInventories.forEach((x: any) => {
      x.appInventoryType = this.type
    });

    if (this.returnData) {
      this.saved.emit(data);
      this.activeModal.close();
      return;
    }

    this.isLoading = true;
    const sub = this.ticketService.saveTicketAndInventory(data)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.toast.success(`${this.type} ticket and inventories saved successfully`);
          this.saved.emit();
          this.activeModal.close();
        },
        error: (error) => {
          this.errorService.setFormErrors(error, this.form);
        }
      });

    this.subscriptions.push(sub);
  }

  completed(): void {
    this.saved.emit();
  }


}
