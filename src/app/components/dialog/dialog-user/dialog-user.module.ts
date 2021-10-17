import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogUserComponent } from './dialog-user.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { EventModule } from 'src/app/pages/event/event.module';

@NgModule({
  imports: [
    EventModule,
    CommonModule,
    RouterModule,
    MatIconModule,
    MatListModule,
    MatRippleModule,
    MatDialogModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
  ],
  declarations: [DialogUserComponent],
})
export class DialogUserModule {}
