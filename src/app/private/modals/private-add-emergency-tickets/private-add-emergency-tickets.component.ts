import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { PrivateAddEmergencyTicketsFunction } from './private-add-emergency-tickets-functions';
import { AppUser, Company } from 'src/app/shared/core/models/app-user';
import { CustomErrorService } from 'src/app/shared/services/common/custom-error/custom-error.service';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { PrivateCreateTicketModalComponent } from '../private-create-ticket-modal/private-create-ticket-modal.component';
import { EventBusService } from 'src/app/shared/services/common/event-bus/event-bus.service';
import { TicketService } from 'src/app/shared/services/api/ticket/ticket.service';
import { finalize, firstValueFrom } from 'rxjs';
import { CustomToastService } from 'src/app/shared/services/common/custom-toast/custom-toast.service';
import { Router } from '@angular/router';
import { ApplicationRoutes } from 'src/app/shared/core/routes/app-routes';
import { AppTicket } from 'src/app/shared/core/models/app-ticket';
import { UserService } from 'src/app/shared/services/api/user/user.service';

@Component({
  selector: 'app-private-add-emergency-tickets',
  templateUrl: './private-add-emergency-tickets.component.html',
  styleUrls: ['./private-add-emergency-tickets.component.scss']
})
export class PrivateAddEmergencyTicketsComponent extends SharedUtilityComponent implements OnInit {

  form: FormGroup = {} as any;

  fonts = { faPlusCircle }

  ticket?: AppTicket;

  routes = ApplicationRoutes.generateRoutes();
  
  companies: Company[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    public errorService: CustomErrorService,
    private modalService: NgbModal,
    private eventBus: EventBusService,
    private ticketService: TicketService,
    private toast: CustomToastService,
    private router: Router,
    private userService: UserService,
    ) {
    super();
  }

  override ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = PrivateAddEmergencyTicketsFunction.createForm(this.fb);
  }

  addPatient(patient: AppUser): void {
    this.getIndividualCompany(patient);
    this.form.patchValue({
      patientId: patient.patient?.base?.id,
      patientName: `${patient.lastName} ${patient.firstName} ${patient.otherName}`,
    });
  }

  clearpatient(): void {
    this.form.patchValue({
      patientId: null,
      sponsorId: null,
    });
  }

  addDoctor(doctor: AppUser): void {
    this.form.patchValue({
      doctorId: doctor.staff?.base?.id,
      doctorName: `${doctor.lastName} ${doctor.firstName} ${doctor.otherName}`,
    });
  }

  clearDoctor(): void {
    this.form.patchValue({
      doctorId: null
    });
  }

  addTicket(type: string): void {
    const modalRef = this.modalService.open(PrivateCreateTicketModalComponent, { size: 'lg' });
    const component: PrivateCreateTicketModalComponent = modalRef.componentInstance;
    component.type = type;

    if (type == 'admission') { modalRef.componentInstance.singleType = true; }

    component.returnData = true;

    const sub = component.saved.subscribe({
      next: (data: any) => {
        this.ticket = data;
      }
    });

    this.subscriptions.push(sub);
  }

  removeTicket(): void {
    this.ticket = undefined;
  }

  updateTicket(newTicket: AppTicket): void {
    this.ticket = newTicket
  }

  createEmergencyAppointment(): void {
    this.isLoading = true;
    const currentUser = this.eventBus.state.user.value;

    const data = this.form.value;
    const event = this.ticket?.appInventoryType == 'admission' ? 'Admission' : 'Appointment';
    let d = {
      ...data,
      overallAppointmentDescription: `${event} created by ${currentUser?.lastName} ${currentUser?.firstName} for emergency ticket`,
      overallTicketDescription: (this.ticket as any).overallDescription,
      ticketInventories: (this.ticket as any).ticketInventories,
      appInventoryType: this.ticket?.appInventoryType
    };


    const sub = this.ticketService.createEmergencyTicket(d)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: async (dataFromServer) => {

          await firstValueFrom(this.ticketService.sendAllTickets(dataFromServer));

          this.toast.success(`Emergency ticket created successfully`);
          this.router.navigate([`/${this.routes.privateRoute.single_ticket(dataFromServer.ticketId).$absolutePath}`]);
          this.activeModal.close();
        },
        error: (error) => {
          throw error;
        }
      });

      this.subscriptions.push(sub);
  }

  getIndividualCompany(userAsPatient: AppUser): void {
    this.isLoading = true;
    const sub = this.userService.getIndividualCompany()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.companies = [];
          const user = data.result ? data.result[0] : null;
          const company = user?.company;
          if (company && company.base?.id != userAsPatient?.patient?.company?.base?.id) {
            this.companies.push(company);
          }

          if (userAsPatient.patient?.company) {
            this.companies.push(userAsPatient.patient.company || {});
          }
        }
      });
    this.subscriptions.push(sub);
  }
}
