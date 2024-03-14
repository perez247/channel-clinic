import { Component, Input, OnInit } from '@angular/core';
import { AppUser, Staff } from 'src/app/shared/core/models/app-user';
import { ApplicationRoutes } from 'src/app/shared/core/routes/app-routes';

@Component({
  selector: 'app-private-staff-info',
  templateUrl: './private-staff-info.component.html',
  styleUrls: ['./private-staff-info.component.scss']
})
export class PrivateStaffInfoComponent implements OnInit {

  @Input() staff?: Staff;

  routes = ApplicationRoutes.generateRoutes();

  constructor() { }

  ngOnInit(): void {
  }

}
