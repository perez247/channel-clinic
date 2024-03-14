import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBulkItem } from '../private-bulk-upload-inventory/private-bulk-upload-inventory.component';
import { AppInventoryItem } from 'src/app/shared/core/models/inventory';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-private-add-bulk-ivn-item',
  templateUrl: './private-add-bulk-ivn-item.component.html',
  styleUrls: ['./private-add-bulk-ivn-item.component.scss']
})
export class PrivateAddBulkIvnItemComponent implements OnInit {

  @Input() selectedBulkItem?: IBulkItem;
  @Input() index: number = 0;
  @Input() companyId: string = '';

  @Output() itemSelected = new EventEmitter<IBulkItem>();

  searchWord = '';

  selectedItem?: AppInventoryItem;
  itemToUse: IBulkItem = {} as IBulkItem;

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    Object.assign(this.itemToUse, this.selectedBulkItem);
  }

  clearName(): void {
    this.itemToUse!.foundId = undefined;
    this.itemToUse!.foundName = undefined;
    this.itemToUse!.foundPrice = undefined;
    this.itemToUse!.foundType = undefined;
  }

  selected(appInventoryItem: AppInventoryItem): void {
    this.itemToUse!.foundId = appInventoryItem.base?.id || '';
    this.itemToUse!.foundName = appInventoryItem.inventory?.name || '';
    this.itemToUse!.foundType = appInventoryItem.inventory?.appInventoryType || '';
    this.itemToUse!.foundPrice = appInventoryItem.pricePerItem || 0;
    this.searchWord = this.itemToUse!.foundName;
  }

  set(): void {
    this.itemSelected.emit(this.itemToUse);
    this.activeModal.close();
  }
}
