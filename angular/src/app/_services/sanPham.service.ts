import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { sanPham } from '../_models/sanPham';
import { GetSanPhamInput } from '../_models/GetSanPhamInput';

@Injectable({ providedIn: 'root' })

export class sanPhamService {
  readonly APIUrl = 'http://localhost:60276';
  constructor(private http: HttpClient) {}



  getSanPham(val: GetSanPhamInput): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/get-Order', val);
  }

  updateSanPham(val: sanPham) {
    return this.http.post(this.APIUrl + '/update-Order', val);
  }

  deleteSanPham(val: sanPham): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/delete-Order', val);
  }

  registerSanPham(val: sanPham) {
    return this.http.post(this.APIUrl + '/add-Order', val);
  }
}
