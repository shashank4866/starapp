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
      
      <!-- Top Section: Login/Hero -->
      <div class="hero-section">
        <div class="login-container animate-fadeInScale">
        <div class="login-logo">
          <div class="rocket-wrapper">
            <span class="rocket-emoji">🚀</span>
            <div class="rocket-glow"></div>
          </div>
          <h1 class="brand-title">Star<span class="accent">app</span></h1>
          <p class="brand-subtitle font-orbitron">Play and Prove</p>
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
            
            <div class="form-group">
              <label class="form-label">
                <span class="label-icon">🎯</span> Select Role
              </label>
              <select class="form-input" [(ngModel)]="role" name="role">
                <option value="SD">Solution Designer (SD)</option>
                <option value="SE">Systems Engineer (SE)</option>
              </select>
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
                <span class="stat-val">6</span>
                <span class="stat-label">Growth Bands</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Section: Get Set Go Staircase -->
      <div class="journey-section">
        <h2 class="journey-title font-orbitron">Get! Set!! Go!!!</h2>
        <div class="staircase-container">
          <div class="rocket-overlay">🚀</div>
          <div class="stair step-1">
            <span class="level-name">Trainee</span>
          </div>
          <div class="stair step-2">
            <span class="level-name">Associate</span>
          </div>
          <div class="stair step-3">
            <span class="level-name">Expert</span>
          </div>
          <div class="stair step-4">
            <span class="level-name">Lead</span>
          </div>
          <div class="stair step-5">
            <span class="level-name">Architect</span>
          </div>
          <div class="stair step-6">
            <span class="level-name">Principal</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-page {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      position: relative;
      overflow-x: hidden;
    }
    
    .hero-section {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      position: relative;
      z-index: 10;
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
    
    /* Staircase Section */
    .journey-section {
      padding: 100px 24px 140px;
      position: relative;
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: linear-gradient(to bottom, transparent, rgba(2, 8, 23, 0.9));
    }
    
    .journey-title {
      font-size: 42px;
      font-weight: 800;
      color: #fff;
      text-shadow: 0 0 20px rgba(255,255,255,0.4);
      margin-bottom: 80px;
      text-align: center;
    }
    
    .staircase-container {
      position: relative;
      display: flex;
      align-items: flex-end;
      gap: 0;
      height: 400px;
      width: 100%;
      max-width: 1000px;
      margin: 0 auto;
      padding-left: 100px;
    }
    
    .rocket-overlay {
      position: absolute;
      left: 0;
      bottom: 20px;
      font-size: 100px;
      filter: drop-shadow(0 0 30px rgba(0, 212, 255, 0.6));
      animation: climb 4s ease-in-out infinite alternate;
      z-index: 20;
    }
    
    @keyframes climb {
      0% { transform: translate(0, 0) rotate(15deg); }
      100% { transform: translate(40px, -40px) rotate(25deg); }
    }
    
    .stair {
      flex: 1;
      height: 20%;
      background: linear-gradient(180deg, #fefce8, #fef08a);
      border-top: 4px solid #facc15;
      border-right: 2px solid rgba(0,0,0,0.1);
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding-top: 20px;
      box-shadow: 5px 0 15px rgba(0,0,0,0.3) inset;
      transition: all 0.3s ease;
      position: relative;
    }
    
    .stair::after {
      content: ''; position: absolute; left: 0; bottom: -100px; width: 100%; height: 100px;
      background: linear-gradient(180deg, rgba(250, 204, 21, 0.05), transparent);
    }
    
    .stair:hover { filter: brightness(1.1); transform: translateY(-2px); }
    .stair:hover .level-name { transform: scale(1.05); }
    
    .step-1 { height: 10%; background: #fef9c3; border-top-color: #fde047; }
    .step-2 { height: 25%; background: #fef08a; border-top-color: #facc15; }
    .step-3 { height: 40%; background: #fde047; border-top-color: #eab308; }
    .step-4 { height: 55%; background: #facc15; border-top-color: #ca8a04; }
    .step-5 { height: 70%; background: #eab308; border-top-color: #a16207; }
    .step-6 { height: 85%; background: #ca8a04; border-top-color: #713f12; }
    
    .level-name {
      color: #000;
      font-weight: 700;
      font-size: 16px;
      font-family: 'Exo 2', sans-serif;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      text-shadow: 0 1px 2px rgba(255,255,255,0.5);
      transition: all 0.2s;
    }
    
    @media (max-width: 768px) {
      .staircase-container { padding-left: 20px; height: 300px; }
      .level-name { font-size: 11px; writing-mode: vertical-rl; text-orientation: mixed; padding-top: 10px; }
      .rocket-overlay { font-size: 60px; left: -20px; }
    }
  `]
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  username = '';
  password = '';
  role = 'SD';
  error = signal(false);
  loading = signal(false);

  onLogin() {
    this.error.set(false);
    this.loading.set(true);
    setTimeout(() => {
      if (this.auth.login(this.username, this.password, this.role)) {
        this.router.navigate(['/role']);
      } else {
        this.error.set(true);
      }
      this.loading.set(false);
    }, 900);
  }
}
