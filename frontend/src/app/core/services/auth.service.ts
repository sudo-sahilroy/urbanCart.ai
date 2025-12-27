import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { tap } from 'rxjs/operators';

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'https://urbancartbackend-5npe.onrender.com/api';
  userSignal = signal<User | null>(this.getStoredUser());
  accessToken = signal<string | null>(localStorage.getItem('accessToken'));

  constructor(private http: HttpClient) {}

  signup(payload: { fullName: string; email: string; password: string; }) {
    return this.http.post<AuthResponse>(`${this.api}/auth/signup`, payload).pipe(
      tap(res => this.persist(res))
    );
  }

  login(payload: { email: string; password: string; }) {
    return this.http.post<AuthResponse>(`${this.api}/auth/login`, payload).pipe(
      tap(res => this.persist(res))
    );
  }

  refreshToken(token: string) {
    return this.http.post<AuthResponse>(`${this.api}/auth/refresh?refreshToken=${token}`, {}).pipe(
      tap(res => this.persist(res))
    );
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    this.userSignal.set(null);
    this.accessToken.set(null);
  }

  private persist(res: AuthResponse) {
    localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    localStorage.setItem('user', JSON.stringify(res.user));
    this.userSignal.set(res.user);
    this.accessToken.set(res.accessToken);
  }

  private getStoredUser(): User | null {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  }
}
