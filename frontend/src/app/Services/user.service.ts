import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';

const  APIUrlAuth ="http://localhost:9500/api/auth/register";

@Injectable({
  providedIn: 'root'
})
export class UserService extends DataService {

  constructor(http: HttpClient) {
    super(APIUrlAuth, http);
   }
}
