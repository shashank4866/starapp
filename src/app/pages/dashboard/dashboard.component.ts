import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameStateService } from '../../services/game-state.service';
import { AuthService } from '../../services/auth.service';
import { Capability } from '../../models/capability.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="dashboard-page">
      <div class="content-wrapper">
        <!-- Header -->
        <div class="dash-header animate-fadeInUp">
          <div class="greeting-section">
            <div class="cosmo-avatar">👨‍🚀</div>
            <div class="greeting-text">
              <div class="greeting-sub">Welcome back, Cosmonaut</div>
              <h1 class="greeting-name">{{ username }}</h1>
              <div class="title-badge badge badge-blue">🌌 {{ profile().title }}</div>
            </div>
          </div>
          <div class="dash-actions">
            <a routerLink="/galaxy" class="btn-neon">Explore Galaxy 🚀</a>
          </div>
        </div>

        <!-- Stats Row -->
        <div class="stats-grid animate-fadeInUp">
          <div class="stat-card">
            <div class="stat-icon">⚡</div>
            <div class="stat-content">
              <div class="stat-number font-orbitron">{{ profile().totalXp }}</div>
              <div class="stat-label">Total XP Earned</div>
            </div>
            <div class="stat-glow stat-glow-blue"></div>
          </div>
          <div class="stat-card streak-card">
            <div class="stat-icon streak-flame">🔥</div>
            <div class="stat-content">
              <div class="stat-number font-orbitron">{{ profile().streak }}</div>
              <div class="stat-label">Burn Streak</div>
            </div>
            <div class="stat-glow stat-glow-red"></div>
            @if (profile().streak > 0) {
              <div class="streak-particles"></div>
            }
          </div>
          <div class="stat-card">
            <div class="stat-icon pulse">✅</div>
            <div class="stat-content">
              <div class="stat-number font-orbitron">{{ completedCount() }}</div>
              <div class="stat-label">Missions Cleared</div>
            </div>
            <div class="stat-glow stat-glow-green"></div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🏆</div>
            <div class="stat-content">
              <div class="stat-number font-orbitron">{{ unlockedAchievements() }}</div>
              <div class="stat-label">Achievements</div>
            </div>
            <div class="stat-glow stat-glow-gold"></div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="dash-main">
          <!-- Capability Progress -->
          <div class="dash-section animate-fadeInUp">
            <div class="section-header">
              <h2 class="section-title">Capability Galaxies</h2>
              <a routerLink="/galaxy" class="section-link">View All →</a>
            </div>
            <div class="cap-progress-list">
              @for (cap of capabilities(); track cap.id) {
                <a [routerLink]="['/capability', cap.id]" class="cap-progress-card" [style.--glow]="cap.glowColor">
                  <div class="cap-icon-wrap">
                    <span class="cap-icon floating-icon">{{ cap.icon }}</span>
                    <div class="cap-icon-glow pulse" [style.background]="cap.glowColor"></div>
                  </div>
                  <div class="hologram-glare"></div>
                  <div class="cap-info">
                    <div class="cap-name">{{ cap.name }}</div>
                    <div class="cap-desc">{{ cap.description | slice:0:60 }}...</div>
                    <div class="progress-row">
                      <div class="progress-bar">
                        <div class="progress-fill" [style.width.%]="getProgress(cap)" [style.background]="'linear-gradient(90deg, ' + cap.color + ', ' + cap.color + '88)'"></div>
                      </div>
                      <span class="prog-pct font-orbitron" [style.color]="cap.color">{{ getProgress(cap) }}%</span>
                    </div>
                  </div>
                  <div class="cap-arrow">→</div>
                </a>
              }
            </div>
          </div>

          <!-- Sidebar -->
          <div class="dash-sidebar">
            <!-- Level Progress Ring -->
            <div class="hud-card level-card animate-fadeInUp">
              <div class="level-card-title">Clearance Level</div>
              <div class="radial-ring-wrap">
                <div class="xp-orb orb-1"></div>
                <div class="xp-orb orb-2"></div>
                <div class="xp-orb orb-3"></div>
                <svg width="120" height="120" class="radial-svg" style="filter: drop-shadow(0 0 10px rgba(0,212,255,0.4));">
                  <circle cx="60" cy="60" r="50" class="ring-track" />
                  <circle cx="60" cy="60" r="50" class="ring-fill"
                    [style.strokeDasharray]="'314'"
                    [style.strokeDashoffset]="314 - (314 * levelProgress() / 100)"
                    [attr.stroke]="'#00d4ff'"
                  />
                </svg>
                <div class="ring-label">
                  <div class="ring-level font-orbitron">{{ profile().level }}</div>
                  <div class="ring-sublabel">LVL</div>
                </div>
              </div>
              <div class="level-xp-info">
                <div class="xp-current font-orbitron">{{ profile().totalXp }} <span>XP</span></div>
                <div class="xp-next">Next: {{ nextLevelXp() }} XP</div>
              </div>
            </div>

            <!-- Quick Achievements -->
            <div class="hud-card achievements-preview animate-fadeInUp">
              <div class="section-header">
                <h3 class="section-title small">Recent Achievements</h3>
                <a routerLink="/achievements" class="section-link">All →</a>
              </div>
              @for (ach of recentAchievements(); track ach.id) {
                <div class="ach-item" [class.unlocked]="ach.unlocked">
                  <span class="ach-icon">{{ ach.icon }}</span>
                  <div class="ach-content">
                    <div class="ach-title">{{ ach.title }}</div>
                    <div class="ach-desc">{{ ach.description }}</div>
                  </div>
                  @if (!ach.unlocked) {
                    <span class="lock-icon">🔒</span>
                  }
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-page {
      padding: 32px 0 64px;
      min-height: calc(100vh - 64px);
    }

    /* Header */
    .dash-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 28px;
      flex-wrap: wrap;
      gap: 16px;
    }

    .greeting-section {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .cosmo-avatar {
      font-size: 56px;
      filter: drop-shadow(0 0 16px rgba(0,212,255,0.4));
      animation: float 6s ease-in-out infinite;
    }

    .greeting-sub { color: #64748b; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
    .greeting-name { font-family: 'Orbitron', monospace; font-size: 28px; font-weight: 800; color: #e2e8f0; margin-bottom: 8px; }

    /* Stats */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-bottom: 28px;
    }

    .stat-card {
      background: rgba(10, 22, 40, 0.9);
      border: 1px solid rgba(0, 212, 255, 0.2);
      border-radius: 4px;
      padding: 20px;
      display: flex;
      align-items: center;
      gap: 16px;
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
      clip-path: polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px);
    }

    .stat-card:hover { transform: translateY(-3px); border-color: rgba(0,212,255,0.3); }

    .stat-icon { font-size: 28px; }
    .stat-number { font-size: 26px; font-weight: 700; color: #e2e8f0; }
    .stat-label { font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 2px; }

    .stat-glow {
      position: absolute;
      bottom: -20px; right: -20px;
      width: 70px; height: 70px;
      border-radius: 50%;
      filter: blur(25px);
      opacity: 0.4;
    }
    .stat-glow-blue { background: #00d4ff; }
    .stat-glow-red { background: #ef4444; }
    .stat-glow-green { background: #22c55e; }
    .stat-glow-gold { background: #f59e0b; }

    /* Main Layout */
    .dash-main {
      display: grid;
      grid-template-columns: 1fr 320px;
      gap: 24px;
      align-items: start;
    }

    .dash-section {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
    }

    .section-title {
      font-family: 'Orbitron', monospace;
      font-size: 16px;
      color: #e2e8f0;
    }

    .section-title.small { font-size: 14px; }

    .section-link {
      color: #00d4ff;
      text-decoration: none;
      font-size: 13px;
      transition: opacity 0.2s;
    }

    .section-link:hover { opacity: 0.8; }

    /* Capability Progress Card */
    .cap-progress-card {
      display: flex;
      align-items: center;
      gap: 16px;
      background: rgba(10,22,40,0.9);
      border: 1px solid rgba(148,163,184,0.1);
      border-radius: 16px;
      padding: 16px 20px;
      text-decoration: none;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .cap-progress-card::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse 60% 80% at 0% 50%, var(--glow), transparent);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .cap-progress-card:hover::before { opacity: 1; }

    .cap-progress-card:hover {
      transform: translateX(4px);
      border-color: rgba(148,163,184,0.25);
    }

    .cap-icon-wrap {
      position: relative;
      flex-shrink: 0;
    }

    .cap-icon { font-size: 36px; display: block; }
    .floating-icon { animation: float 4s ease-in-out infinite; }

    .cap-icon-glow {
      position: absolute;
      inset: -6px;
      border-radius: 50%;
      opacity: 0.3;
      filter: blur(10px);
    }
    .cap-icon-glow.pulse { animation: pulse-glow 3s infinite; }

    .cap-info { flex: 1; min-width: 0; }
    .cap-name { font-family: 'Orbitron', monospace; font-size: 15px; font-weight: 700; color: #e2e8f0; margin-bottom: 4px; }
    .cap-desc { color: #64748b; font-size: 12px; margin-bottom: 10px; }

    .progress-row { display: flex; align-items: center; gap: 10px; }
    .progress-bar { flex: 1; }
    .prog-pct { font-size: 13px; font-weight: 700; flex-shrink: 0; }

    .cap-arrow { color: #475569; font-size: 18px; transition: transform 0.2s; flex-shrink: 0; }
    .cap-progress-card:hover .cap-arrow { color: #00d4ff; transform: translateX(4px); }

    /* Hologram Glare Effect */
    .hologram-glare {
      position: absolute;
      top: 0; left: -100%; width: 50%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
      transform: skewX(-20deg);
      transition: left 0.5s;
    }
    .cap-progress-card:hover .hologram-glare { left: 150%; }

    /* Sidebar */
    .dash-sidebar { display: flex; flex-direction: column; gap: 20px; }

    /* Level Card */
    .level-card {
      padding: 24px;
      text-align: center;
    }

    .level-card-title {
      font-family: 'Orbitron', monospace;
      font-size: 13px;
      font-weight: 600;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 20px;
    }

    .radial-ring-wrap {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
    }

    .radial-svg { transform: rotate(-90deg); }

    .ring-track { fill: none; stroke: rgba(255,255,255,0.05); stroke-width: 8; }
    .ring-fill { fill: none; stroke-width: 8; stroke-linecap: round; transition: stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1); filter: drop-shadow(0 0 10px #00d4ff); }

    /* Floating XP Orbs */
    .xp-orb {
      position: absolute; width: 6px; height: 6px;
      background: #00d4ff; border-radius: 50%;
      box-shadow: 0 0 10px #00d4ff;
    }
    .orb-1 { top: 10px; left: 20px; animation: orbit 4s linear infinite; }
    .orb-2 { bottom: 20px; right: 10px; animation: orbit 5s linear infinite reverse; }
    .orb-3 { top: 40px; right: 5px; animation: orbit 3s linear infinite; }

    .ring-label {
      position: absolute;
      text-align: center;
    }

    .ring-level { font-size: 28px; font-weight: 800; color: #00d4ff; }
    .ring-sublabel { font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; }

    .level-xp-info { }
    .xp-current { font-size: 22px; font-weight: 700; color: #f59e0b; }
    .xp-current span { font-size: 14px; color: #64748b; }
    .xp-next { font-size: 12px; color: #64748b; margin-top: 4px; }

    /* Achievements Preview */
    .achievements-preview { padding: 20px; }

    .ach-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 0;
      border-bottom: 1px solid rgba(255,255,255,0.04);
      opacity: 0.4;
      transition: opacity 0.2s;
    }

    .ach-item:last-child { border-bottom: none; }
    .ach-item.unlocked { opacity: 1; }

    .ach-icon { font-size: 24px; flex-shrink: 0; }
    .ach-content { flex: 1; min-width: 0; }
    .ach-title { font-size: 13px; font-weight: 600; color: #e2e8f0; }
    .ach-desc { font-size: 11px; color: #64748b; }
    .lock-icon { font-size: 14px; flex-shrink: 0; }

    @media (max-width: 1024px) {
      .stats-grid { grid-template-columns: repeat(2, 1fr); }
      .dash-main { grid-template-columns: 1fr; }
      .dash-sidebar { flex-direction: row; flex-wrap: wrap; }
      .dash-sidebar > * { flex: 1; min-width: 280px; }
    }

    @media (max-width: 640px) {
      .stats-grid { grid-template-columns: repeat(2, 1fr); }
      .greeting-section { flex-direction: column; text-align: center; }
    }
  `]
})
export class DashboardComponent {
  private gameState = inject(GameStateService);
  private auth = inject(AuthService);

  username = this.auth.getUsername();
  capabilities = this.gameState.capabilities;
  profile = this.gameState.profile;
  achievements = this.gameState.achievements;

  completedCount = computed(() => {
    let count = 0;
    this.capabilities().forEach(cap =>
      cap.subCapabilities.forEach(sub =>
        sub.levels.forEach(lv =>
          lv.tasks.forEach(t => { if (t.completed) count++; })
        )
      )
    );
    return count;
  });

  unlockedAchievements = computed(() =>
    this.achievements().filter(a => a.unlocked).length
  );

  levelProgress = computed(() => {
    const xp = this.profile().totalXp;
    const currentLevelXp = (this.profile().level - 1) * 500;
    return Math.min(100, Math.round(((xp - currentLevelXp) / 500) * 100));
  });

  nextLevelXp = computed(() => this.profile().level * 500);

  recentAchievements = computed(() => this.achievements().slice(0, 4));

  getProgress(cap: Capability): number {
    return this.gameState.getProgressPercent(cap);
  }
}
