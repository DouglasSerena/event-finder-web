import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialogGuard } from '@douglas-serena/ng-utils';
import { LandingComponent } from './landing.component';

const routes: Routes = [
  { path: '', canDeactivate: [DialogGuard], component: LandingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingRoutingModule {}
