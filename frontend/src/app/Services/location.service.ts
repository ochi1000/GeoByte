import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';

const APIUrl = "http://localhost:9500/locations"

@Injectable({
  providedIn: 'root'
})
export class LocationService extends DataService {

  constructor( http: HttpClient) {
    super(APIUrl, http);
   }
}
