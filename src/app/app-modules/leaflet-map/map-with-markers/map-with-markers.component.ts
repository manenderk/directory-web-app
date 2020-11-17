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
  @Input() class: string;

  mapInstance: L.Map;
  mapMarkerClusterInstance: L.MarkerClusterGroup;

  userPosition: Position;
  userPositionError: PositionError;

  private window = window;

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
    this.filterInvalidMarkers();
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

  onMapReady(map: L.Map) {
    this.mapInstance = map;
  }

  onMarkerClusterReady(markerCluster: L.MarkerClusterGroup) {
    this.mapMarkerClusterInstance = markerCluster;
  }

  filterInvalidMarkers() {
    this.markers = this.markers.filter(marker => marker?.latLng?.lat && marker?.latLng?.lng);
  }

  updateUserPositionInMap() {
    this.mapData.center = L.latLng(this.userPosition.coords.latitude, this.userPosition.coords.longitude);
    this.mapData.userPositionMarkerLayer = this.leafletService.getUserPositionMarker({
      lat: this.userPosition.coords.latitude,
      lng: this.userPosition.coords.longitude
    });
  }


  updateMarkers() {
    if (this.mapMarkerClusterInstance) {
      this.mapMarkerClusterInstance.remove();
    }


    this.mapData.markerLayers = [];
    this.markers.forEach(marker => {
      this.mapData.markerLayers.push(
        this.leafletService.getMarker(marker)
      );
    });
    this.mapData.markerLayers.forEach(marker => {
      marker.on('click', (e: L.LeafletMouseEvent) => {
        const link = this.leafletService.getGoogleMapLink(e.latlng);
        this.window.open(link);
      });
    });

    if (this.mapMarkerClusterInstance) {
      this.mapMarkerClusterInstance.refreshClusters();
    }
  }

  updateMapCenter() {

    /* if (!this.markers || this.markers.length === 0) {
      this.markers
    }

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
    } */

    const locations: any[] = [];

    if (this.markers?.length > 0) {
      this.markers.forEach(marker => {
        locations.push({
          lat: marker.latLng.lat,
          lon: marker.latLng.lng
        });
      });
    }

    if (this.userPosition?.coords) {
      locations.push({
        lat: this.userPosition.coords.latitude,
        lon: this.userPosition.coords.longitude
      });
    }

    if (locations?.length === 0) {
      return;
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
