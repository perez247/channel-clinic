import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faUserAlt, faEllipsisV, faHamburger } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-private-layout-full',
  templateUrl: './private-layout-full.component.html',
  styleUrls: ['./private-layout-full.component.scss']
})
export class PrivateLayoutFullComponent implements OnInit {

  fonts = { faUserAlt, faEllipsisV, faHamburger }

  openBar = true;

  constructor() { }

  ngOnInit(): void {
  }



}
