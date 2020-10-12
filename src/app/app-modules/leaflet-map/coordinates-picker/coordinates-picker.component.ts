import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import * as L from 'leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { Subject } from 'rxjs';
import { distinctUntilChanged, debounceTime} from 'rxjs/operators';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LatLng } from 'src/app/models/app/map/latLng.model';
import { LeafletService } from 'src/app/services/app/leaflet.service';
import { Marker } from 'src/app/models/app/map/marker.model';

@Component({
  selector: 'app-coordinates-picker',
  templateUrl: './coordinates-picker.component.html',
  styleUrls: ['./coordinates-picker.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: CoordinatesPickerComponent, multi: true}
  ]
})
export class CoordinatesPickerComponent implements OnInit, OnDestroy, ControlValueAccessor {

  showMap = false;

  locationSearch = {
    searchSubject: new Subject<string>(),
    results: []
  };

  userInputLatLng: LatLng = null;

  mapData: {
    leafletMapOptions?: L.MapOptions,
    center?: L.LatLng,
    userInputMarkerLayer?: L.Layer
  } = {};

  provider = new OpenStreetMapProvider();

  private onChange: (userInputLatLng: LatLng) => void;

  private subSink = new SubSink();

  constructor(
    private leafletService: LeafletService
  ) { }

  ngOnInit(): void {
    this.subscribeSearchInput();
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  writeValue(userInputLatLng: LatLng) {
    this.userInputLatLng = userInputLatLng;

    this.mapData.leafletMapOptions = this.leafletService.getDefaultMapOption(this.userInputLatLng);

    if (this.userInputLatLng) {
      this.mapData.leafletMapOptions.center = L.latLng(this.userInputLatLng.lat, this.userInputLatLng.lng);

      const marker: Marker = {
        latLng: this.userInputLatLng
      };
      this.mapData.userInputMarkerLayer = this.leafletService.getMarker(marker);
      this.mapData.center = L.latLng(this.userInputLatLng.lat, this.userInputLatLng.lng);
    }
  }

  registerOnChange(onChange: (userInputLatLng: LatLng) => void) {
    this.onChange = onChange;
  }

  registerOnTouched() {}

  userClicked(event: any) {
    this.userInputLatLng = {
      lat: event.latlng.lat,
      lng: event.latlng.lng
    };

    const marker: Marker = {
      latLng: this.userInputLatLng
    };

    this.mapData.userInputMarkerLayer = this.leafletService.getMarker(marker);
    this.onChange(this.userInputLatLng);

  }

  searchLocation(event: any) {
    event.preventDefault();
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

  updateInput() {
    this.onChange(this.userInputLatLng);
  }

  cancelInput() {
    this.showMap = false;
  }

  saveInput() {
    this.onChange(this.userInputLatLng);
    this.showMap = false;
  }

  resetInput() {
    this.userInputLatLng = {
      lat: null,
      lng: null
    };
    this.onChange(this.userInputLatLng);
  }

}
