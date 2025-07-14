import { Injectable } from '@angular/core';
import { environment } from '../../../../environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { RequestResponse } from '../../../shared/models/request-response';
import { City } from '../../../shared/models/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  url = environment.backendUrl + 'city'
  header = new HttpHeaders();

  constructor(private http: HttpClient){
    this.header.append('Content-Type','application/json');
  }

  public index(): Observable<RequestResponse<City[]>> {
    return this.http.get<RequestResponse<City[]>>(this.url + '/all', {headers: this.header})
  }

  public create(data: City): Observable<RequestResponse<boolean>>{
    return this.http.post<RequestResponse<boolean>>(this.url+'/create',data,{headers:this.header});
  }

  public update(data: any): Observable<RequestResponse<boolean>>{
    return this.http.post<RequestResponse<boolean>>(this.url+'/update',data,{headers:this.header})
      .pipe(map(data => data));
  }
}
