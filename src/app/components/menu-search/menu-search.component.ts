import { Location } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { IIcon } from '@douglas-serena/ng-inputs-material';
import {
  AuthJwtService,
  dialogConfig,
  ScreenPointsService,
} from '@douglas-serena/ng-utils';
import { debounce, handleTry } from '@douglas-serena/utils';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/interfaces/category.interface';
import { IEvent } from 'src/app/interfaces/event.interface';
import { CategoryService } from 'src/app/services/category.service';
import { EventService } from 'src/app/services/event.service';
import { IUser } from 'src/app/stores/user/interfaces/user.interface';
import { UserService } from 'src/app/stores/user/user.service';
import { DialogAuthComponent } from '../dialog/dialog-auth/dialog-auth.component';
import { DialogUserComponent } from '../dialog/dialog-user/dialog-user.component';
import { MapsService } from '../map-event/maps.service';
import { MenuSearchMobileComponent } from './menu-search-mobile/menu-search-mobile.component';

@Component({
  selector: 'ef-menu-search',
  templateUrl: './menu-search.component.html',
  styleUrls: ['./menu-search.component.scss'],
})
export class MenuSearchComponent implements OnInit, AfterContentInit {
  public categories: ICategory[] = [];
  public events: IEvent[] = [];
  public loading = false;
  public debounce = debounce(500);

  public inputSearch = '';
  public user$: Observable<IUser>;

  public get isMobile() {
    return this.screenPointsService.isMobile;
  }

  constructor(
    private location: Location,
    private userService: UserService,
    private mapService: MapsService,
    private dialogService: MatDialog,
    private eventService: EventService,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private changeDetectorRef: ChangeDetectorRef,
    private screenPointsService: ScreenPointsService
  ) {
    this.user$ = userService.user$;
  }

  public async ngOnInit() {
    const authentication =
      this.activatedRoute.snapshot.queryParams.authentication === 'true';

    if (authentication) {
      this.openDialogUser();
      this.location.replaceState(location.pathname);
    }

    await this.getCategory();
  }

  public ngAfterContentInit() {
    this.changeDetectorRef.detectChanges();
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

  public openDialogUser(_?: any, __?: any, event?: Event) {
    event?.stopPropagation();

    if (!this.userService.logged) {
      return this.openDialogAuth();
    }

    this.dialogService.open(DialogUserComponent, {
      panelClass: 'dialog-user-menu',
    });
  }

  public openDialogAuth() {
    const dialogRef = this.dialogService.open(DialogAuthComponent, {
      maxWidth: 300,
    });
    // dialogRef.afterClosed().subscribe((res) => {
    // });
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
