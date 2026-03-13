import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _isLoggedIn = signal(false);

  constructor(private router: Router) {
    // Persist login across refreshes
    this._isLoggedIn.set(!!sessionStorage.getItem('cosmonaut_logged_in'));
  }

  login(username: string, password: string): boolean {
    // Mock auth: any non-empty credentials work
    if (username.trim() && password.trim()) {
      sessionStorage.setItem('cosmonaut_logged_in', 'true');
      sessionStorage.setItem('cosmonaut_name', username);
      this._isLoggedIn.set(true);
      return true;
    }
    return false;
  }

  logout() {
    sessionStorage.clear();
    this._isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this._isLoggedIn();
  }

  getUsername(): string {
    return sessionStorage.getItem('cosmonaut_name') || 'Cosmonaut';
  }
}
