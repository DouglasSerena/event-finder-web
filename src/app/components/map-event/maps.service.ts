import mapboxgl from 'mapbox-gl';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IEvent } from 'src/app/interfaces/event.interface';
import { EventService } from 'src/app/services/event.service';
import { Global, handleTry } from '@douglas-serena/utils';
import { Utils, Debounce } from '@douglas-serena/decorators';

@Utils('ngOnDestroy')
@Injectable({
  providedIn: 'root',
})
export class MapsService {
  onMarkerClick$ = new EventEmitter();
  onNewPosition = new EventEmitter<{
    latitude: number;
    longitude: number;
    radius: number;
  }>();

  URL_API_MAPBOX = 'https://api.mapbox.com';
  TOKEN!: string;

  zoom = 14;
  map!: mapboxgl.Map;
  markers: { [id: string]: mapboxgl.Marker } = {};
  center: mapboxgl.LngLatLike = [0, 0];
  style!: string;

  constructor(private eventService: EventService) {
    this.TOKEN = environment.TOKEN_MAPBOX;
    mapboxgl.accessToken = this.TOKEN;
  }

  public async buildMap(): Promise<void> {
    this.style = Global.isDark
      ? 'mapbox://styles/mapbox/dark-v10'
      : 'mapbox://styles/mapbox/outdoors-v9';

    this.map = new mapboxgl.Map({
      container: 'ef-mapboxgl',
      style: this.style,
      zoom: 3,
      center: this.center,
    });

    window.onresize = () => this.map.resize();
    this.map.on('move', () => this.newPosition());
    this.map.on('zoom', () => this.newPosition());
  }

  @Debounce(100)
  async newPosition() {
    const { lat, lng } = this.map.getCenter();
    const zoom = this.map.getZoom();
    const markers = [];

    if (zoom <= 14) {
      const [data] = await handleTry(this.eventService.getByLocation(lat, lng));
      if (data) {
        for (const event of data.data) {
          this.addMarker(event);
          markers.push(event._id);
        }
      }
    }

    for (const marker in this.markers) {
      if (!markers.includes(marker)) {
        this.markers[marker].remove();
        delete this.markers[marker];
      }
    }
  }

  public getMyGeolocation(): Promise<number[]> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve([position.coords.longitude, position.coords.latitude]);
          },
          (error) => reject(error)
        );
      }
    });
  }

  public addMarker(event: IEvent) {
    const template = document.createElement('div');

    template.innerHTML = `
      <div class="map-marker -with-text">
        <div class="material-icons">${event.icon || 'place'}</div>
        <p class="text">${event.name}</p>
      </div>
    `;

    this.markers[event._id] = new mapboxgl.Marker(template)
      .setLngLat([event.longitude, event.latitude])
      .addTo(this.map);

    template.addEventListener('mouseup', () => {
      this.onMarkerClick$.emit(event);
    });
  }

  public removeMarker(ref: string | number) {
    this.markers[ref!].remove();
    delete this.markers[ref!];
  }

  public clearMarker() {
    for (const ref in this.markers) {
      this.markers[ref!].remove();
    }
    this.markers = {};
  }

  public moveToMap(center: number[], options?: mapboxgl.FlyToOptions) {
    this.map?.flyTo({ center: center as any, zoom: this.zoom, ...options });
  }
}
