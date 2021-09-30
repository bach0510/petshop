import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Employee } from '../_models/employee';
import { GetShippersInputDto } from '../_models/get-shippers-input-dto';

@Injectable({ providedIn: 'root' })
export class CacheService {
  readonly APIUrl = 'http://localhost:60276';

  constructor(private http: HttpClient) {}

  getArea(): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/get-area', undefined);
  }

}
