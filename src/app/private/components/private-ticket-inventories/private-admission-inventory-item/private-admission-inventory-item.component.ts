import { Component, OnInit } from '@angular/core';
import { PrivateLabInventoryItemComponent } from '../private-lab-inventory-item/private-lab-inventory-item.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-private-admission-inventory-item',
  templateUrl: './private-admission-inventory-item.component.html',
  styleUrls: ['./private-admission-inventory-item.component.scss']
})
export class PrivateAdmissionInventoryItemComponent extends PrivateLabInventoryItemComponent {

  constructor(
  ) {
    super();
  }
}
