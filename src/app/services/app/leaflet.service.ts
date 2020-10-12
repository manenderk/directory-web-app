import { Injectable } from '@angular/core';
import { LatLng } from 'src/app/models/app/map/latLng.model';
import * as L from 'leaflet';
import { Marker } from 'src/app/models/app/map/marker.model';

@Injectable({
  providedIn: 'root'
})
export class LeafletService {

  constructor() { }

  getMarker(marker: Marker): L.Marker {
    const m: L.Marker = L.marker(
      marker.latLng,
      {
        title: marker.title || 'Your Pinned Location',
        icon: L.icon({
          iconSize: [ 25, 41 ],
          iconAnchor: [ 13, 41 ],
          iconUrl: marker.iconUrl || 'assets/leaflet/marker-icon.png',
          shadowUrl: marker.shadowIconUrl || 'assets/leaflet/marker-shadow.png'
        })
      }
    );
    return m;
  }

  getUserPositionMarker(latLng: LatLng): L.CircleMarker {
    const marker: L.CircleMarker = L.circleMarker(
      [
        latLng.lat,
        latLng.lng
      ],
      {
        radius: 6,
        fillColor: '#2196f3',
        fillOpacity: 1,
        stroke: false
      }
    ).bindTooltip('You are currently here...', {
      direction: 'top'
    });
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
