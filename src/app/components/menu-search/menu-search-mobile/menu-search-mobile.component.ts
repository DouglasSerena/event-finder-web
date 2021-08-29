import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { debounce, handleTry, isFill } from '@douglas-serena/utils';
import { ICategory } from 'src/app/interfaces/category.interface';
import { IEvent } from 'src/app/interfaces/event.interface';
import { CategoryService } from 'src/app/services/category.service';
import { EventService } from 'src/app/services/event.service';

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
    private categoryService: CategoryService,
    private dialogRef: MatDialogRef<MenuSearchMobileComponent>,
  ) {}

  async ngOnInit() {
    await this.getCategory();
  }

  async getCategory() {
    const [data, error] = await handleTry(this.categoryService.get());
    if (!error) {
      this.categories = data.data;
    }
  }

  search(value: string) {
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
