import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MapDirectionsRenderer, MapDirectionsService, MapGeocoder } from '@angular/google-maps';
import { Observable, isEmpty, map } from 'rxjs';
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
  ssssss: any[] = [];
  selectedIntermediates: any[] = [];
  originLocation: any|null = ""; 
  destLocation: any|null = ""; 
  directionsService = new google.maps.DirectionsService();
  directionsRenderer: any;
  location: Location = new Location;
  locationInView: Location = new Location;
  directt: any;
  geocode: MapGeocoder;
  mapDirectionsService: MapDirectionsService;
  showMap: boolean = false;
  distance: any;
  totalCost: any;
  totalClearingCost: any;
  // directions: Observable < google.maps.DirectionsResult | undefined >;

  getAllLocations(){
    this.locationService.getAll().subscribe((response : Location[])=>{
      this.locations = response;
      console.log(response);
    });
  }

  getLocation(id: String){
    this.locationService.get(id).subscribe((response : Location)=>{
      this.location = response;
    });
  }

  get selectedLocationsDetails(): any[]{
    return this.locations.filter((e) => e !== this.originLocation);
  }
  
  get availableIntermediateLocations(): any[]{
    return this.locations.filter((e) => e !== this.originLocation && e !== this.destLocation);
  }

  get selectedIntermediatesLocations(): any[]{
    return this.locations.filter((e, i) => this.ssssss[i]);
  }
  
  
  
  originControl = new FormControl('');
  destControl = new FormControl('');


  options: google.maps.MapOptions = {
    center: {lat: 18.072264, lng: 14.491302},
    zoom: 4
  };
  
  
  directionsResults$: Observable < google.maps.DirectionsResult | undefined > ;
  
  // waypts: google.maps.DirectionsWaypoint[] = this.selectedIntermediatesLocations.map((value) =>{
  //   let lat = value.latitude;
  //   let lng = value.longitude;
  //   return {
  //     location: {lat, lng}
  //   }
  // });
  get waypts(): google.maps.DirectionsWaypoint[]{
    return this.selectedIntermediatesLocations.map((value) =>{
      let lat = Number(value.latitude);
      let lng = Number(value.longitude);
      return {
        location: {lat, lng}
      }
    });
  }
  
  // waypts: google.maps.DirectionsWaypoint[] = [
  //   {location:{lat: 9.262509882248305, lng: 7.390923705367082}},
  //   {location:{lat: 9.172979920601444, lng: 7.465141495147523}},
  // ];




      

  constructor(mapDirectionsService: MapDirectionsService, geocoder: MapGeocoder, private locationService: LocationService){
    this.getAllLocations();
    this.mapDirectionsService = mapDirectionsService; 
    this.geocode = geocoder; 

    // geocoder.geocode({
    //   address: '1600 Amphitheatre Parkway, Mountain View, CA'
    // }).subscribe(({
    //     results
    // }) => {
    //     console.log(results);
    // });


        const request: google.maps.DirectionsRequest = {
          destination: {lat: 9.07833889664592, lng: 7.477451401525937},
          origin: {lat: 9.058593146867677, lng: 7.431330664102593},
          waypoints: this.waypts,
          travelMode: google.maps.TravelMode.DRIVING
        }
        this.directionsResults$ = mapDirectionsService.route(request).pipe(map(response => 
        response.result));
          
      
    this.originControl.valueChanges.subscribe((value) =>{
      this.originLocation = this.locations.find(o => o.id == value);
      console.log(this.originLocation);
      
    })
    
    this.destControl.valueChanges.subscribe((value) =>{
      this.destLocation = this.locations.find(o => o.id == value);
      console.log(this.destLocation);
    })

  }

  modifyLocation(){
    

    this.geocode.geocode({
      address: this.locationInView.name
    }).subscribe(({
        results
    }) => {
      if(!results.length){
        alert("unknown location, please try again");
        return;
      }
      this.locationInView.latitude = results[0].geometry.location.lat().toString();
      this.locationInView.longitude = results[0].geometry.location.lng().toString();
      this.locationService.update(this.locationInView).subscribe(()=>{
        alert("Location updated");
        window.location.reload();
      });
  })
}

  deleteLocation(id:any){
    this.locationService.delete(id).subscribe(()=>{
      alert("Location deleted");
      window.location.reload();
    })
  }

  modelInView(location: Location = new Location){
    this.locationInView = location;
  }
  
  getDeliveryDetails(){
    if(this.waypts.length == 0){
      alert("delivery must begin with atleast one intermediate location");
      return;
    }
    if(this.waypts.length > 4){
      alert("delivery has a max of 4 intermediate locations");
      return;
    }
    this.showMap = true;
    const request: google.maps.DirectionsRequest = {
      destination: {lat: Number(this.destLocation.latitude), lng: Number(this.destLocation.longitude)},
      origin: {lat: Number(this.originLocation.latitude), lng: Number(this.originLocation.longitude)},
      waypoints: this.waypts,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING
    }
    this.setRouteMap(this.mapDirectionsService, request);

    

    (async () => {
      await this.directionsService.route(request,
        (response: any, status: any) => { // anonymous function to capture directions
        if (status !== 'OK') {
          return false;
        } else {
          var directionsData = response.routes[0].legs[0]; // Get data about the mapped route
          if (!directionsData) {
            return false;
          }
          else {
            console.log(directionsData.distance.value)
           
            
            let costing = 0;
            this.selectedIntermediatesLocations.forEach((value) => {
              costing += value.cost;
              console.log(value.cost);
            })
            this.totalCost = Number(directionsData.distance.value)/100 +  this.destLocation.cost + costing;
            this.distance = Number(directionsData.distance.value)/100;
            console.log(costing)
            console.log(this.totalCost)
            return directionsData.distance.value;
          }
        }
      })
     
    })()

    console.log(Number(this.distance)/100);
        
    
  }
  
  setRouteMap(mapDirectionsService: MapDirectionsService, request:any):void{
    console.log('here');
    this.directionsResults$ = mapDirectionsService.route(request).pipe(map(response => 
      response.result));
  }

  addLocation(){
    this.geocode.geocode({
      address: this.location.name
    }).subscribe(({
        results
    }) => {
      this.location.latitude = results[0].geometry.location.lat().toString();
      this.location.longitude = results[0].geometry.location.lng().toString();
      this.locationService.post(this.location).subscribe(()=>{
        alert("Location added");
        window.location.reload();
      })
    });
  }

}
