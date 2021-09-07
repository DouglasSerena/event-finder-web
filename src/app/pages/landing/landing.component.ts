import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { dialogConfig, ScreenPointsService } from '@douglas-serena/ng-utils';
import { IEvent } from 'src/app/interfaces/event.interface';
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
    private dialogService: MatDialog,
    private screenPointsService: ScreenPointsService,
  ) {}

  ngOnInit() {
  }

  openEventDetails(event: IEvent) {
    this.dialogService.open(
      EventDetailsComponent,
      dialogConfig<MatDialogConfig<any>>(this.isMobile ? 'mobile' : 'desktop', {
        panelClass: ['dialog-event', 'dialog-mobile'],
        maxWidth: '600px',
        data: event,
      }),
    );
  }
}
