import { Injectable } from '@angular/core';
import { LatLng } from 'src/app/models/app/latLng.model';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class LeafletService {

  constructor() { }

  getMarker(latLng: LatLng): L.Marker {
    const marker: L.Marker = L.marker(
      latLng,
      {
        title: 'Your Pinned Location',
        icon: L.icon({
          iconSize: [ 25, 41 ],
          iconAnchor: [ 13, 41 ],
          iconUrl: 'assets/leaflet/marker-icon.png',
          shadowUrl: 'assets/leaflet/marker-shadow.png'
        })
      }
    );
    return marker;
  }

  getDefaultMapOption(center?: LatLng): L.MapOptions {
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
      center: L.latLng(
        center?.lat || 49.312926,
        center?.lng || -123.207645
      )
    };
    return option;
  }
}
