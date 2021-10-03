import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthConfirmComponent } from './auth-confirm.component';
import { AuthConfirmRouting } from './auth-confirm.routing';

@NgModule({
  imports: [CommonModule, AuthConfirmRouting],
  declarations: [AuthConfirmComponent],
})
export class AuthConfirmModule {}
