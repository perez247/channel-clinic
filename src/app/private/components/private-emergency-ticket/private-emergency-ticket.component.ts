import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppTicket, ITicketInventory } from 'src/app/shared/core/models/app-ticket';
import { PrivateCreateTicketModalComponent } from '../../modals/private-create-ticket-modal/private-create-ticket-modal.component';
import { Confirmable } from 'src/app/shared/decorators/confirm-action-method-decorator';

@Component({
  selector: 'app-private-emergency-ticket',
  templateUrl: './private-emergency-ticket.component.html',
  styleUrls: ['./private-emergency-ticket.component.scss']
})
export class PrivateEmergencyTicketComponent implements OnInit {

  @Input() ticket?: AppTicket;
  @Output() delete = new EventEmitter();
  @Output() updatedTicket = new EventEmitter();
  ticketInventories: ITicketInventory[] = [];

  fonts = { faEllipsisV };

  constructor(
    private modalService: NgbModal,
    ) { }

  ngOnInit(): void {
    this.ticketInventories = this.ticket?.ticketInventories as any;
  }

  editTicket(): void {
    const modalRef = this.modalService.open(PrivateCreateTicketModalComponent, { size: 'lg' });
    const component: PrivateCreateTicketModalComponent = modalRef.componentInstance;
    component.ticket = this.ticket;
    component.returnData = true;
    component.ticketInventories = this.ticketInventories;
    const sub = component.saved.subscribe({
      next: (data: any) => {
        console.log(data);
        this.ticket = data;
        this.ticketInventories = this.ticket?.ticketInventories as any;
        this.updatedTicket.emit(data);
      }
    });
  }

  @Confirmable({
    title: 'Delete emergency ticket?',
    html: 'Are you sure you want to delete this emergency ticket? all information will be lost'
  })
  deleteTicket(): void {
    this.delete.emit();
  }

}
