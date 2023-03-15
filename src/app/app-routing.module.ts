import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationRoutes } from './shared/core/routes/app-routes';
import { PrivateUserOnlyGuard } from './shared/guards/private-user-only.guard';

const appRoutes = ApplicationRoutes.generateRoutes();

const routes: Routes = [
  {
    path: '',
    redirectTo: `${appRoutes.publicRoute.$name}`,
    pathMatch: 'full'
  },
  {
    path: `${appRoutes.publicRoute.$name}`,
    loadChildren: () => import('./public/public.module').then( m => m.PublicModule),
    // canActivate: [CheckLoginGuard]
  },
  {
    path: `${appRoutes.privateRoute.$name}`,
    loadChildren: () => import('./private/private.module').then( m => m.PrivateModule),
    canActivate: [PrivateUserOnlyGuard]
  },
  // {
  //   path: 'private',
  //   loadChildren: () => import('./private/private.module').then( m => m.PrivatePageModule),
  //   canActivate: [AuthGuard]
  // }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
