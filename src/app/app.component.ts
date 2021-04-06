import { MapsService } from './maps.service';
import { Component, OnInit } from '@angular/core';
import { Location, Position } from './maps';

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

  location: Location = null;
  freeReverseLocation: Location = null;
  locationIp: Location = null;
  position: Position;

  constructor(private map: MapsService) {
  }


  ngOnInit(): void {

    this.map.getLocation().subscribe((data: Location) => {
      console.log(data);
      this.location = data;
    });

    this.getUserLocation();
    this.getLocationIp();
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
      },
      error => console.log(error),
      { enableHighAccuracy: true, maximumAge: 10, timeout: 30000 }
      );
    }
  }

  getLocationIp(){
    this.map.getLocationIp().subscribe(
      location => {
        this.locationIp = location;
      }
    )
  }


}
