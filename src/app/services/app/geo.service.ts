import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class GeoService implements OnDestroy {

  userPosition: BehaviorSubject<Position> = new BehaviorSubject(null);
  userPositionError: BehaviorSubject<PositionError> = new BehaviorSubject(null);

  private window = window;
  private watchId: any = null;

  constructor() {
    this.subscribeUserPositionWatching();
  }


  subscribeUserPositionWatching() {
    this.watchId = this.window.navigator.geolocation.watchPosition((position: Position) => {
      this.userPosition.next(position);
    }, (error: PositionError) => {
      this.userPositionError.next(error);
    });
  }

  getDefaultLeafletMapOption(): L.MapOptions {
    const option: L.MapOptions = {
      layers: [
        L.tileLayer(
          'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png?lang=en',
          {
            maxZoom: 18,
            attribution: '@Wikimedia Maps'
          }
        )
      ],
      zoom: 12,
      center: L.latLng(49.312926, -123.207645)
    };
    return option;
  }


  ngOnDestroy() {
    this.window.navigator.geolocation.clearWatch(this.watchId);
  }
}
