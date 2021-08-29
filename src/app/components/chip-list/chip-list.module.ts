import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipListComponent } from './chip-list.component';
import { ChipComponent } from './chip/chip.component';
import { MatRippleModule } from '@angular/material/core';
import { DragScrollDirectivesModule } from '@douglas-serena/ng-utils';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatRippleModule,
    DragScrollDirectivesModule,
  ],
  declarations: [ChipListComponent, ChipComponent],
  exports: [ChipListComponent, ChipComponent],
})
export class ChipListModule {}
