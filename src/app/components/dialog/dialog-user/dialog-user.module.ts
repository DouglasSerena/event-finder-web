import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogUserComponent } from './dialog-user.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    MatRippleModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
  ],
  declarations: [DialogUserComponent],
})
export class DialogUserModule {}
