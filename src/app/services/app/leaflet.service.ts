import { Injectable } from '@angular/core';
import { LatLng } from 'src/app/models/app/map/latLng.model';
import * as L from 'leaflet';
import { Marker } from 'src/app/models/app/map/marker.model';

@Injectable({
  providedIn: 'root'
})
export class LeafletService {

  window = window;
  navigator = window.navigator;

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
          'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png?lang=en',
          {
            maxZoom: 18,
            attribution: '@Open Street Maps'
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

  getGoogleMapLink(latLng: LatLng): string {
    let link = '';
    if (
      (this.navigator.platform.indexOf('iPhone') !== -1) ||
      (navigator.platform.indexOf('iPad') !== -1) ||
      (navigator.platform.indexOf('iPod') !== -1)
    ) {
      link = `maps://maps.google.com/maps?daddr=${latLng.lat},${latLng.lng}&amp;ll=`;
    }
    else { /* else use Google */
      link = `https://maps.google.com/maps?daddr=${latLng.lat},${latLng.lng}&amp;ll=`;
    }
    return link;
  }
}
