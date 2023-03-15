import { Component, OnInit } from '@angular/core';
import { faEllipsisV, faHamburger, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { EventBusActions, EventBusData } from 'src/app/shared/services/common/event-bus/event-bus-action';
import { EventBusService } from 'src/app/shared/services/common/event-bus/event-bus.service';

@Component({
  selector: 'app-private-navbar',
  templateUrl: './private-navbar.component.html',
  styleUrls: ['./private-navbar.component.scss']
})
export class PrivateNavbarComponent extends SharedUtilityComponent implements OnInit {

  fonts = { faUserAlt, faEllipsisV, faHamburger, }

  menuOpened = true;
  disableMenu = false;

  constructor(
    private eventBus: EventBusService
  ) {
    super();
  }

  override ngOnInit(): void {
    this.listenForChanges();
  }

  toogleMenu(): void {
    this.disableMenu = true;
    this.eventBus.emit({ key: EventBusActions.state.menu, value: !this.menuOpened } as EventBusData<boolean>);
    setTimeout(() => {
      this.disableMenu = false
    }, 1000);
  }

  listenForChanges(): void {
    this.eventBus.on(EventBusActions.state.menu, (state: boolean) => {
      this.menuOpened = state;
    })
  }

}
