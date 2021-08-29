import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MapEventComponent } from './map-event.component';
import { MapsService } from './maps.service';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule, MatSnackBarModule],
  declarations: [MapEventComponent],
  exports: [MapEventComponent],
  providers: [MapsService],
})
export class MapEventModule {}
