import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { average, getBoundingBox } from 'geolocation-utils';
import * as L from 'leaflet';
import { Marker } from 'src/app/models/app/map/marker.model';
import { GeoService } from 'src/app/services/app/geo.service';
import { LeafletService } from 'src/app/services/app/leaflet.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-map-with-markers',
  templateUrl: './map-with-markers.component.html',
  styleUrls: ['./map-with-markers.component.css']
})
export class MapWithMarkersComponent implements OnInit, OnChanges, OnDestroy {

  @Input() markers: Marker[] = [];

  @Input() height: string;
  @Input() width: string;

  userPosition: Position;
  userPositionError: PositionError;

  private window = window;
  private navigator = window.navigator;

  mapData: {
    center?: L.LatLng,
    userPositionMarkerLayer?: L.CircleMarker,
    markerLayers?: L.Layer[],
    boundingBox?: L.LatLngBounds
  } = {};

  leafletMapOptions: L.MapOptions;

  private subSink = new SubSink();

  constructor(
    private geoService: GeoService,
    private leafletService: LeafletService,
  ) { }

  ngOnInit(): void {
    this.subsribeUserPositionUpdates();

  }

  ngOnChanges(): void {
    this.initializeBaseMapLayer();
    this.updateMarkers();
    this.updateMapCenter();
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  initializeBaseMapLayer() {
    this.leafletMapOptions = this.leafletService.getDefaultMapOption();
  }

  subsribeUserPositionUpdates() {
    this.subSink.sink = this.geoService.userPosition.subscribe((position: Position) => {
      if (position) {
        this.userPosition = position;
        this.updateUserPositionInMap();
        this.updateMapCenter();
      }
    });
    this.subSink.sink = this.geoService.userPositionError.subscribe((positionError: PositionError) => {
      this.userPositionError = positionError;
    });
  }

  updateUserPositionInMap() {
    this.mapData.center = L.latLng(this.userPosition.coords.latitude, this.userPosition.coords.longitude);
    this.mapData.userPositionMarkerLayer = this.leafletService.getUserPositionMarker({
      lat: this.userPosition.coords.latitude,
      lng: this.userPosition.coords.longitude
    });
  }


  updateMarkers() {
    this.mapData.markerLayers = [];
    this.markers.forEach(marker => {
      this.mapData.markerLayers.push(
        this.leafletService.getMarker(marker)
      );
    });
    this.mapData.markerLayers.forEach(marker => {
      marker.on('click', (e: L.LeafletMouseEvent) => {
        /* if we're on iOS, open in Apple Maps */
        if (
          (this.navigator.platform.indexOf('iPhone') !== -1) ||
          (navigator.platform.indexOf('iPad') !== -1) ||
          (navigator.platform.indexOf('iPod') !== -1)
        ) {
          this.window.open(`maps://maps.google.com/maps?daddr=${e.latlng.lat},${e.latlng.lng}&amp;ll=`);
        }
        else { /* else use Google */
          this.window.open(`https://maps.google.com/maps?daddr=${e.latlng.lat},${e.latlng.lng}&amp;ll=`);
        }
      });
    });
  }

  updateMapCenter() {
    const locations: any[] = [];
    this.markers.forEach(marker => {
      locations.push({
        lat: marker.latLng.lat,
        lon: marker.latLng.lng
      });
    });
    if (this.userPosition?.coords) {
      locations.push({
        lat: this.userPosition.coords.latitude,
        lon: this.userPosition.coords.longitude
      });
    }

    const centerLoation: any = average(locations);
    const centerLatLng = L.latLng(centerLoation.lat, centerLoation.lon);

    this.mapData.center = centerLatLng;
    this.leafletMapOptions.center = centerLatLng;

    const boundingBox: any = getBoundingBox(locations, 500);
    this.mapData.boundingBox = L.latLngBounds(
      L.latLng(boundingBox.topLeft.lat, boundingBox.topLeft.lon),
      L.latLng(boundingBox.bottomRight.lat, boundingBox.bottomRight.lon)
    );
  }

  openLinkInMap() {}
}
