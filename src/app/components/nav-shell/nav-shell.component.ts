import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { GameStateService } from '../../services/game-state.service';

@Component({
  selector: 'app-nav-shell',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <nav class="nav-shell">
      <div class="nav-inner">
        <a routerLink="/dashboard" class="nav-brand">
          <span class="brand-icon">🚀</span>
          <span class="brand-text">Starapp</span>
        </a>

        <div class="nav-links">
          <a routerLink="/dashboard" routerLinkActive="active" class="nav-link">
            <span class="nav-icon">🏠</span><span>Dashboard</span>
          </a>
          <a routerLink="/galaxy" routerLinkActive="active" class="nav-link">
            <span class="nav-icon">🌌</span><span>Galaxy</span>
          </a>
          <a routerLink="/achievements" routerLinkActive="active" class="nav-link">
            <span class="nav-icon">🏆</span><span>Achievements</span>
          </a>
          <a routerLink="/profile" routerLinkActive="active" class="nav-link">
            <span class="nav-icon">👨‍🚀</span><span>Profile</span>
          </a>
        </div>

        <div class="nav-right">
          <div class="level-pill" title="Cosmonaut Level">
            <span class="level-icon">⭐</span>
            <span class="font-orbitron">LVL {{ level() }}</span>
          </div>
          <div class="xp-pill">
            <span class="xp-icon">⚡</span>
            <span class="xp-value font-orbitron">{{ totalXp() }} XP</span>
          </div>
          <div class="streak-pill" title="Current streak">
            <span>🔥</span>
            <span class="font-orbitron">{{ streak() }}</span>
          </div>
          <button class="logout-btn" (click)="logout()" title="Launch back to base">⏻</button>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .nav-shell {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: rgba(2, 8, 23, 0.98);
      border-bottom: 1px solid rgba(0, 212, 255, 0.15);
    }

    .nav-inner {
      display: flex;
      align-items: center;
      gap: 24px;
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 24px;
      height: 64px;
    }

    .nav-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      flex-shrink: 0;
    }

    .brand-icon { font-size: 24px; }

    .brand-text {
      font-family: 'Orbitron', monospace;
      font-size: 18px;
      font-weight: 800;
      background: linear-gradient(135deg, #00d4ff, #a855f7);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: 2px;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 4px;
      flex: 1;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      border-radius: 8px;
      text-decoration: none;
      color: #94a3b8;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.2s ease;
      position: relative;
    }

    .nav-icon { font-size: 16px; }

    .nav-link:hover {
      background: rgba(0, 212, 255, 0.08);
      color: #00d4ff;
    }

    .nav-link.active {
      background: rgba(0, 212, 255, 0.12);
      color: #00d4ff;
    }

    .nav-link.active::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 50%;
      transform: translateX(-50%);
      width: 20px;
      height: 2px;
      background: #00d4ff;
      border-radius: 1px;
      box-shadow: 0 0 8px #00d4ff;
    }

    .nav-right {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-left: auto;
    }

    .level-pill {
      display: flex;
      align-items: center;
      gap: 6px;
      background: linear-gradient(135deg, rgba(0,212,255,0.1), rgba(168,85,247,0.1));
      border: 1px solid rgba(0,212,255,0.3);
      border-radius: 100px;
      padding: 5px 14px;
      font-size: 13px;
      color: #00d4ff;
      font-weight: 700;
      box-shadow: 0 0 10px rgba(0,212,255,0.15);
    }
    
    .level-icon { font-size: 14px; animation: pulse-glow 2s infinite; }

    .xp-pill {
      display: flex;
      align-items: center;
      gap: 6px;
      background: rgba(245, 158, 11, 0.1);
      border: 1px solid rgba(245, 158, 11, 0.3);
      border-radius: 100px;
      padding: 5px 14px;
      font-size: 13px;
    }

    .xp-icon { font-size: 14px; }
    .xp-value { color: #f59e0b; font-weight: 700; font-size: 13px; }

    .streak-pill {
      display: flex;
      align-items: center;
      gap: 4px;
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.3);
      border-radius: 100px;
      padding: 5px 12px;
      font-size: 13px;
      color: #fca5a5;
      font-family: 'Orbitron', monospace;
      font-weight: 700;
    }

    .logout-btn {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      color: #94a3b8;
      border-radius: 8px;
      width: 36px;
      height: 36px;
      cursor: pointer;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }

    .logout-btn:hover {
      background: rgba(239, 68, 68, 0.15);
      border-color: rgba(239,68,68,0.4);
      color: #ef4444;
    }

    @media (max-width: 768px) {
      .nav-links span:not(.nav-icon) { display: none; }
      .xp-pill .xp-icon { display: none; }
    }
  `]
})
export class NavShellComponent {
  private auth = inject(AuthService);
  private gameState = inject(GameStateService);

  totalXp = this.gameState.totalXp;
  streak = () => this.gameState.profile().streak;
  level = () => this.gameState.profile().level;

  logout() { this.auth.logout(); }
}
