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

  getLocationReverse(latitude: number, longitude: number): Observable<any>{
    return this.http.get<any>(`https://us1.locationiq.com/v1/reverse.php?key=pk.a7e64683f0208bfabb1d8178580fd672&lat=${latitude}&lon=${longitude}&format=json`);
  }

  getFreeLocationReverse(latitude: number, longitude: number): Observable<any>{
    return this.http.get<any>(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=pt`);
  }

  getLocationIp(): Observable<any>{
    return this.http.get<any>('https://api.ip2location.com/v2/?key=TYA1OMTVBA&package=WS24&format=json&addon=continent,country,region,city,geotargeting,country_groupings,time_zone_info&lang=en');
  }


}
