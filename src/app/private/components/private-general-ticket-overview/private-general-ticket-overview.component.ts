import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faTicket, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { AppTicket } from 'src/app/shared/core/models/app-ticket';
import { ApplicationRoutes } from 'src/app/shared/core/routes/app-routes';

@Component({
  selector: 'app-private-general-ticket-overview',
  templateUrl: './private-general-ticket-overview.component.html',
  styleUrls: ['./private-general-ticket-overview.component.scss']
})
export class PrivateGeneralTicketOverviewComponent implements OnInit {

  @Input() ticket?: AppTicket;

  fonts = { faTicket, faEllipsisV }

  routes = ApplicationRoutes.generateRoutes();

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {}

  viewTicket(): void {
    if (this.router.url === '/private/finance-tickets')
    {
      this.router.navigate([`/${this.routes.privateRoute.Single_finance_tickets(this.ticket?.base.id).$absolutePath}`])
    } else if (this.router.url === '/private/admissions')
    {
      this.router.navigate([`/${this.routes.privateRoute.single_admission(this.ticket?.base.id).$absolutePath}`])
    } else {
      this.router.navigate([`/${this.routes.privateRoute.single_ticket(this.ticket?.base.id).$absolutePath}`])
    }
  }

  getFirstAdmission(): string | undefined {
    return this.ticket?.ticketInventories[0]?.inventory.name;
  }
}
