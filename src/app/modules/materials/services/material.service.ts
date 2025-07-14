import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../../../environment';
import { Material } from '../../../shared/models/material';
import { RequestResponse } from '../../../shared/models/request-response';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  url = environment.backendUrl + 'material'
  header = new HttpHeaders();

  constructor(private http: HttpClient){
    this.header.append('Content-Type','application/json');
  }

  public index(): Observable<RequestResponse<Material[]>> {
    return this.http.get<RequestResponse<Material[]>>(this.url + '/all', {headers: this.header});
  }

  public create(data: Material): Observable<RequestResponse<boolean>>{
    return this.http.post<RequestResponse<boolean>>(this.url+'/create',data,{headers:this.header});
  }

  public show(id: number){
    return this.http.get(this.url+'/'+id+'/show',{headers:this.header})
      .pipe(map(data => data));
  }

  public update(data: any): Observable<RequestResponse<boolean>>{
    return this.http.post<RequestResponse<boolean>>(this.url+'/update',data,{headers:this.header})
      .pipe(map(data => data));
  }

  public delete(data: any){
    return this.http.post(this.url+'/'+data.id+'/delete',data,{headers:this.header})
      .pipe(map(data => data));
  }
}
