import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ScreenPointsService } from '@douglas-serena/ng-utils';
import dayjs from 'dayjs';
import { IEvent } from 'src/app/interfaces/event.interface';
import { environment } from 'src/environments/environment';
import SwiperCore, { Pagination } from 'swiper';

// install Swiper modules
SwiperCore.use([Pagination]);

@Component({
  selector: 'ef-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent implements OnInit {
  public get isMobile() {
    return this.screenPointsService.isMobile;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public event: IEvent,
    private screenPointsService: ScreenPointsService
  ) {}

  public ngOnInit() {}

  public onShareFacebook() {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${environment.URL_APP}&t=${
        this.event.name
      } dia ${dayjs(this.event.date).format('DD/MM')} as ${dayjs(
        this.event.date
      ).format('hh:mm')}`,
      '_blank'
    );
  }

  public onShareWhatsapp() {
    window.open(
      `https://api.whatsapp.com/send?text=${this.event.name} dia ${dayjs(
        this.event.date
      ).format('DD/MM')} as ${dayjs(this.event.date).format(
        'hh:mm'
      )} | ${encodeURI(location.href)}`,
      '_blank'
    );
  }

  public concatCoords(event: IEvent) {
    return `${event.longitude},${event.latitude}`;
  }

  public clearAddress(address: string) {
    return address.replace(/-.*/g, '');
  }
}
