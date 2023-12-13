import { Component, OnInit, ViewChild } from '@angular/core';
import { MapDirectionsRenderer, MapDirectionsService } from '@angular/google-maps';
import { Observable, map } from 'rxjs';
import { Location } from '../../models/location';
import { LocationService } from '../../Services/location.service';
import { FormControl, FormGroup, NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.css'
})
export class DeliveryComponent{

  locations: Location[] = [];
  selectedLocations: any[] = [];
  originLocation: any|null = ""; 
  destLocation: any|null = ""; 

  location: Location = {
    id: "",
    name: "",
    latitude: "",
    longitude: ""
  };

  getAllLocations(){
    this.locationService.getAll().subscribe((response : Location[])=>{
      this.locations = response;
    });
  }

  getLocation(id: String){
    this.locationService.get(id).subscribe((response : Location)=>{
      this.location = response;
    });
  }

  get selectedLocationsDetails(): any[]{
    return this.locations.filter((e, i) => this.selectedLocations[i]);
  }
  
  originControl = new FormControl('');
  destControl = new FormControl('');


  options: google.maps.MapOptions = {
    // center: {lat: 18.072264, lng: 20.491302},
    // zoom: 12
  };

  readonly  directionsResults$: Observable<google.maps.DirectionsResult|undefined>;

  constructor(mapDirectionsService: MapDirectionsService, private locationService: LocationService){
    this.getAllLocations();
    const request: google.maps.DirectionsRequest = {
      destination: {lat: this.destLocation.latitude|12, lng: this.destLocation.longitude|4},
      origin: {lat: this.originLocation.latitude|14, lng: this.originLocation.longitude|8},
      travelMode: google.maps.TravelMode.DRIVING
    }
    this.directionsResults$ = mapDirectionsService.route(request).pipe(map(response => 
      response.result));
      mapDirectionsService.route(request).pipe(map(response => 
        console.log(response.result)));
    this.originControl.valueChanges.subscribe((value) =>{
      this.originLocation = this.locations.find(o => o.id == value);
      console.log(this.originLocation);
      
    })
    
    this.destControl.valueChanges.subscribe((value) =>{
      this.destLocation = this.locations.find(o => o.id == value);
      console.log(this.destLocation);
    })
  }


}
