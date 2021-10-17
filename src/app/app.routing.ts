import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './container/container.component';

const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: 'event',
        loadChildren: () =>
          import('./pages/event/event.module').then(
            (event) => event.EventModule
          ),
      },
    ],
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
