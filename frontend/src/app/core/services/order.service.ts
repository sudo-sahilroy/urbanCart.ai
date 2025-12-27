import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private api = 'https://urbancartbackend-5npe.onrender.com/api/orders';
  constructor(private http: HttpClient) {}

  create(shippingAddress: string): Observable<Order> {
    return this.http.post<Order>(`${this.api}/create`, { shippingAddress });
  }

  mine(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.api}/me`);
  }
}
