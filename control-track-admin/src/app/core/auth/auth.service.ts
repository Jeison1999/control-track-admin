import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Observable, tap } from 'rxjs';

interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'controltrack_token';
  isAuthenticated = signal(false);
  currentUser = signal<any>(null);

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
    this.checkAuth();
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.apiService.post<LoginResponse>('/auth/login', { email, password }).pipe(
      tap((response) => {
        this.setToken(response.access_token);
        this.currentUser.set(response.user);
        this.isAuthenticated.set(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private checkAuth(): void {
    const token = this.getToken();
    if (token) {
      this.isAuthenticated.set(true);
      // TODO: Opcionalmente, validar el token con el backend
      // this.apiService.get<{ user: any }>('/auth/me').subscribe({
      //   next: (res) => this.currentUser.set(res.user),
      //   error: () => this.logout()
      // });
    }
  }
}
