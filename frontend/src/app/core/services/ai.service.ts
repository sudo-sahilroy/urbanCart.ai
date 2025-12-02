import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

interface RecommendationResponse {
  recommendations: Product[];
}

@Injectable({ providedIn: 'root' })
export class AiService {
  private api = 'http://localhost:8080/api/ai';
  constructor(private http: HttpClient) {}

  recommend(query: string): Observable<RecommendationResponse> {
    return this.http.post<RecommendationResponse>(`${this.api}/recommend`, { query });
  }
}
