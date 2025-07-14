import { Injectable } from '@angular/core';
import { environment } from '../../../../environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Department } from '../../../shared/models/department';
import { RequestResponse } from '../../../shared/models/request-response';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  url = environment.backendUrl + 'department'
  header = new HttpHeaders();

  constructor(private http: HttpClient){
    this.header.append('Content-Type','application/json');
  }

  public index(): Observable<RequestResponse<Department[]>> {
    return this.http.get<RequestResponse<Department[]>>(this.url + '/all', {headers: this.header})
  }

  public create(data: Department): Observable<RequestResponse<boolean>>{
    return this.http.post<RequestResponse<boolean>>(this.url+'/create',data,{headers:this.header});
  }

  public update(data: any): Observable<RequestResponse<boolean>>{
    return this.http.post<RequestResponse<boolean>>(this.url+'/update',data,{headers:this.header})
      .pipe(map(data => data));
  }
}
