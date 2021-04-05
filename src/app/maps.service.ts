import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from './maps';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  constructor(private http: HttpClient) { }

  getLocation() : Observable<Location>{
    return this.http.get<Location>(`http://api.ipapi.com/api/check?access_key=${environment.IP_API_KEY}`);
  }
}
