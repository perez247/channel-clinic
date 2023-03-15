import { Component, OnInit, Input } from "@angular/core";
import { AppTicket } from "src/app/shared/core/models/app-ticket";


@Component({
  selector: 'app-private-view-ticket-modal',
  templateUrl: './private-view-ticket-modal.component.html',
  styleUrls: ['./private-view-ticket-modal.component.scss']
})
export class PrivateViewTicketModalComponent implements OnInit {

  @Input() ticket?: AppTicket;

  constructor() { }

  ngOnInit(): void {
  }

}
