import mapboxgl from 'mapbox-gl';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { theme } from '@douglas-serena/utils';

@Injectable({
  providedIn: 'root',
})
export class MapsService {
  URL_API_MAPBOX = 'https://api.mapbox.com';
  TOKEN!: string;

  zoom = 14;
  map!: mapboxgl.Map;
  markers!: mapboxgl.Marker[];
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
          (error) => reject(error),
        );
      }
    });
  }

  public moveToMap(center: number[]) {
    this.map?.flyTo({ center: center as any, zoom: this.zoom });
  }
}
