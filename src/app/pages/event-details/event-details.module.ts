import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDetailsComponent } from './event-details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SwiperModule } from 'swiper/angular';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { PipesModule } from '@douglas-serena/ng-utils';

@NgModule({
  imports: [
    PipesModule,
    SwiperModule,
    CommonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatDialogModule,
    MatButtonModule,
    MatDividerModule,
  ],
  declarations: [EventDetailsComponent],
  exports: [EventDetailsComponent],
})
export class EventDetailsModule {}
