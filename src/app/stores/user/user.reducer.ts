import { createReducer, on } from '@ngrx/store';
import { IUser } from './interfaces/user.interface';
import { userSignIn, userLogout } from './user.actions';

export const INICIAL_STATE_USER: IUser = {
  id: '',
  email: 'anonimo',
  username: 'anonimo',
  avatar: '/assets/images/user-default.png',
};

export const FEATURE_KEY_USER = 'user';

export const userReducer = createReducer(
  INICIAL_STATE_USER,
  on(userSignIn, (state, action) => {
    return { ...state, ...action.user };
  }),
  on(userLogout, () => {
    return INICIAL_STATE_USER;
  })
);
