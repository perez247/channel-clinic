import { AppUser } from 'src/app/shared/core/models/app-user';
import { EventBusService } from './../../../shared/services/common/event-bus/event-bus.service';
import { Component, OnInit } from '@angular/core';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { ApplicationRoutes } from 'src/app/shared/core/routes/app-routes';

@Component({
  selector: 'app-private-welcome-user',
  templateUrl: './private-welcome-user.component.html',
  styleUrls: ['./private-welcome-user.component.scss']
})
export class PrivateWelcomeUserComponent implements OnInit {

  fonts = { faAngleDoubleRight }
  appRoutes = ApplicationRoutes.generateRoutes();

  currentUser?: AppUser;

  constructor(
    private eventBus: EventBusService,
  ) { }

  ngOnInit(): void {
    this.currentUser = this.eventBus.getState().user.value ?? {} as AppUser;
  }

}
