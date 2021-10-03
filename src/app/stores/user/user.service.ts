import { Injectable } from '@angular/core';
import { AuthJwtService } from '@douglas-serena/ng-utils';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUser } from './interfaces/user.interface';
import { userSignIn, userLogout } from './user.actions';
import { FEATURE_KEY_USER } from './user.reducer';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user$: Observable<IUser>;

  get logged(): boolean {
    return this.authJwtService.logged;
  }

  constructor(
    private store: Store<{ [FEATURE_KEY_USER]: IUser }>,
    private authJwtService: AuthJwtService
  ) {
    this.user$ = store.select(FEATURE_KEY_USER);
    if (authJwtService.logged) {
      this.signIn(authJwtService.token);
    }
  }

  signIn(token: string) {
    this.authJwtService.token = token;
    const user = this.authJwtService.tokenDecode;
    this.store.dispatch(userSignIn({ user }));
  }
  logout() {
    this.authJwtService.logout();
    this.store.dispatch(userLogout());
  }
}
