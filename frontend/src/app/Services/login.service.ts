import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';

const  APIUrlLogin ="http://localhost:9500/api/auth/login";

@Injectable({
  providedIn: 'root'
})

export class LoginService extends DataService {

  constructor(http: HttpClient) { 
    super(APIUrlLogin, http);
  }
}
