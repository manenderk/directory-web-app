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

  mapDefaults = {
    zoom: 12,
    maxZoom: 18,
    center: {
      lat: 49.312926,
      lng: -123.207645
    },
    userPositionMarker: {
      radius: 6,
      color: '#2196f3',

    }
  };

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
        radius: this.mapDefaults.userPositionMarker.radius,
        fillColor: this.mapDefaults.userPositionMarker.color,
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
            maxZoom: this.mapDefaults.maxZoom,
            attribution: '@Open Street Maps'
          }
        )
      ],
      zoom: this.mapDefaults.zoom,
      center: L.latLng(
        center?.lat || this.mapDefaults.center.lat,
        center?.lng || this.mapDefaults.center.lng
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
