import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shared-utility',
  templateUrl: './shared-utility.component.html',
  styleUrls: ['./shared-utility.component.scss']
})
export class SharedUtilityComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  isLoading = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

}
