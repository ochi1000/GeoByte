import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // Inject ApiUrl in constructor to Get it form ather Service
  constructor(@Inject(String) private APIURL: string, private http: HttpClient) { }

  // Post Method
  auth(data: any): Observable<any>{
    return this.http.post(this.APIURL, data, {responseType:'text'});
  }
}
