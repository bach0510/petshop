import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { khachHang } from '../_models/khachHang';
import { GetHoaDonInput } from '../_models/GetHoaDonInput';
import { HoaDon } from '../_models/HoaDon';

@Injectable({ providedIn: 'root' })

export class HoaDonService {
  readonly APIUrl = 'http://localhost:60276';

  constructor(private http: HttpClient) {}

  getHoaDon(val: GetHoaDonInput): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/HoaDon', val);
  }

  updateHoaDon(val: HoaDon) {
    return this.http.post(this.APIUrl + '/update-HoaDon', val);
  }

  // deleteCustomer(val: khachHang): Observable<any[]> {
  //   return this.http.post<any>(this.APIUrl + '/delete-customer', val);
  // }

  // registerCustomer(val: khachHang) {
  //   return this.http.post(this.APIUrl + '/add-customer', val);
  // }
}
