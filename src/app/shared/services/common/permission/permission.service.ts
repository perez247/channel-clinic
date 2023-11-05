import { Injectable } from '@angular/core';
import { EventBusService } from '../event-bus/event-bus.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(
    private eventBus: EventBusService
  ) { }

}
