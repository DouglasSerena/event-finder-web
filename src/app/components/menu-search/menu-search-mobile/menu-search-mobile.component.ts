import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { debounce, handleTry, isFill } from '@douglas-serena/utils';
import { ICategory } from 'src/app/stores/category/interfaces/category.interface';
import { IEvent } from 'src/app/interfaces/event.interface';
import { CategoryService } from 'src/app/stores/category/category.service';
import { EventService } from 'src/app/services/event.service';
import { Store } from '@ngrx/store';
import { FEATURE_KEY_CATEGORY } from 'src/app/stores/category/category.reducer';
import {
  categorySelect,
  categoryUnselect,
} from 'src/app/stores/category/category.actions';

@Component({
  selector: 'ef-menu-search-mobile',
  templateUrl: './menu-search-mobile.component.html',
  styleUrls: ['./menu-search-mobile.component.scss'],
})
export class MenuSearchMobileComponent implements OnInit {
  events: IEvent[] = [];
  debounce = debounce();
  categories: ICategory[] = [];

  constructor(
    private eventService: EventService,
    private store: Store<{ [FEATURE_KEY_CATEGORY]: ICategory[] }>
  ) {}

  async ngOnInit() {
    this.store.select('category').subscribe((categories) => {
      this.categories = categories;
    });
  }
  public onChangeCategory(category: ICategory) {
    if (category.select) {
      this.store.dispatch(categorySelect({ category }));
    } else {
      this.store.dispatch(categoryUnselect({ category }));
    }
  }

  public search(value: string) {
    this.debounce.run(async () => {
      if (isFill(value)) {
        const [data, error] = await handleTry(this.eventService.search(value));
        if (!error) {
          this.events = data.data;
        }
      }
    });
  }
}
