import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'landing',
  },
  {
    path: 'landing',
    loadChildren: () =>
      import('./pages/landing/landing.module').then(
        (landing) => landing.LandingModule
      ),
  },
  {
    path: 'auth/confirm',
    loadChildren: () =>
      import('./pages/auth/auth-confirm/auth-confirm.module').then(
        (authConfirm) => authConfirm.AuthConfirmModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRouting {}
