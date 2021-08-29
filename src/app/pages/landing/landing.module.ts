import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { LandingRoutingModule } from './landing.routing';
import { RouterModule } from '@angular/router';
import { MapEventModule } from 'src/app/components/map-event/map-event.module';
import { MenuSearchModule } from 'src/app/components/menu-search/menu-search.module';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MapEventModule,
    MenuSearchModule,
    LandingRoutingModule,
  ],
  declarations: [LandingComponent],
})
export class LandingModule {}
