import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogAuthComponent } from './dialog-auth.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule],
  declarations: [DialogAuthComponent],
})
export class DialogAuthModule {}
