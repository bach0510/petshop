import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetNhanVienInput } from '../_models/get-nhanvien-input';
import { NhanVien } from '../_models/nhan-vien';

@Injectable({ providedIn: 'root' })
export class UserService {
  readonly APIUrl = 'http://localhost:60276';
  constructor(private http: HttpClient) {}



  getEmployees(val: GetNhanVienInput): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/employees', val);
  }

  registerEmployee(val: NhanVien) {
    return this.http.post(this.APIUrl + '/auth/register', val);
  }

  updateEmployee(val: NhanVien) {
    return this.http.post(this.APIUrl + '/update-employee', val);
  }

  deleteEmployee(val: NhanVien): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/delete-employee', val);
  }
}
