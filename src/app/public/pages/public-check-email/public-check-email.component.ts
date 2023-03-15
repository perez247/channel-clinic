import { Component, OnInit } from '@angular/core';
import { faEye, faEyeSlash, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { ApplicationRoutes } from 'src/app/shared/core/routes/app-routes';

@Component({
  selector: 'app-public-check-email',
  templateUrl: './public-check-email.component.html',
  styleUrls: ['./public-check-email.component.scss']
})
export class PublicCheckEmailComponent implements OnInit {
  
  fonts = { faEye, faEyeSlash, faChevronLeft }
  appRoutes = ApplicationRoutes.generateRoutes();

  constructor() { }

  ngOnInit(): void {
  }

}
