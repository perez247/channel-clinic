import { Component, OnInit } from '@angular/core';
import { PrivateLabInventoryItemComponent } from '../private-lab-inventory-item/private-lab-inventory-item.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-private-surgery-inventory-item',
  templateUrl: './private-surgery-inventory-item.component.html',
  styleUrls: ['./private-surgery-inventory-item.component.scss']
})
export class PrivateSurgeryInventoryItemComponent extends PrivateLabInventoryItemComponent {

  constructor(
  ) {
    super();
  }

}

