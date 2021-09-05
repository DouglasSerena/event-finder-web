import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ScreenPointsService } from '@douglas-serena/ng-utils';
import { IEvent } from 'src/app/interfaces/event.interface';
import SwiperCore, { Pagination } from 'swiper';

// install Swiper modules
SwiperCore.use([Pagination]);

@Component({
  selector: 'ef-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent implements OnInit {
  get isMobile() {
    return this.screenPointsService.isMobile;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public event: IEvent,
    private screenPointsService: ScreenPointsService,
  ) {}

  ngOnInit() {}

  concatCoords(event: IEvent) {
    return `${event.longitude},${event.latitude}`;
  }
}
