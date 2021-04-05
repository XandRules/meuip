import { MapsService } from './maps.service';
import { Component, OnInit } from '@angular/core';
import { Location } from './maps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'My first AGM project';
  lat = 51.678418;
  lng = 7.809007;

  latitude: string = '';
  longitude: string = '';

  location: Location = null;

  constructor(private map: MapsService){
  }


  ngOnInit(): void {

    this.map.getLocation().subscribe((data: Location) => {
      console.log(data);

      this.latitude = data.latitude;
      this.longitude = data.longitude;
      this.location = data;
    })
  }



}
