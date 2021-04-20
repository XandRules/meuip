import { MapsService } from './maps.service';
import { Component, OnInit } from '@angular/core';
import { GoogleMaps, Location, Position, Position2 } from './maps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'My first AGM project';
  lat = 51.678418;
  lng = 7.809007;

  latitude: number;
  longitude: number;
  googleMaps: any;

  location: Location = null;
  freeReverseLocation: Location = null;
  locationIp: Location = null;
  position: Position;
  position2: Position2;

  constructor(private map: MapsService) {
  }


  ngOnInit(): void {

    this.map.getLocation().subscribe((data: Location) => {
      this.location = data;
    });

    this.getUserLocation();
    this.getLocationByIp();
  }

  getLocationByIp() {
    this.map.getIp().subscribe(
      (position) => {
        this.locationIp = position.location;

        console.log(this.locationIp);
      }
    )
  }

  getOpenCage(latitude: number, longitude: number) {
    this.map.getOpenCage(latitude, longitude).subscribe(
      (data) => {
        this.position2 = data.results[0].components;
      }
    )
  }

  getGoogleMaps(latitude: number, longitude: number) {
    this.map.getGoogleMaps(latitude, longitude).subscribe(
      (data) => {

        var gmaps: any;
        var city: string;
        var state: string;

        data.results.forEach(element => {
          if (element.types == 'street_address') {
            gmaps = element;
          }
        });

        gmaps.address_components.forEach(element => {
          if (element?.types.includes('administrative_area_level_2')) {
            city = element?.long_name
          }
          if (element?.types.includes('administrative_area_level_1')) {
            state = element?.long_name
          }
        });

        this.googleMaps = { cidade: city, estado: state, lat: gmaps.geometry.location.lat, lng: gmaps.geometry.location.lng };

      }
    )
  }



  getLocation(latitude: number, longitude: number) {
    this.map.getLocationReverse(latitude, longitude).subscribe(
      (data) => {
        this.position = data;
      }
    )
  }

  getFreeLocation(latitude: number, longitude: number) {
    this.map.getFreeLocationReverse(latitude, longitude).subscribe(
      (data) => {
        this.freeReverseLocation = data;
      }
    )
  }

  getUserLocation() {
    if (navigator.geolocation) {

      navigator.geolocation.watchPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;

        this.getLocation(this.lat, this.lng);
        this.getFreeLocation(this.lat, this.lng);
        this.getOpenCage(this.lat, this.lng);
        this.getGoogleMaps(this.lat, this.lng);
      },
        error => console.log(error),
        { enableHighAccuracy: true, maximumAge: 10, timeout: 30000 }
      );
    }
  }

}
