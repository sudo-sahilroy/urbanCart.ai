import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartItem } from '../models/cart.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private api = 'http://localhost:8080/api/cart';
  constructor(private http: HttpClient) {}

  getCart(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.api);
  }

  add(productId: number, quantity: number): Observable<CartItem[]> {
    return this.http.post<CartItem[]>(`${this.api}/add`, { productId, quantity });
  }

  update(productId: number, quantity: number): Observable<CartItem[]> {
    return this.http.post<CartItem[]>(`${this.api}/update`, { productId, quantity });
  }

  remove(productId: number): Observable<CartItem[]> {
    return this.http.delete<CartItem[]>(`${this.api}/${productId}`);
  }
}
