import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { handleTry, Global } from '@douglas-serena/utils';
import dayjs from 'dayjs';
import { IEvent } from 'src/app/interfaces/event.interface';
import { EventService } from 'src/app/services/event.service';
import { environment } from 'src/environments/environment';
import SwiperCore, { Pagination } from 'swiper';

SwiperCore.use([Pagination]);

@Component({
  selector: 'ef-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent implements OnInit, OnDestroy {
  event!: IEvent;

  public get isMobile() {
    return Global.isMobile;
  }

  constructor(
    private router: Router,
    private eventService: EventService,
    @Inject(MAT_DIALOG_DATA) public eventOrId: string | IEvent
  ) {}

  public async ngOnInit() {
    if (typeof this.eventOrId === 'string') {
      const [data] = await handleTry(this.eventService.getById(this.eventOrId));
      if (data) {
        this.event = data.data;
      }
    } else {
      this.event = this.eventOrId;
    }
  }

  public onShareFacebook() {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${
        environment.URL_APP + location.search
      }&t=${this.event.name} dia ${dayjs(this.event.date).format(
        'DD/MM'
      )} as ${dayjs(this.event.date).format('hh:mm')}`,
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

  public onSaveCalendar() {
    window.open(
      `https://calendar.google.com/calendar/u/0/r/eventedit?text=${
        this.event.name
      }&dates=${dayjs(
        this.event.date
      ).format()}&details=Compartilhe:&location=${this.concatCoords(
        this.event
      )}&trp=false&sprop=website:${encodeURI(location.href)}`
    );
  }

  public concatCoords(event: IEvent) {
    return `${event.latitude},${event.longitude}`;
  }

  ngOnDestroy() {
    this.router.navigate(['/']);
  }
}
