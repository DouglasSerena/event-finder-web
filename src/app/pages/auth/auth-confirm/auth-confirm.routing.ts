import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthConfirmComponent } from './auth-confirm.component';

const routes: Routes = [
  { path: '', component: AuthConfirmComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthConfirmRouting {}
