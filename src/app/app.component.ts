import { MapsService } from './maps.service';
import { Component, OnInit } from '@angular/core';
import { Location } from './maps';

interface Position {
  address : {
    country:string;
    country_code:string;
    postcode:string;
    restaurant:string;
    road:string;
    state:string;
    state_district:string;
    suburb:string;
    town:string;
  },
  lat: string;
  lon: string;
}

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
  position: Position;

  constructor(private map: MapsService) {
  }


  ngOnInit(): void {

    this.map.getLocation().subscribe((data: Location) => {
      console.log(data);
      this.location = data;
    });

    this.getUserLocation();
  }

  getLocation(latitude: number, longitude: number) {
    this.map.getLocationReverse(latitude, longitude).subscribe(
      (data) => {
        this.position = data;
      }
    )
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;

        this.getLocation(this.lat, this.lng);
      },
      error => console.log(error),
      {enableHighAccuracy:true, maximumAge:30000, timeout:27000}
      );
    } else {

    }
  }


}
