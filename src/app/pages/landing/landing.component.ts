import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { dialogConfig, ScreenPointsService } from '@douglas-serena/ng-utils';
import { handleTry } from '@douglas-serena/utils';
import { IEvent } from 'src/app/interfaces/event.interface';
import { EventService } from 'src/app/services/event.service';
import { EventDetailsComponent } from '../event-details/event-details.component';

@Component({
  selector: 'ef-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  get isMobile() {
    return this.screenPointsService.isMobile;
  }

  constructor(
    private routerService: Router,
    private dialogService: MatDialog,
    private eventService: EventService,
    private activatedRoute: ActivatedRoute,
    private screenPointsService: ScreenPointsService
  ) {}

  async ngOnInit() {
    const query = this.activatedRoute.snapshot.queryParams;
    if (query?.event) {
      const [data] = await handleTry(this.eventService.getById(query.event));
      if (data) {
        this.openEventDetails(data.data);
      }
    }
  }

  openEventDetails(event: IEvent) {
    this.routerService.navigate([], { queryParams: { event: event._id } });
    const dialogRef = this.dialogService.open(
      EventDetailsComponent,
      dialogConfig<MatDialogConfig<any>>(this.isMobile ? 'mobile' : 'desktop', {
        panelClass: ['dialog-event', 'dialog-mobile'],
        maxWidth: '600px',
        data: event,
      })
    );

    dialogRef.afterClosed().subscribe(() => {
      this.routerService.navigate([], { queryParams: {} });
    });
  }
}
