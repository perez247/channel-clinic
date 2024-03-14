import { AppUser } from 'src/app/shared/core/models/app-user';
import { EventBusService } from './../../../shared/services/common/event-bus/event-bus.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { ApplicationRoutes } from 'src/app/shared/core/routes/app-routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-private-welcome-user',
  templateUrl: './private-welcome-user.component.html',
  styleUrls: ['./private-welcome-user.component.scss']
})
export class PrivateWelcomeUserComponent implements OnInit, OnDestroy {

  fonts = { faAngleDoubleRight }
  appRoutes = ApplicationRoutes.generateRoutes();

  currentUser?: AppUser;

  countDown = 10;

  interval: any;

  constructor(
    private eventBus: EventBusService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentUser = this.eventBus.getState().user.value ?? {} as AppUser;
    this.redirectAfter5Seconds();
  }

  redirectAfter5Seconds(): void {
    this.interval = setInterval(() => {
      this.countDown--;
      if (this.countDown <= 0) {
        clearInterval(this.interval);
        this.router.navigate(['/' + this.appRoutes.privateRoute.dashboard().$absolutePath]);
      }
    }, 1000);
  }

  ngOnDestroy(): void {
      clearInterval(this.interval);
  }
}
