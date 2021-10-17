import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container.component';
import { RouterModule } from '@angular/router';
import { MapEventModule } from '../components/map-event/map-event.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MenuSearchModule } from '../components/menu-search/menu-search.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MapEventModule,
    MatDialogModule,
    MenuSearchModule,
  ],
  declarations: [ContainerComponent],
})
export class ContainerModule {}
