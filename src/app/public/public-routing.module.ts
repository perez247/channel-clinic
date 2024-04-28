import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationRoutes } from '../shared/core/routes/app-routes';
import { PublicLayoutContentComponent } from './layout/public-layout-content/public-layout-content.component';
import { PublicAuthComponent } from './pages/public-auth/public-auth.component';
import { PublicCheckEmailComponent } from './pages/public-check-email/public-check-email.component';
import { PublicConfirmEmailComponent } from './pages/public-confirm-email/public-confirm-email.component';
import { PublicForgotPasswordComponent } from './pages/public-forgot-password/public-forgot-password.component';
import { PublicSignupWithEmailComponent } from './pages/public-signup-with-email/public-signup-with-email.component';
import { RedirectAuthUsersGuard } from '../shared/guards/redirect-auth-users.guard';
import { PublicHomeComponent } from './pages/public-home/public-home.component';

const appRoutes = ApplicationRoutes.generateRoutes();
const routes: Routes = [
  {
    path: '',
    redirectTo: `${appRoutes.publicRoute.home().$name}`,
    pathMatch: 'full'
  },
  // {
  //   path: `${appRoutes.publicRoute.home().$name}`,
  //   component: PublicHomeComponent
  // },
  {
    path: '',
    component: PublicLayoutContentComponent,
    children: [
      {
        path: `${appRoutes.publicRoute.home().$name}`,
        component: PublicAuthComponent,
        canActivate: [RedirectAuthUsersGuard]
      },
      {
        path: `${appRoutes.publicRoute.signUpWithEmail().$name}`,
        component: PublicSignupWithEmailComponent
      },
      {
        path: `${appRoutes.publicRoute.forgotPassword().$name}`,
        component: PublicForgotPasswordComponent
      },
      {
        path: `${appRoutes.publicRoute.forgotPassword().$name}`,
        component: PublicForgotPasswordComponent
      },
      {
        path: `${appRoutes.publicRoute.emailStatus().$name}`,
        component: PublicCheckEmailComponent
      },
      {
        path: `${appRoutes.publicRoute.emailStatus().$name}`,
        component: PublicCheckEmailComponent
      },
    ]
  },
  // {
  //   path: 'private',
  //   loadChildren: () => import('./private/private.module').then( m => m.PrivatePageModule),
  //   canActivate: [AuthGuard]
  // }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
