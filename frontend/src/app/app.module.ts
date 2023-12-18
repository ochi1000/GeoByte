import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, provideHttpClient, withJsonpSupport } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeliveryComponent } from './Components/delivery/delivery.component';
import { MapComponent } from './Components/map/map.component';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { AddLocationComponent } from './Components/add-location/add-location.component';

@NgModule({
  declarations: [
    AppComponent,
    DeliveryComponent,
    MapComponent,
    AddLocationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    // MapComponent,
    GoogleMapsModule
  ],
  providers: [provideHttpClient(withJsonpSupport())],
  bootstrap: [AppComponent]
})
export class AppModule { }
