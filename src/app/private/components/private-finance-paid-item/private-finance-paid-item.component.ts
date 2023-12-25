import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-private-finance-paid-item',
  templateUrl: './private-finance-paid-item.component.html',
  styleUrls: ['./private-finance-paid-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivateFinancePaidItemComponent implements OnInit {

  @Input() arr: any[] = [];

  constructor(
  ) { }

  ngOnInit(): void {
  }

  greatings(): void {
    console.log('item...');
  }

}
