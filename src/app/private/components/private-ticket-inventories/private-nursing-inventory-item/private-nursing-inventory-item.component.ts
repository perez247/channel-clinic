import { Component, Input, OnInit } from '@angular/core';
import { PrivateInventoryItemComponent } from '../private-inventory-item.component';

@Component({
  selector: 'app-private-nursing-inventory-item',
  templateUrl: './private-nursing-inventory-item.component.html',
  styleUrls: ['./private-nursing-inventory-item.component.scss']
})
export class PrivateNursingInventoryItemComponent extends PrivateInventoryItemComponent {

  @Input() isAdmission = false;

  @Input() isAdmissionExecution = false;
  
  constructor() { 
    super()
  }

}
