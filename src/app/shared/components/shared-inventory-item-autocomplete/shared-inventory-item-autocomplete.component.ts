import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { SharedUtilityComponent } from '../shared-utility/shared-utility.component';
import { AppInventory, AppInventoryItem, InventoryItemFilter } from '../../core/models/inventory';
import { Subject, debounceTime, distinctUntilChanged, finalize } from 'rxjs';
import { PaginationContext } from '../../core/models/pagination';
import { InventoryService } from '../../services/api/inventory/inventory.service';

@Component({
  selector: 'app-shared-inventory-item-autocomplete',
  templateUrl: './shared-inventory-item-autocomplete.component.html',
  styleUrls: ['./shared-inventory-item-autocomplete.component.scss']
})
export class SharedInventoryItemAutocompleteComponent  extends SharedUtilityComponent implements OnInit {

  @Input() searchWord?: string;
  @Input() filter: InventoryItemFilter = new InventoryItemFilter();

  private subject$ = new Subject<string>();

  pagination = new PaginationContext<AppInventoryItem, InventoryItemFilter>();

  disableSearch = false;

  @ViewChild('myDrop') title: any;
  @Output() selected = new EventEmitter<AppInventory>();


  constructor(
    private inventoryService: InventoryService
    ) {
    super();
  }

  override ngOnInit(): void {
    this.pagination.initialize();
    this.pagination.request?.setFilter(this.filter);
    this.checkForChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (this.disableSearch) {
      return;
    }

    const currentWord = changes['searchWord']['currentValue'];
    this.subject$.next(currentWord)
  }

  checkForChanges(): void {
    const sub = this.subject$
    .pipe(
      debounceTime(1000),
      distinctUntilChanged()
      )
    .subscribe({
      next: (data) => {
        if (!data) { return; }
        if (data.length <= 2) { return; }
        this.pagination.request?.setFilter({ appInventoryName: data });
        this.getInventoryByName();
      }
    });

    this.subscriptions.push(sub);
  }

  getInventoryByName(): void {
    this.pagination.elements = [];
    this.title.open();
    this.isLoading = true;
    const sub = this.inventoryService.getInventoryItems(this.pagination.request)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.pagination.setResponse(data, false);
          this.title.open();
        },
        error: (error) => {
          console.log(error);
        }
      });
    this.subscriptions.push(sub);
  }

  inventorySeletected(inventorySeletected: AppInventory): void {
    this.selected.emit(inventorySeletected);
    this.pagination.elements = [];

    this.disableSearch = true;
    setTimeout(() => {
      this.disableSearch = false;
    }, 1000);
  }
}
