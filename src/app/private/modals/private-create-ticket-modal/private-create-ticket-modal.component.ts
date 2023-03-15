import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AppAppointment } from "src/app/shared/core/models/app-appointment";
import { AppTicket } from "src/app/shared/core/models/app-ticket";


@Component({
  selector: 'app-private-create-ticket-modal',
  templateUrl: './private-create-ticket-modal.component.html',
  styleUrls: ['./private-create-ticket-modal.component.scss']
})
export class PrivateCreateTicketModalComponent implements OnInit {

  @Input() type = 'pharmacy';
  @Input() ticket?: AppTicket;
  @Input() appointment?: AppAppointment;
  @Output() saved = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  completed(): void {
    this.saved.emit();
  }

}
