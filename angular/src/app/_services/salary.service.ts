import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetCusInputDto } from '../_models/get-cus-input-dto';
import { khachHang } from '../_models/khachHang';
import { GetSalaryInputDto } from '../_models/get-salary-input-dto';

@Injectable({ providedIn: 'root' })
export class SalaryService {
  readonly APIUrl = 'http://localhost:60276';

  constructor(private http: HttpClient) {}

  getSalary(val: GetSalaryInputDto): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/salary', val);
  }

 
}
