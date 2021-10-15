import { Order } from './../_models/order';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetCusInputDto } from '../_models/get-cus-input-dto';
import { khachHang } from '../_models/khachHang';
import { GetOrderInputDto } from '../_models/get-order-input-dto';
import { GetOrderByUserIdDto } from '../_models/GetOrderByUserIdDto';

@Injectable({ providedIn: 'root' })
export class OrderService {
  readonly APIUrl = 'http://localhost:60276';

  constructor(private http: HttpClient) {}

  getOrders(val: GetOrderInputDto): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/order', val);
  }

  getOrdersByUserId(val: GetOrderByUserIdDto): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/order-by-shipper', val);
  }

  updateOrder(val: Order) {
    return this.http.post(this.APIUrl + '/update-order', val);
  }

  updateAssign(val: Order) {
    return this.http.post(this.APIUrl + '/assign-order', val);
  }

  deleteOrder(val: Order): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/delete-order', val);
  }

  registerOrder(val: Order) {
    return this.http.post(this.APIUrl + '/add-order', val);
  }
}
