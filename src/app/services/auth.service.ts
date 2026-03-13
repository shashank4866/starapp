import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _isLoggedIn = signal(false);
  private _role = signal<string>('');

  constructor(private router: Router) {
    // Persist login across refreshes
    this._isLoggedIn.set(!!sessionStorage.getItem('cosmonaut_logged_in'));
    this._role.set(sessionStorage.getItem('cosmonaut_role') || '');
  }

  login(username: string, password: string, role: string): boolean {
    // Mock auth: any non-empty credentials work
    if (username.trim() && password.trim() && role) {
      sessionStorage.setItem('cosmonaut_logged_in', 'true');
      sessionStorage.setItem('cosmonaut_name', username);
      sessionStorage.setItem('cosmonaut_role', role);
      this._isLoggedIn.set(true);
      this._role.set(role);
      return true;
    }
    return false;
  }

  logout() {
    sessionStorage.clear();
    this._isLoggedIn.set(false);
    this._role.set('');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this._isLoggedIn();
  }

  getUsername(): string {
    return sessionStorage.getItem('cosmonaut_name') || 'Cosmonaut';
  }
  
  getRole(): string {
    return this._role() || 'SD';
  }
}
