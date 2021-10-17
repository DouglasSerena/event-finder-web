import { AfterViewInit, EventEmitter, Output } from '@angular/core';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { handleTry } from '@douglas-serena/utils';
import { TranslateService } from '@ngx-translate/core';
import { EventService } from 'src/app/services/event.service';
import { MapsService } from './maps.service';

@Component({
  selector: 'ef-map-event',
  templateUrl: './map-event.component.html',
  styleUrls: ['./map-event.component.scss'],
})
export class MapEventComponent implements AfterViewInit {
  @Output() markerClick!: EventEmitter<any>;

  constructor(
    private mapsService: MapsService,
    private eventService: EventService,
    private snackbarService: MatSnackBar,
    private translateService: TranslateService
  ) {
    this.markerClick = this.mapsService.onMarkerClick$;
  }

  async ngAfterViewInit(): Promise<void> {
    await this.mapsService.buildMap();
    await this.onMoveMyLocation();

    const [data] = await handleTry(this.eventService.getAll());
    if (data) {
      for (const event of data.data) {
        this.mapsService.addMarker(event);
      }
    }
  }

  public async onMoveMyLocation(): Promise<void> {
    const [data] = await handleTry(this.mapsService.getMyGeolocation());
    if (data) {
      this.mapsService.moveToMap(data);
    } else {
      const [message] = await handleTry(
        this.translateService.get('map.message.error.geolocation')
      );

      this.snackbarService.open(message, '', {
        panelClass: 'mat-warning',
        duration: 10000,
      });
    }
  }
}
