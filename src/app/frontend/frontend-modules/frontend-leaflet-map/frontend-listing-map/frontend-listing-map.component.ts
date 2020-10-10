import { Component, OnInit } from '@angular/core';
import { MapOptions, latLng, tileLayer, circleMarker, marker } from 'leaflet';

@Component({
  selector: 'app-frontend-listing-map',
  templateUrl: './frontend-listing-map.component.html',
  styleUrls: [
    './frontend-listing-map.component.css',
  ]
})
export class FrontendListingMapComponent implements OnInit {

  mapOptions: MapOptions;
  userPositionLayer: any;
  layers: any[] = [];

  userLoc: {
    lat: number;
    lon: number;
  };

  locs: {
    title: string,
    lat: number,
    lon: number
  }[] = [];

  constructor(
  ) { }

  ngOnInit(): void {
    this.intializeVariables();
  }

  intializeVariables() {
    this.userLoc = {
      lat: 0,
      lon: 0
    };
    this.generateLocations();
    this.getUserLocation();
  }

  async getUserLocation() {
    try {
      const data = await this.getUserCoordinates();
      console.log(data);
      this.userLoc = {
        lat: data.coords.latitude,
        lon: data.coords.longitude
      };
      console.log(this.userLoc);
    }
    catch (e) {
      console.log(e);
    }
    finally {
      this.intializeMap();
    }
  }

  getUserCoordinates(): Promise<any> {

    return new Promise((resolve, reject) => {
      if (!window.navigator.geolocation) {
        reject('Geolocation is not supported by your browser');
      } else {
        console.log('Locating…');
        navigator.geolocation.getCurrentPosition(position => {
          resolve(position);
        }, error => {
          reject(error);
        });
      }
    });
  }

  generateLocations() {
    const centerLoc = {
      lat: 28.7041,
      lon: 77.1025
    };

    const range = 0.5;

    for (let i = 0; i < 100; i++) {
      let multiplier1 = 1;
      let multiplier2 = 1;
      if (Math.random() < 0.5) {
        multiplier1 = -1;
      }
      if (Math.random() < 0.5) {
        multiplier2 = -1;
      }

      const x = centerLoc.lat + this.getRandomNumber(range) * multiplier1;
      const y = centerLoc.lon + this.getRandomNumber(range) * multiplier2;
      this.locs.push({
        title: 'Place' + (i + 1),
        lat: parseFloat(x.toFixed(4)),
        lon: parseFloat(y.toFixed(4))
      });
    }

  }

  distance(lat1, lon1, lat2, lon2, unit) {
    let radlat1 = Math.PI * lat1 / 180;
    let radlat2 = Math.PI * lat2 / 180;
    let theta = lon1 - lon2;
    let radtheta = Math.PI * theta / 180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit =='K') { dist = dist * 1.609344; }
    if (unit =='N') { dist = dist * 0.8684; }
    return dist;
  }


  intializeMap() {
    console.log('test');
    this.mapOptions = {
      center: latLng(this.userLoc.lat, this.userLoc.lon),
      zoom: 15,
      layers: [
        tileLayer(
          'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoibWF5YW5rLWsiLCJhIjoiY2tjamR6dHJvMTg3MTM0cXFmbmRhbng0ayJ9.Mykrok1QyVGMxSddZP4WBg'
          }
        )
      ],
    };

    this.userPositionLayer = circleMarker(
      [
        this.userLoc.lat, this.userLoc.lon
      ], {
        radius: 8,
        fillColor: '#2196f3',
        fillOpacity: 1,
        stroke: false
      }
    ).bindTooltip('You are currently here', {
      direction: 'top'
    });


    this.locs.forEach(l => {
      if (isNaN(l.lat) || isNaN(l.lon)) {
        return;
      }
      this.layers.push(
        marker([l.lat, l.lon], {
          title: l.title
        })
      );
    });
  }

  getRandomNumber(num: number) {
    if (num === 0) {
      return num;
    }
    num = num * 10000;
    num = Math.floor(Math.random() * num);
    num = num / 10000;
    return num;
  }

}
