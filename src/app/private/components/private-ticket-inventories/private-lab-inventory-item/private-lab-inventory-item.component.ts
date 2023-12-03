import { Component, Input } from '@angular/core';
import { PrivateInventoryItemComponent } from '../private-inventory-item.component';
import { AppTicketTypes } from 'src/app/shared/core/models/app-ticket';

@Component({
  selector: 'app-private-lab-inventory-item',
  templateUrl: './private-lab-inventory-item.component.html',
  styleUrls: ['./private-lab-inventory-item.component.scss']
})
export class PrivateLabInventoryItemComponent extends PrivateInventoryItemComponent {

  @Input() isAdmission = false;

  @Input() isAdmissionExecution = false;

  types = AppTicketTypes;

  constructor(
  ) {
    super();
  }

}
