import { EventBusService } from './../services/common/event-bus/event-bus.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApplicationRoutes } from '../core/routes/app-routes';

@Injectable({
  providedIn: 'root'
})
export class PrivateUserOnlyGuard implements CanActivate {

  appRoutes = ApplicationRoutes.generateRoutes();

  constructor(
    private eventBus: EventBusService,
    private router: Router
  )
  {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const jwt = this.eventBus.state.jwt.value;
      if (!jwt) {
        this.eventBus.clearState();
        this.router.navigate([this.appRoutes.publicRoute.signIn().$absolutePath], { queryParams: { returnUrl: state.url }});
        return true;
      }

      if (jwt?.exp < Date.now()/1000) {
        this.eventBus.clearState();
        this.router.navigate([this.appRoutes.publicRoute.signIn().$absolutePath], { queryParams: { returnUrl: state.url }});
        return true;
      }

      return true
  }

}
