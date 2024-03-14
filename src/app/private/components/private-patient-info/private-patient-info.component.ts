import { Component, Input, OnInit } from '@angular/core';
import { AppUser, Company } from 'src/app/shared/core/models/app-user';
import { ApplicationRoutes } from 'src/app/shared/core/routes/app-routes';

@Component({
  selector: 'app-private-patient-info',
  templateUrl: './private-patient-info.component.html',
  styleUrls: ['./private-patient-info.component.scss']
})
export class PrivatePatientInfoComponent implements OnInit {

  @Input() user?: AppUser;
  @Input() company?: Company;

  routes = ApplicationRoutes.generateRoutes();

  constructor() { }

  ngOnInit(): void {
  }

}
