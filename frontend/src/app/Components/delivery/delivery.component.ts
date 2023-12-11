import { Component } from '@angular/core';
import { MapDirectionsRenderer, MapDirectionsService } from '@angular/google-maps';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.css'
})
export class DeliveryComponent {

  options: google.maps.MapOptions = {
    center: {lat: 18.072264, lng: 20.491302},
    zoom: 12
  };

  readonly  directionsResults$: Observable<google.maps.DirectionsResult|undefined>;

  constructor(mapDirectionsService: MapDirectionsService){
    const request: google.maps.DirectionsRequest = {
      destination: {lat: 12, lng: 4},
      origin: {lat: 14, lng: 8},
      travelMode: google.maps.TravelMode.DRIVING
    }
    this.directionsResults$ = mapDirectionsService.route(request).pipe(map(response => response.result));
  }
}
