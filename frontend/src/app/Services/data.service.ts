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
  post(data: any): Observable<any>{
    return this.http.post(this.APIURL, data, {responseType:'text'});
  }

  getAll(): Observable<any>{
    return this.http.get<any>(this.APIURL);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${this.APIURL}/${id}`);
  }

  update(data: any): Observable<any> {
    return this.http.put(`${this.APIURL}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.APIURL}/${id}`);
  }
}
