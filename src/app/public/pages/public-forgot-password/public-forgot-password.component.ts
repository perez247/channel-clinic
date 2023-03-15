import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ApplicationRoutes } from 'src/app/shared/core/routes/app-routes';

@Component({
  selector: 'app-public-forgot-password',
  templateUrl: './public-forgot-password.component.html',
  styleUrls: ['./public-forgot-password.component.scss']
})
export class PublicForgotPasswordComponent implements OnInit {
  
  fonts = { faEye, faEyeSlash, faChevronLeft }
  appRoutes = ApplicationRoutes.generateRoutes();

  constructor() { }

  ngOnInit(): void {
  }

}
