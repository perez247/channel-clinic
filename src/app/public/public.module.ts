import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PublicAuthComponent } from './pages/public-auth/public-auth.component';
import { PublicRoutingModule } from './public-routing.module';
import { PublicLayoutContentComponent } from './layout/public-layout-content/public-layout-content.component';
import { PublicSignupWithEmailComponent } from './pages/public-signup-with-email/public-signup-with-email.component';
import { PublicConfirmEmailComponent } from './pages/public-confirm-email/public-confirm-email.component';
import { PublicForgotPasswordComponent } from './pages/public-forgot-password/public-forgot-password.component';
import { PublicCheckEmailComponent } from './pages/public-check-email/public-check-email.component';



@NgModule({
  declarations: [
    PublicAuthComponent,
    PublicLayoutContentComponent,
    PublicSignupWithEmailComponent,
    PublicConfirmEmailComponent,
    PublicForgotPasswordComponent,
    PublicCheckEmailComponent
  ],
  imports: [
    PublicRoutingModule,
    SharedModule
  ]
})
export class PublicModule { }
