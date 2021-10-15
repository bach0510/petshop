import { PayoffDto } from './../_models/payoffDto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetCusInputDto } from '../_models/get-cus-input-dto';
import { khachHang } from '../_models/khachHang';

@Injectable({ providedIn: 'root' })
export class PayoffService {
  readonly APIUrl = 'http://localhost:60276';

  constructor(private http: HttpClient) {}

  getPayoff(type: PayoffDto): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/payoff', type);
  }

  deletePayoff(type: PayoffDto): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/delete-payoff', type);
  }

  registerPayoff(input: PayoffDto) {
    return this.http.post(this.APIUrl + '/add-payoff', input);
  }

  getUserPayoff(type: PayoffDto): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/user-payoff', type);
  }

  deleteUserPayoff(type: PayoffDto): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/delete-user-payoff', type);
  }

  registerUserPayoff(input: PayoffDto) {
    return this.http.post(this.APIUrl + '/add-user-payoff', input);
  }
}
