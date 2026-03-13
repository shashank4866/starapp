import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-role-overview',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="role-page">
      <div class="stars-bg"></div>
      
      <div class="content-wrapper">
        <div class="role-header animate-fadeInUp">
          <h1 class="font-orbitron">STAR App - Play and Prove!</h1>
          <p class="role-subtitle">Identify your position and plot your trajectory</p>
        </div>

        <div class="role-content animate-fadeInScale">
          <!-- Role Details -->
          <div class="hud-card role-info-card">
            <div class="role-title">
              <span class="role-abbr font-orbitron">{{ currentRole }}</span>
              <h2>{{ roleName }}</h2>
              <span class="role-tagline">{{ roleTagline }}</span>
            </div>
            <p class="role-desc">{{ roleDescription }}</p>
          </div>

          <!-- Earn to Shift Orbits Table -->
          <div class="hud-card table-card">
            <h3 class="table-title font-orbitron">Earn to shift orbits</h3>
            
            <div class="star-table-container">
              <table class="star-table">
                <thead>
                  <tr>
                    <th class="band-col">Band</th>
                    <th class="learn-col"><span class="icon">🎖️</span> Learning</th>
                    <th class="earn-col"><span class="icon">🔰</span> Earning</th>
                    <th class="contribute-col"><span class="icon">🛡️</span> Contribution</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="row-b1">
                    <td class="band-cell font-orbitron">B1</td>
                    <td>3 (C,L,T)</td>
                    <td>1 (Keystone)</td>
                    <td>1 (Internal)</td>
                  </tr>
                  <tr class="row-b2">
                    <td class="band-cell font-orbitron">B2</td>
                    <td>3 (C,L,T)</td>
                    <td>1 (Keystone) + 3 (Customer)</td>
                    <td>3 (Internal)</td>
                  </tr>
                  <tr class="row-b3">
                    <td class="band-cell font-orbitron">B3</td>
                    <td>3 (C,L,T)</td>
                    <td>5 (Customer)</td>
                    <td>3 (Internal) + 1 (Customer)</td>
                  </tr>
                  <tr class="row-b4">
                    <td class="band-cell font-orbitron">B4</td>
                    <td>3 (C,L,T)</td>
                    <td>7 (Customer)</td>
                    <td>7 (Customer)</td>
                  </tr>
                  <tr class="row-b5">
                    <td class="band-cell font-orbitron">B5</td>
                    <td>3 (C,L,T)</td>
                    <td>9 (Customer)</td>
                    <td>9 (Customer)</td>
                  </tr>
                  <tr class="row-b6">
                    <td class="band-cell font-orbitron">B6</td>
                    <td>3 (C,L,T)</td>
                    <td>12 (Customer)</td>
                    <td>12 (Customer)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="actions">
            <button class="btn-neon launch-dashboard-btn" (click)="proceed()">
              Proceed to Mission Control 🚀
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .role-page {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      position: relative;
      overflow-x: hidden;
      padding: 40px 0 80px;
    }
    
    .content-wrapper {
      position: relative;
      z-index: 10;
      max-width: 1100px;
      margin: 0 auto;
      padding: 0 24px;
      width: 100%;
    }
    
    .role-header {
      text-align: center;
      margin-bottom: 40px;
    }
    
    .role-header h1 {
      font-size: 42px;
      font-weight: 900;
      color: #fff;
      text-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
      margin-bottom: 8px;
    }
    
    .role-subtitle {
      color: #94a3b8;
      font-size: 16px;
      letter-spacing: 1px;
    }
    
    .role-content {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }
    
    .role-info-card {
      background: rgba(10, 22, 40, 0.95);
      border-color: rgba(0, 212, 255, 0.4);
      display: flex;
      flex-direction: column;
      gap: 16px;
      border-left: 4px solid var(--neon-blue);
    }
    
    .role-title {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
    }
    
    .role-abbr {
      font-size: 24px;
      font-weight: 800;
      color: var(--neon-blue);
    }
    
    .role-title h2 {
      font-size: 24px;
      color: #e2e8f0;
      margin: 0;
    }
    
    .role-tagline {
      color: var(--neon-purple);
      font-style: italic;
      font-weight: 600;
      margin-left: auto;
    }
    
    .role-desc {
      color: #cbd5e1;
      font-size: 15px;
      line-height: 1.6;
    }
    
    .table-card {
      background: rgba(10, 22, 40, 0.95);
      padding: 0; /* Table handles padding */
      overflow: hidden;
      border: 1px solid rgba(148,163,184,0.2);
    }
    
    .table-title {
      text-align: center;
      padding: 20px;
      background: rgba(0,212,255,0.05);
      color: #e2e8f0;
      font-size: 20px;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    
    .star-table-container {
      overflow-x: auto;
    }
    
    .star-table {
      width: 100%;
      border-collapse: collapse;
      text-align: center;
    }
    
    .star-table th, .star-table td {
      padding: 16px;
      border: 1px solid rgba(255,255,255,0.05);
    }
    
    .star-table th {
      background: #dbeafe;
      color: #0f172a;
      font-weight: 700;
      font-size: 15px;
    }
    
    .star-table th .icon { margin-right: 6px; }
    
    .star-table td {
      color: #0f172a;
      font-weight: 600;
      font-size: 14px;
    }
    
    .band-col { background: #fef3c7 !important; }
    .learn-col { background: #dbeafe !important; }
    .earn-col { background: #fef3c7 !important; }
    .contribute-col { background: #dcfce7 !important; }
    
    .band-cell {
      background: transparent !important;
      font-weight: 800 !important;
      font-size: 16px !important;
    }
    
    /* Alternating Band Backgrounds */
    .row-b1 .band-cell, .row-b2 .band-cell, .row-b3 .band-cell { background: #facc15 !important; }
    .row-b4 .band-cell, .row-b5 .band-cell, .row-b6 .band-cell { background: #eab308 !important; }
    
    .row-b1 td:nth-child(2), .row-b2 td:nth-child(2), .row-b3 td:nth-child(2), .row-b4 td:nth-child(2), .row-b5 td:nth-child(2), .row-b6 td:nth-child(2) { background: #bfdbfe; }
    
    .row-b1 td:nth-child(3), .row-b2 td:nth-child(3), .row-b3 td:nth-child(3) { background: #fef08a; }
    .row-b4 td:nth-child(3), .row-b5 td:nth-child(3), .row-b6 td:nth-child(3) { background: #fde047; }
    
    .row-b1 td:nth-child(4), .row-b2 td:nth-child(4), .row-b3 td:nth-child(4) { background: #bbf7d0; }
    .row-b4 td:nth-child(4), .row-b5 td:nth-child(4), .row-b6 td:nth-child(4) { background: #86efac; }
    
    .actions {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
    
    .launch-dashboard-btn {
      font-size: 18px;
      padding: 16px 40px;
      box-shadow: 0 0 30px rgba(0, 212, 255, 0.4);
    }
    
    @media (max-width: 768px) {
      .role-header h1 { font-size: 28px; }
      .star-table th, .star-table td { padding: 10px 8px; font-size: 12px; }
      .band-cell { font-size: 14px !important; }
      .role-tagline { margin-left: 0; width: 100%; }
    }
  `]
})
export class RoleOverviewComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  currentRole = this.auth.getRole();

  get roleName() {
    return this.currentRole === 'SD' ? 'Solutions Designer' : 'Systems Engineer';
  }

  get roleTagline() {
    return this.currentRole === 'SD' ? 'Need to Blueprint' : 'Blueprint to Operations';
  }

  get roleDescription() {
    if (this.currentRole === 'SD') {
      return 'Designs outcome-oriented data and AI solutions that translate business problems into structured architectures, workflows, and intelligence components. Responsible for connecting customer context, data, analytics, and actions into a coherent solution blueprint that enables measurable business outcomes.';
    }
    return 'Builds and integrates the technical systems that bring solution designs to life. Responsible for implementing and operating data pipelines, intelligence services, workflows, and infrastructure that reliably convert data into decisions and automated actions at enterprise scale.';
  }

  proceed() {
    this.router.navigate(['/dashboard']);
  }
}
