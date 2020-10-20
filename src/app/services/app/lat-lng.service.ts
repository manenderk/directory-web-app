import { Injectable } from '@angular/core';
import { LatLng } from 'src/app/models/app/map/latLng.model';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class LatLngService {

  constructor() { }

  mapLatLngToRequestObj(latLng: LatLng): any {
    if (!latLng) {
      return null;
    }
    const obj = {
      type: 'Point',
      coordinates: [latLng.lat, latLng.lng]
    };
    return obj;
  }

  mapResponseToLatLng(latLngRes: any): LatLng {
    const latLng: LatLng = {
      lat: null,
      lng: null
    };
    if (latLngRes?.coordinates[0]) {
      latLng.lat = latLngRes.coordinates[0];
    }
    if (latLngRes?.coordinates[1]) {
      latLng.lng = latLngRes.coordinates[1];
    }

    return latLng;
  }
}
