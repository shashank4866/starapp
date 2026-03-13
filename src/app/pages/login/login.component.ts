import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-page">
      <div class="stars-bg"></div>
      <div class="cosmos-orbs">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
      </div>

      <div class="login-container animate-fadeInScale">
        <div class="login-logo">
          <div class="rocket-wrapper">
            <span class="rocket-emoji">🚀</span>
            <div class="rocket-glow"></div>
          </div>
          <h1 class="brand-title">STARR<span class="accent">AI</span></h1>
          <p class="brand-subtitle">Galaxy of Professional Capabilities</p>
        </div>

        <div class="login-card">
          <div class="login-card-header">
            <h2>Mission Control</h2>
            <p>Identify yourself, Cosmonaut</p>
          </div>

          <form class="login-form" (ngSubmit)="onLogin()">
            <div class="form-group">
              <label class="form-label">
                <span class="label-icon">👨‍🚀</span> Cosmonaut ID
              </label>
              <input
                class="form-input"
                type="text"
                placeholder="Enter your name..."
                [(ngModel)]="username"
                name="username"
                autocomplete="username"
              />
            </div>

            <div class="form-group">
              <label class="form-label">
                <span class="label-icon">🔐</span> Access Code
              </label>
              <input
                class="form-input"
                type="password"
                placeholder="Enter access code..."
                [(ngModel)]="password"
                name="password"
                autocomplete="current-password"
              />
            </div>

            @if (error()) {
              <div class="error-message">
                ⚠️ Invalid credentials. Please try again.
              </div>
            }

            <button class="launch-btn" type="submit" [disabled]="loading()">
              @if (loading()) {
                <span class="loading-dots">Initiating Launch<span>.</span><span>.</span><span>.</span></span>
              } @else {
                🚀 Launch Mission
              }
            </button>
          </form>

          <div class="demo-creds">
            <span class="demo-label">💡 Demo:</span>
            Use any name + any password
          </div>
        </div>

        <div class="login-footer">
          <div class="footer-stats">
            <div class="stat-item">
              <span class="stat-val">3</span>
              <span class="stat-label">Galaxies</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-val">15</span>
              <span class="stat-label">Capabilities</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-val">5</span>
              <span class="stat-label">Career Levels</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      position: relative;
      overflow: hidden;
    }

    .cosmos-orbs { position: fixed; inset: 0; pointer-events: none; }

    .orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      animation: float 8s ease-in-out infinite;
    }

    .orb-1 {
      width: 400px; height: 400px;
      background: radial-gradient(circle, rgba(0,212,255,0.12), transparent);
      top: -10%; left: -5%;
      animation-delay: 0s;
    }
    .orb-2 {
      width: 350px; height: 350px;
      background: radial-gradient(circle, rgba(168,85,247,0.12), transparent);
      bottom: -10%; right: -5%;
      animation-delay: -3s;
    }
    .orb-3 {
      width: 250px; height: 250px;
      background: radial-gradient(circle, rgba(34,197,94,0.08), transparent);
      top: 50%; left: 50%; transform: translate(-50%, -50%);
      animation-delay: -6s;
    }

    .login-container {
      position: relative;
      z-index: 1;
      width: 100%;
      max-width: 440px;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .login-logo {
      text-align: center;
    }

    .rocket-wrapper {
      position: relative;
      display: inline-block;
      margin-bottom: 12px;
    }

    .rocket-emoji {
      font-size: 56px;
      display: block;
      animation: float 4s ease-in-out infinite;
      filter: drop-shadow(0 0 20px rgba(0, 212, 255, 0.6));
    }

    .rocket-glow {
      position: absolute;
      inset: -10px;
      background: radial-gradient(circle, rgba(0,212,255,0.2), transparent);
      border-radius: 50%;
      animation: pulse-glow 3s ease-in-out infinite;
    }

    .brand-title {
      font-family: 'Orbitron', monospace;
      font-size: 42px;
      font-weight: 900;
      color: #e2e8f0;
      letter-spacing: 4px;
      margin-bottom: 6px;
    }

    .brand-title .accent {
      background: linear-gradient(135deg, #00d4ff, #a855f7);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .brand-subtitle {
      color: #64748b;
      font-size: 13px;
      letter-spacing: 1px;
      text-transform: uppercase;
    }

    .login-card {
      background: rgba(10, 22, 40, 0.9);
      border: 1px solid rgba(0, 212, 255, 0.15);
      border-radius: 20px;
      padding: 32px;
      backdrop-filter: blur(30px);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.03) inset;
    }

    .login-card-header {
      text-align: center;
      margin-bottom: 28px;
    }

    .login-card-header h2 {
      font-family: 'Orbitron', monospace;
      font-size: 20px;
      color: #e2e8f0;
      margin-bottom: 6px;
    }

    .login-card-header p {
      color: #64748b;
      font-size: 13px;
    }

    .login-form { display: flex; flex-direction: column; gap: 18px; }

    .form-group { display: flex; flex-direction: column; gap: 8px; }

    .form-label {
      font-size: 12px;
      font-weight: 600;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 1px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .label-icon { font-size: 14px; }

    .form-input {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(148, 163, 184, 0.15);
      border-radius: 10px;
      padding: 12px 16px;
      color: #e2e8f0;
      font-family: 'Exo 2', sans-serif;
      font-size: 14px;
      transition: all 0.2s ease;
      outline: none;
      width: 100%;
    }

    .form-input::placeholder { color: #475569; }

    .form-input:focus {
      border-color: rgba(0, 212, 255, 0.5);
      background: rgba(0, 212, 255, 0.05);
      box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.1);
    }

    .error-message {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.3);
      border-radius: 8px;
      padding: 10px 14px;
      color: #fca5a5;
      font-size: 13px;
      text-align: center;
    }

    .launch-btn {
      width: 100%;
      padding: 14px;
      background: linear-gradient(135deg, #00d4ff, rgba(0, 150, 220, 0.9));
      border: none;
      border-radius: 10px;
      color: #000;
      font-family: 'Orbitron', monospace;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 1px;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 0 25px rgba(0, 212, 255, 0.3);
      margin-top: 4px;
    }

    .launch-btn:hover:not(:disabled) {
      box-shadow: 0 0 40px rgba(0, 212, 255, 0.6);
      transform: translateY(-1px);
    }

    .launch-btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .loading-dots span {
      animation: blink 1.2s infinite;
    }
    .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
    .loading-dots span:nth-child(3) { animation-delay: 0.4s; }

    @keyframes blink {
      0%, 80%, 100% { opacity: 0; }
      40% { opacity: 1; }
    }

    .demo-creds {
      text-align: center;
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid rgba(255,255,255,0.05);
      color: #475569;
      font-size: 12px;
    }

    .demo-label { color: #f59e0b; margin-right: 4px; }

    .login-footer {}

    .footer-stats {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 24px;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 12px;
      padding: 16px;
    }

    .stat-item { text-align: center; }
    .stat-val {
      display: block;
      font-family: 'Orbitron', monospace;
      font-size: 22px;
      font-weight: 700;
      color: #00d4ff;
    }
    .stat-label {
      font-size: 11px;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .stat-divider {
      width: 1px;
      height: 32px;
      background: rgba(255,255,255,0.08);
    }
  `]
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  username = '';
  password = '';
  error = signal(false);
  loading = signal(false);

  onLogin() {
    this.error.set(false);
    this.loading.set(true);
    setTimeout(() => {
      if (this.auth.login(this.username, this.password)) {
        this.router.navigate(['/dashboard']);
      } else {
        this.error.set(true);
      }
      this.loading.set(false);
    }, 900);
  }
}
