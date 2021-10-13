import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { sanPham } from '../_models/sanPham';
import { GetOptionInput } from '../_models/getOptionInput';

@Injectable({ providedIn: 'root' })

export class sanPhamService {
  readonly APIUrl = 'http://localhost:60276';
  constructor(private http: HttpClient) {}



  getSanPham(val: GetOptionInput): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/sanPham', val);
  }

  updateSanPham(val: sanPham) {
    return this.http.post(this.APIUrl + '/update-SanPham', val);
  }

  deleteSanPham(val: sanPham): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/delete-SanPham', val);
  }

  registerSanPham(val: sanPham) {
    return this.http.post(this.APIUrl + '/add-SanPham', val);
  }
}
