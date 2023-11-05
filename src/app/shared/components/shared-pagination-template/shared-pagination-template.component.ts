import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginationContext } from '../../core/models/pagination';

@Component({
  selector: 'app-shared-pagination-template',
  templateUrl: './shared-pagination-template.component.html',
  styleUrls: ['./shared-pagination-template.component.scss']
})
export class SharedPaginationTemplateComponent implements OnInit {

  @Input() pagination: PaginationContext<any, any> = new PaginationContext();

  @Output() pageChanged = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  pageHasChanged(newPage: number): void {
    this.pageChanged.emit(newPage);
  }
}
