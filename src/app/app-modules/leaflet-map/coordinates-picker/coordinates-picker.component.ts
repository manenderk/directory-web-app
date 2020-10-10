import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { SubSink } from 'subsink';
import * as L from 'leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { Subject } from 'rxjs';
import { distinctUntilChanged, debounceTime} from 'rxjs/operators';
import { GeoService } from 'src/app/services/app/geo.service';

@Component({
  selector: 'app-coordinates-picker',
  templateUrl: './coordinates-picker.component.html',
  styleUrls: ['./coordinates-picker.component.css']
})
export class CoordinatesPickerComponent implements OnInit, OnDestroy {

  showMap = false;

  userPosition: Position;
  userPositionError: PositionError;

  locationSearch = {
    searchSubject: new Subject<string>(),
    results: []
  };

  @Output() coordinatesChanged: EventEmitter<{lat: number, lng: number}> = new EventEmitter();

  userInputLatLng: {
    lat: number,
    lng: number
  } = null;

  mapData: {
    center?: L.LatLng,
    userPositionMarkerLayer?: L.CircleMarker,
    userInputMarkerLayer?: L.Layer
  } = {};

  leafletMapOptions: L.MapOptions;

  provider = new OpenStreetMapProvider();

  private subSink = new SubSink();

  constructor(
    private geoService: GeoService
  ) { }

  ngOnInit(): void {
    this.leafletMapOptions = this.geoService.getDefaultLeafletMapOption();
    this.subsribeUserPositionUpdates();
    this.subscribeSearchInput();
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  subsribeUserPositionUpdates() {
    this.subSink.sink = this.geoService.userPosition.subscribe((position: Position) => {
      if (position) {
        this.userPosition = position;
        this.updateUserPositionInMap();
      }
    });
    this.subSink.sink = this.geoService.userPositionError.subscribe((positionError: PositionError) => {
      this.userPositionError = positionError;
    });
  }

  updateUserPositionInMap() {
    this.mapData.center = L.latLng(this.userPosition.coords.latitude, this.userPosition.coords.longitude);
    this.mapData.userPositionMarkerLayer = L.circleMarker(
      [
        this.userPosition.coords.latitude,
        this.userPosition.coords.longitude
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
  }

  userClicked(event: any) {
    this.mapData.userInputMarkerLayer = L.marker(
      event.latlng,
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

    this.userInputLatLng = {
      lat: event.latlng.lat,
      lng: event.latlng.lng
    };

    this.coordinatesChanged.emit({
      lat: this.userInputLatLng.lat,
      lng: this.userInputLatLng.lng
    });
  }

  searchLocation(event) {
    const value = event.target.value;
    this.locationSearch.searchSubject.next(value);
  }

  subscribeSearchInput() {
    this.subSink.sink = this.locationSearch.searchSubject.asObservable().pipe(
      distinctUntilChanged(),
      debounceTime(1000)
    ).subscribe(async value => {
      this.locationSearch.results = await this.provider.search({ query: value });
    });
  }

  selectLocation(result: any) {
    const latLngg: L.LatLng = L.latLng(result.y, result.x);

    this.userClicked({
      latlng: latLngg
    });
    this.mapData.center = latLngg;
    this.locationSearch.results = [];
  }

  cancelInput() {
    this.coordinatesChanged.emit({lat: null, lng: null});
    this.showMap = false;
  }

  saveInput() {
    this.coordinatesChanged.emit({lat: this.userInputLatLng.lat, lng: this.userInputLatLng.lng});
    this.showMap = false;
  }

}
