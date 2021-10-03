import { createAction, props } from '@ngrx/store';
import { IUser } from './interfaces/user.interface';

export const userSignIn = createAction(
  '[USER] sign in',
  props<{ user: IUser }>()
);
export const userLogout = createAction('[USER] logout');
