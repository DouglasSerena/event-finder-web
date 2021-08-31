import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IIcon } from '@douglas-serena/ng-inputs-material/lib/types/interfaces/confing.interface';
import { dialogConfig, ScreenPointsService } from '@douglas-serena/ng-utils';
import {
  debounce,
  handleTry,
  isFill,
  stackCallback,
} from '@douglas-serena/utils';
import { ICategory } from 'src/app/interfaces/category.interface';
import { IEvent } from 'src/app/interfaces/event.interface';
import { CategoryService } from 'src/app/services/category.service';
import { EventService } from 'src/app/services/event.service';
import { MapsService } from '../map-event/maps.service';
import { MenuSearchMobileComponent } from './menu-search-mobile/menu-search-mobile.component';

@Component({
  selector: 'ef-menu-search',
  templateUrl: './menu-search.component.html',
  styleUrls: ['./menu-search.component.scss'],
})
export class MenuSearchComponent implements OnInit {
  categories: ICategory[] = [];
  events: IEvent[] = [];
  debounce = debounce();

  inputSearch = '';

  get isMobile() {
    return this.screenPointsService.isMobile;
  }

  constructor(
    private mapService: MapsService,
    private dialogService: MatDialog,
    private eventService: EventService,
    private categoryService: CategoryService,
    private screenPointsService: ScreenPointsService,
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

  onOptionSelect(event: IEvent) {
    this.moveToEventMap(event);
    stackCallback(() => {
      this.inputSearch = `${event.name}`;
    });
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

  moveToEventMap(event: IEvent) {
    this.mapService.moveToMap([event.latitude, event.longitude], { zoom: 17 });
  }

  openDialogUser(ref: IIcon, input?: HTMLInputElement, event?: Event) {
    event?.stopPropagation();
  }

  openDialogMobile() {
    if (this.isMobile) {
      const dialogRef = this.dialogService.open(
        MenuSearchMobileComponent,
        dialogConfig('mobile'),
      );
      dialogRef.afterClosed().subscribe((res) => {
        if (res) {
          this.moveToEventMap(res);
          this.inputSearch = `${res.name}`;
        }
      });
    }
  }
}
