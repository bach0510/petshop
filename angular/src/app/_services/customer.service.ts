import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { khachHang } from '../_models/khachHang';

import { GetOptionInput } from '../_models/GetOptionInput';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  readonly APIUrl = 'http://localhost:60276';

  constructor(private http: HttpClient) {}

  getCustomers(val: GetOptionInput): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/customer', val);
  }

  updateCustomer(val: khachHang) {
    return this.http.post(this.APIUrl + '/update-customer', val);
  }

  deleteCustomer(val: khachHang): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/delete-customer', val);
  }

  registerCustomer(val: khachHang) {
    return this.http.post(this.APIUrl + '/add-customer', val);
  }
}
