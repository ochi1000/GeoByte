import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent {
  apiLoaded: Observable<boolean>;

  options: google.maps.MapOptions = {
    center: {lat:9.076902275965697, lng: 7.477035798153819},
    zoom: 12
  };

  constructor(httpClient: HttpClient){
    this.apiLoaded = httpClient.jsonp("https://maps.googleapis.com/maps/api/js?key=AIzaSyCGyu9rzPhv8FpGl8HA8YS7jkEmADR-HAU", "callback")
    .pipe(
      map(() => true),
      catchError(() => of(false)),
    );
  }
}
