import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginationContext } from '../../core/models/pagination';

@Component({
  selector: 'app-shared-pagination-template',
  templateUrl: './shared-pagination-template.component.html',
  styleUrls: ['./shared-pagination-template.component.scss']
})
export class SharedPaginationTemplateComponent implements OnInit {

  @Input() pagination: PaginationContext<any, any> = new PaginationContext();
  // @Input() pageChangedFunction?: (e: number) => void;

  @Output() pageChanged = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  pageHasChanged(newPage: number): void {
    // if (this.pageChangedFunction) {
    //   this.pageChangedFunction(newPage);
    // }
    this.pageChanged.emit(newPage);
  }


}
