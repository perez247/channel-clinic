import { Component } from '@angular/core';
import { PrivateInventoryItemComponent } from '../private-inventory-item.component';

@Component({
  selector: 'app-private-lab-inventory-item',
  templateUrl: './private-lab-inventory-item.component.html',
  styleUrls: ['./private-lab-inventory-item.component.scss']
})
export class PrivateLabInventoryItemComponent extends PrivateInventoryItemComponent {

  constructor(
  ) {
    super();
  }

}
