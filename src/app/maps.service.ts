import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
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

  getOpenCage(latitude: number, longitude: number): Observable<any>{
    return this.http.get<any>(`https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${environment.OPEN_CAGE_KEY}`);
  }

  getGoogleMaps(latitude: number, longitude: number): Observable<any>{
    return this.http.get<any>(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${environment.GOOGLE_MAPS_KEY}`);
  }
  
  getIp(): Observable<any>{
    return this.http.get<any>('https://api.ipify.org?format=json').pipe(
      mergeMap(ip => {
        return this.http.get<any>(`https://geo.ipify.org/api/v1?apiKey=at_o8cVbz1gaHlGIFXRaB87CF52ioMMj&ipAddress=${ip.ip}`);
      })
    );
  }




}


