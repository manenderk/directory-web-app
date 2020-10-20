import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LatLng } from 'src/app/models/app/map/latLng.model';

@Injectable({
  providedIn: 'root'
})
export class GeoService implements OnDestroy {

  userPosition: BehaviorSubject<Position> = new BehaviorSubject(null);
  userPositionError: BehaviorSubject<PositionError> = new BehaviorSubject(null);

  private window = window;
  private watchId: any = null;

  constructor(
    private httpClient: HttpClient
  ) {
    this.subscribeUserPositionWatching();
  }

  subscribeUserPositionWatching() {
    this.watchId = this.window.navigator.geolocation.watchPosition((position: Position) => {
      this.userPosition.next(position);
    }, (error: PositionError) => {
      this.userPositionError.next(error);
    } , {
      maximumAge: 10000
    });
  }

  getAddress(latLng: LatLng) {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latLng.lat}&lon=${latLng.lng}&format=json`;
    return this.httpClient.get(url);
  }

  ngOnDestroy() {
    this.window.navigator.geolocation.clearWatch(this.watchId);
  }
}
