import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipListComponent } from './chip-list.component';
import { ChipComponent } from './chip/chip.component';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [CommonModule, MatIconModule, MatButtonModule, MatRippleModule],
  declarations: [ChipListComponent, ChipComponent],
  exports: [ChipListComponent, ChipComponent],
})
export class ChipListModule {}
