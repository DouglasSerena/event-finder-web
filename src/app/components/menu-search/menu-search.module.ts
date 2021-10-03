import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuSearchComponent } from './menu-search.component';
import { AutocompleteModule } from '@douglas-serena/ng-inputs-material';
import { ChipListModule } from '../chip-list/chip-list.module';
import { MenuSearchMobileComponent } from './menu-search-mobile/menu-search-mobile.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { DialogAuthModule } from '../dialog/dialog-auth/dialog-auth.module';
import { DialogUserModule } from '../dialog/dialog-user/dialog-user.module';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    ChipListModule,
    MatDialogModule,
    MatButtonModule,
    MatDividerModule,
    DialogAuthModule,
    DialogUserModule,
    AutocompleteModule,
  ],
  declarations: [MenuSearchComponent, MenuSearchMobileComponent],
  exports: [MenuSearchComponent],
})
export class MenuSearchModule {}
