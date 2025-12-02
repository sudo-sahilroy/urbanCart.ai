import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private api = 'http://localhost:8080/api/users';
  constructor(private http: HttpClient) {}

  me(): Observable<User> {
    return this.http.get<User>(`${this.api}/me`);
  }

  update(payload: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.api}/me`, payload);
  }
}
