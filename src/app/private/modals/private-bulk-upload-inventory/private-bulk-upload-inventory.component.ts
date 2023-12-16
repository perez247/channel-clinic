import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faTrashAlt, faPenAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize, lastValueFrom } from 'rxjs';
import { IFileStatus, UtilityHelpers } from 'src/app/shared/core/functions/utility-helpers';
import { AppInventoryItem, InventoryItemFilter } from 'src/app/shared/core/models/inventory';
import { PaginationContext } from 'src/app/shared/core/models/pagination';
import { InventoryService } from 'src/app/shared/services/api/inventory/inventory.service';
import { AppFileService } from 'src/app/shared/services/common/app-file/app-file.service';
import { CustomToastService } from 'src/app/shared/services/common/custom-toast/custom-toast.service';
import * as XLSX from "xlsx";
import { stringSimilarity } from "string-similarity-js";
import {distance, closest} from 'fastest-levenshtein';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { PrivateAddBulkIvnItemComponent } from '../private-add-bulk-ivn-item/private-add-bulk-ivn-item.component';

export class IBulkItem {
  foundId?: string;
  foundName?: string;
  foundPrice?: number;
  foundType?:string;
  name?: string;
  price?: number;
  type?: string;
  inventoryId?: string;
}

@Component({
  selector: 'app-private-bulk-upload-inventory',
  templateUrl: './private-bulk-upload-inventory.component.html',
  styleUrls: ['./private-bulk-upload-inventory.component.scss']
})
export class PrivateBulkUploadInventoryComponent extends SharedUtilityComponent implements OnInit {

  @Input() companyId: string = '';

  @Output() reload = new EventEmitter();

  imageChangedEvent?: any = null;
  rawFile: any;

  fileOnDisplay?: string;

  fonts = { faTrashAlt, faPenAlt }

  fileStatus?: IFileStatus;

  pagination = new PaginationContext<AppInventoryItem, InventoryItemFilter>();

  head: any[] = []
  body: any[] = []
  suggestions: any[] = [];
  display: IBulkItem[] = [];

  isBulkLoading = false;

  constructor(
    public activeModal: NgbActiveModal,
    private toast: CustomToastService,
    private fileService: AppFileService,
    private inventoryService: InventoryService,
    private modal: NgbModal
    ) {
    super();
  }

  override ngOnInit(): void {
  }

  async getTemplate(): Promise<void> {
    // const header = [{
    //   'Name': '', 'Type': '', 'Amount': ''
    // }];
    const header = await this.getSampleTariff();
    this.fileService.downloadAsCSV(header, 'bulktemplate.csv')
  }

  fileChangeEvent(evt: any) {
    this.head = this.body = this.suggestions = this.display = []
    this.isBulkLoading = true;
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length > 1) {
      this.toast.error('Multiple files are not allowed');
      return;
    }
    else {
      const reader: FileReader = new FileReader();
      reader.onload = async (e: any) => {
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        let data: string[][] = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
        // Print the Excel Data
        await this.readSpreadSheet(data);
        this.isBulkLoading = false;
      }

      reader.onerror = () => {
        this.toast.error('Failed to read file, kindly try again with a different file.');
        this.isBulkLoading = false;
      }
      reader.readAsBinaryString(target.files[0]);
    }
  }

  async readSpreadSheet(data: string[][]): Promise<void> {
    this.head = data[0];
    this.body = data.slice(1);

    if (!this.validateHead(this.head)) { return; }

    // console.log('head =>', this.head);
    // console.log('body =>', this.body.map(x => x[1]));
    const names = this.body.map(x => x[1]);
    if (names.length > 100) {
      this.toast.error('Only a maaximum of 100 entries per upload');
      return ;
    }

    this.suggestions = await this.getRelativeData(names);
    this.setDisplay();
  }

  validateHead(head: string[]): boolean {

    if (!head[1] || head[1].toLocaleLowerCase() !== 'name') {
      this.toast.error('The first column header should be name');
      return false;
     }

     if (!head[2] || head[2].toLocaleLowerCase() !== 'type') {
      this.toast.error('The second column header should be type');
      return false;
     }

     if (!head[3] || head[3].toLocaleLowerCase() !== 'amount') {
      this.toast.error('The third column header should be amount');
      return false;
     }

     return true
  }

  private async getSampleTariff(): Promise<any[]>
  {

    this.pagination.initialize();
    this.pagination.request?.setFilter({ companyId: this.companyId });
    this.pagination.request?.setPagination({ pageSize: 100 });

    const result = await lastValueFrom(this.inventoryService.getInventoryItems(this.pagination.request));

    const data = result.result || [];

    const header = data.map(x =>  {
      return { name: x.inventory?.name, type: x.inventory?.appInventoryType, amount: x.pricePerItem }
     })

    return header;
  }

  private async getRelativeData(InventoryItemNames: string[]): Promise<any[]>
  {
    this.pagination.initialize();
    this.pagination.request?.setFilter({ companyId: this.companyId, InventoryItemNames });
    this.pagination.request?.setPagination({ pageSize: 100 });

    const result = await lastValueFrom(this.inventoryService.searchBulkUpload(this.pagination.request?.getFilter()));

    const data = result.result || [];

    const header = data.map(x =>  {
      return { name: x.inventory?.name, type: x.inventory?.appInventoryType, amount: x.pricePerItem, id: x.base?.id, inventoryId: x.inventory?.base?.id }
     })

    return header;
  }

  setDisplay(): void {
    this.body.forEach(x => {
      const data = {
        name: x[1],
        type: x[2],
        price: x[3],
        foundName: undefined,
        foundType: undefined,
        foundPrice: undefined,
        foundId: undefined
      } as IBulkItem;

      const close = closest(x[1].toLocaleLowerCase(), this.suggestions.map(a => a.name.toLocaleLowerCase()));
      const amount = stringSimilarity(x[1].toLocaleLowerCase(), close.toLocaleLowerCase())

      // console.log(x[1], close, amount);

      if (amount >= 0.7) {
        const item = this.suggestions.find(b => b.name.toLocaleLowerCase() == close.toLocaleLowerCase());

        if (item) {
          this.suggestions = this.suggestions.filter(b => b.name != close);

          data.foundName = item.name;
          data.foundPrice = item.amount;
          data.foundType = item.type;
          data.foundId = item.id;
          data.inventoryId = item.inventoryId
        }

      }

      this.display.push(data);
    })
  }

  removeSuggestion(index: number): void {
    const data = this.display[index];
    data.foundName = undefined;
    data.foundPrice = undefined;
    data.foundType = undefined;
    data.foundId = undefined;
  }

  removeItemFromDisplay(index: number): void {
    this.display.splice(index, 1);
  }

  updateItemImported(seletectItem: IBulkItem, index: number): void {
    const modelRef = this.modal.open(PrivateAddBulkIvnItemComponent, { size: 'lg' });
    const component: PrivateAddBulkIvnItemComponent = modelRef.componentInstance;

    component.companyId = this.companyId;
    component.selectedBulkItem = seletectItem;
    component.index = index;

    const sub = component.itemSelected.subscribe({
      next: (item: IBulkItem) => {
        this.display[index] = item;
      }
    });

    this.subscriptions.push(sub);
  }

  uploadItems(): void {
    this.isLoading = true;
    const sub = this.inventoryService.bulkUpload({ companyId: this.companyId, items: this.display })
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: () => {
          this.toast.success('Added entries successfully');
          this.activeModal.close();
          this.reload.emit();
        },
        error: (error) => {
          throw error;
        }
      })
    this.subscriptions.push(sub);
  }
}
