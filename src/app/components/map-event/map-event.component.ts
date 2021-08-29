import { AfterViewInit, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { handleTry, theme } from '@douglas-serena/utils';
import { TranslateService } from '@ngx-translate/core';
import mapboxgl from 'mapbox-gl';
import { MapsService } from './maps.service';

@Component({
  selector: 'ef-map-event',
  templateUrl: './map-event.component.html',
  styleUrls: ['./map-event.component.scss'],
})
export class MapEventComponent implements AfterViewInit {
  @ViewChild('eventMarketRef') eventMarketRef?: ElementRef<HTMLElement>;

  constructor(
    private mapsService: MapsService,
    private snackbarService: MatSnackBar,
    private translateService: TranslateService,
  ) {}

  async ngAfterViewInit(): Promise<void> {
    await this.mapsService.buildMap();
    await this.onMoveMyLocation();

    // this.marker = new mapboxgl.Marker({
    //   element: this.eventMarketRef?.nativeElement,
    // })
    //   .setLngLat([-50.0137984, -29.7369])
    //   .addTo(this.map);
  }

  public async onMoveMyLocation(): Promise<void> {
    const [data] = await handleTry(this.mapsService.getMyGeolocation());
    if (data) {
      this.mapsService.moveToMap(data);
    } else {
      const [message] = await handleTry(
        this.translateService.get('map.message.error.geolocation'),
      );

      this.snackbarService.open(message, '', {
        panelClass: 'mat-warning',
        duration: 10000,
      });
    }
  }
}
