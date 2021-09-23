import mapboxgl from 'mapbox-gl';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { theme } from '@douglas-serena/utils';
import { IEvent } from 'src/app/interfaces/event.interface';

@Injectable({
  providedIn: 'root',
})
export class MapsService {
  onMarkerClick$ = new EventEmitter();

  URL_API_MAPBOX = 'https://api.mapbox.com';
  TOKEN!: string;

  zoom = 14;
  map!: mapboxgl.Map;
  markers: { [id: string]: mapboxgl.Marker } = {};
  center: mapboxgl.LngLatLike = [0, 0];
  style!: string;

  constructor() {
    this.TOKEN = environment.TOKEN_MAPBOX;
    mapboxgl.accessToken = this.TOKEN;
  }

  public async buildMap(): Promise<void> {
    this.style = theme().isDark
      ? 'mapbox://styles/mapbox/dark-v10'
      : 'mapbox://styles/mapbox/outdoors-v9';

    this.map = new mapboxgl.Map({
      container: 'mapboxgl',
      style: this.style,
      zoom: 3,
      center: this.center,
    });

    window.onresize = () => this.map.resize();
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

    // const popup = new mapboxgl.Popup({
    //   closeButton: false,
    //   closeOnClick: false,
    // }).setText('Test');

    this.markers[event._id] = new mapboxgl.Marker(template)
      .setLngLat([event.latitude, event.longitude])
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
