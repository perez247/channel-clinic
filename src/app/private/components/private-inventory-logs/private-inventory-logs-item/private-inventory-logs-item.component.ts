import { Component, Input, OnInit } from '@angular/core';
import { ActivityLog } from 'src/app/shared/core/models/activity-log';

@Component({
  selector: 'app-private-inventory-logs-item',
  templateUrl: './private-inventory-logs-item.component.html',
  styleUrls: ['./private-inventory-logs-item.component.scss']
})
export class PrivateInventoryLogsItemComponent implements OnInit {

  @Input() log?: ActivityLog;

  adding = false;

  constructor() { }

  ngOnInit(): void {
    this.adding = this.log?.actionDescription?.includes('adding') ? true : false;
  }



}
