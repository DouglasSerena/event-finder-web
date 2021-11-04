import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { categoryReducer, FEATURE_KEY_CATEGORY } from './category.reducer';
import { CategoryService } from './category.service';

@NgModule({
  imports: [StoreModule.forFeature(FEATURE_KEY_CATEGORY, categoryReducer)],
  providers: [CategoryService],
})
export class CategoryModule {} 
