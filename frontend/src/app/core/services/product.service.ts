import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

interface ProductPage {
  content: Product[];
  totalElements: number;
  totalPages: number;
  number: number;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private api = 'https://urbancartbackend-5npe.onrender.com/api/products';
  constructor(private http: HttpClient) {}

  list(params: { page?: number; size?: number; category?: string; search?: string; }): Observable<ProductPage> {
    return this.http.get<ProductPage>(this.api, { params: params as any });
  }

  get(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.api}/${id}`);
  }

  reviews(productId: number) {
    return this.http.get<any[]>(`${this.api}/${productId}/reviews`);
  }

  addReview(productId: number, payload: { rating: number; comment: string; }) {
    return this.http.post(`${this.api}/${productId}/reviews`, payload);
  }
}
