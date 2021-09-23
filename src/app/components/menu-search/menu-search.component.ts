import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IIcon } from '@douglas-serena/ng-inputs-material';
import { dialogConfig, ScreenPointsService } from '@douglas-serena/ng-utils';
import { debounce, handleTry } from '@douglas-serena/utils';
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
  public categories: ICategory[] = [];
  public events: IEvent[] = [];
  public loading = false;
  public debounce = debounce(500);

  public inputSearch = '';

  public get isMobile() {
    return this.screenPointsService.isMobile;
  }

  constructor(
    private mapService: MapsService,
    private dialogService: MatDialog,
    private eventService: EventService,
    private categoryService: CategoryService,
    private screenPointsService: ScreenPointsService
  ) {}

  public async ngOnInit() {
    await this.getCategory();
  }

  public async getCategory() {
    const [data, error] = await handleTry(this.categoryService.get());
    if (!error) {
      this.categories = data.data;
    }
  }

  public optionSelect(event: IEvent) {
    this.moveToEventMap(event);
  }

  public search(value: string) {
    this.loading = true;
    this.debounce.run(async () => {
      if (value.length) {
        const [data, error] = await handleTry(this.eventService.search(value));
        if (!error) {
          this.events = data.data;
        }
      } else {
        this.events = [];
      }
      this.loading = false;
    });
  }

  public moveToEventMap(event: IEvent) {
    this.mapService.moveToMap([event.latitude, event.longitude], { zoom: 17 });
  }

  public openDialogUser(ref: IIcon, input?: HTMLInputElement, event?: Event) {
    event?.stopPropagation();
  }

  public openDialogMobile() {
    if (this.isMobile) {
      const dialogRef = this.dialogService.open(
        MenuSearchMobileComponent,
        dialogConfig('mobile')
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
