import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { FEATURE_KEY_USER, userReducer } from './user.reducer';
import { UserService } from './user.service';

@NgModule({
  imports: [StoreModule.forFeature(FEATURE_KEY_USER, userReducer)],
  providers: [UserService],
})
export class UserModule {}
