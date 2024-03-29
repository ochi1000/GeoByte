import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './Components/user/user.component';
import { LoginComponent } from './Components/login/login.component';
import { MapComponent } from './Components/map/map.component';
import { DeliveryComponent } from './Components/delivery/delivery.component';
import { AddLocationComponent } from './Components/add-location/add-location.component';

const routes: Routes = [
  {path : "register" , component : UserComponent},
  {path : "login" , component : LoginComponent},
  {path : "delivery" , component : DeliveryComponent},
  {path : "add-location" , component : AddLocationComponent},
  { path: '',  component: MapComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
