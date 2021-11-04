import { createReducer, on } from '@ngrx/store';
import {
  categorySelect,
  categoryStart,
  categoryUnselect,
} from './category.actions';
import { ICategory } from './interfaces/category.interface';

export const INICIAL_STATE_CATEGORY: ICategory[] = [];

export const FEATURE_KEY_CATEGORY = 'category';

export const categoryReducer = createReducer(
  INICIAL_STATE_CATEGORY,
  on(categoryStart, (state, action) => {
    return action.categories;
  }),
  on(categorySelect, (state, action) => {
    action.category.select = true;
    return state.concat([]);
  }),
  on(categoryUnselect, (state, action) => {
    action.category.select = false;
    return state.concat([]);
  })
);
