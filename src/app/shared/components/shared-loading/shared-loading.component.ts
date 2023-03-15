import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shared-loading',
  templateUrl: './shared-loading.component.html',
  styleUrls: ['./shared-loading.component.scss']
})
export class SharedLoadingComponent implements OnInit {

  @Input() size = "sm";

  constructor() { }

  ngOnInit(): void {
  }

}
