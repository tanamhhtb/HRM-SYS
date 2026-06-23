  import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { AuthUser, LoginRequest, LoginResponse } from '../models/auth.model';
import { AUTH_API } from '../../features/auth/auth.api';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private _currentUser = signal<AuthUser | null>(null);

  currentUser  = this._currentUser.asReadonly();
  isLoggedIn   = computed(() => this._currentUser() !== null);
  permissions  = computed(() => this._currentUser()?.permissions ?? []);

  login(request: LoginRequest) {
    return this.http.post<LoginResponse>(AUTH_API.LOGIN, request).pipe(
      tap(response => {
        localStorage.setItem('access_token', response.accessToken);
        this._currentUser.set(response.user);
      })
    );
  }

  logout() {
    localStorage.removeItem('access_token');
    this._currentUser.set(null);
  }

  getProfile() {
    return this.http.get<AuthUser>(AUTH_API.PROFILE).pipe(
      tap(user => {
        this._currentUser.set(user);
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  hasPermission(permission: string): boolean {
    return this.permissions().includes(permission);
  }

}
