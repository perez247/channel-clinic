import { Component, OnInit } from '@angular/core';
import { faEye, faEyeSlash, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { ApplicationRoutes } from 'src/app/shared/core/routes/app-routes';

@Component({
  selector: 'app-public-signup-with-email',
  templateUrl: './public-signup-with-email.component.html',
  styleUrls: ['./public-signup-with-email.component.scss']
})
export class PublicSignupWithEmailComponent implements OnInit {
  
  fonts = { faEye, faEyeSlash, faChevronLeft }
  appRoutes = ApplicationRoutes.generateRoutes();

  viewPassword = false;

  constructor() { }

  ngOnInit(): void {
  }

}
