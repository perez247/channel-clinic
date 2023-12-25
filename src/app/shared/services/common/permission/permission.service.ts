import { Injectable } from '@angular/core';
import { EventBusService } from '../event-bus/event-bus.service';
import { AppUser } from 'src/app/shared/core/models/app-user';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  
  constructor(
    private eventBus: EventBusService
  ) { }

  hasRoles(selectedRoles: string[]): boolean {
    const roles = this.getUserRoles();
    if (selectedRoles.length <= 0) {
      return false;
    }

    let hasRole: boolean[] = [];

    roles.forEach(x => {
      var role = selectedRoles?.find(a => a === x);
      if (role) {
        hasRole.push(true);
      } else {
        hasRole.push(false);
      }
    });

    return hasRole.some(Boolean);
  }

  getUserRoles(): string[]
  {
    const currentUser = this.eventBus.getState().user.value;
    const roles = currentUser?.userRoles || [];

    const id = currentUser?.base?.id || ''

    const hasId = roles.find(x => x === id);

    if (!hasId) {
      roles.push(id);
    }

    return roles;
  }
}
