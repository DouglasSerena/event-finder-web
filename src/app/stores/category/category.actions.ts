import { createAction, props } from '@ngrx/store';
import { ICategory } from './interfaces/category.interface';

export const categoryStart = createAction(
  '[CATEGORY] start',
  props<{ categories: ICategory[] }>()
);
export const categorySelect = createAction(
  '[CATEGORY] select',
  props<{ category: ICategory }>()
);
export const categoryUnselect = createAction(
  '[CATEGORY] unselect',
  props<{ category: ICategory }>()
);
