import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GameStateService } from '../../services/game-state.service';
import { AuthService } from '../../services/auth.service';
import { Capability } from '../../models/capability.model';

const LEVEL_TITLES = [
  'Junior Cosmonaut',
  'Cosmonaut',
  'Senior Cosmonaut',
  'Space Commander',
  'Galaxy Admiral',
];

const CAREER_LEVELS = [
  'Solution Trainee',
  'Solution Architect',
  'Solution Lean',
  'Solution Principal',
  'Solution Principal Architect',
];

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="profile-page">
      <div class="content-wrapper">

        <!-- Profile Hero -->
        <div class="profile-hero animate-fadeInUp">
          <div class="hero-bg-glow"></div>
          <div class="profile-avatar-wrap">
            <div class="profile-avatar">👨‍🚀</div>
            <div class="avatar-ring"></div>
            <div class="avatar-level-badge font-orbitron">{{ profile().level }}</div>
          </div>
          <div class="profile-identity">
            <h1 class="profile-name">{{ username }}</h1>
            <div class="profile-title gradient-text">{{ currentTitle() }}</div>
            <div class="profile-meta">
              <span class="meta-item">🔥 {{ profile().streak }} day streak</span>
              <span class="meta-item">⚡ {{ profile().totalXp }} XP</span>
              <span class="meta-item">📅 Joined {{ profile().joinDate | date:'MMM yyyy' }}</span>
            </div>
          </div>
          <div class="profile-actions">
            <a routerLink="/galaxy" class="btn-neon">Continue Mission 🚀</a>
          </div>
        </div>

        <!-- Level Progression Path -->
        <div class="career-section animate-fadeInUp">
          <h2 class="section-heading">Career Progression Path</h2>
          <div class="career-path">
            @for (lvl of careerLevels; track lvl; let i = $index) {
              <div class="career-node" [class.reached]="i < currentCareerIdx()">
                <div class="career-node-circle" [class.active]="i === currentCareerIdx()">
                  @if (i < currentCareerIdx()) {
                    <span>✓</span>
                  } @else if (i === currentCareerIdx()) {
                    <span>🚀</span>
                  } @else {
                    <span>{{ i + 1 }}</span>
                  }
                </div>
                <div class="career-node-label" [class.active-label]="i === currentCareerIdx()">{{ lvl }}</div>
                @if (i < careerLevels.length - 1) {
                  <div class="career-connector" [class.active]="i < currentCareerIdx()"></div>
                }
              </div>
            }
          </div>
        </div>

        <div class="profile-main">

          <!-- Capability Summary -->
          <div class="cap-summary animate-fadeInUp">
            <h2 class="section-heading">Capability Progress</h2>
            @for (cap of capabilities(); track cap.id) {
              <div class="cap-summary-card" [style.--c]="cap.color">
                <div class="csc-header">
                  <span class="csc-icon">{{ cap.icon }}</span>
                  <div class="csc-info">
                    <div class="csc-name font-orbitron" [style.color]="cap.color">{{ cap.name }}</div>
                    <div class="csc-pct" [style.color]="cap.color">{{ getCapProgress(cap) }}%</div>
                  </div>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" [style.width.%]="getCapProgress(cap)" [style.background]="'linear-gradient(90deg, ' + cap.color + ', ' + cap.color + '55)'"></div>
                </div>
                <div class="csc-subcap-row">
                  @for (sub of cap.subCapabilities; track sub.id) {
                    <div class="csc-subcap" [style.border-color]="cap.color + '33'">
                      <span>{{ sub.icon }}</span>
                      <span class="csc-subcap-name">{{ sub.name }}</span>
                      <span class="csc-subcap-xp" [style.color]="cap.color">{{ sub.earnedXp }} XP</span>
                    </div>
                  }
                </div>
              </div>
            }
          </div>

          <!-- Journey Stats -->
          <div class="profile-sidebar">
            <!-- XP Ring -->
            <div class="glass-card xp-ring-card animate-fadeInUp">
              <div class="xp-ring-title">Cosmonaut Level</div>
              <div class="xp-ring-wrap">
                <svg width="130" height="130">
                  <circle cx="65" cy="65" r="55" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="10"/>
                  <circle cx="65" cy="65" r="55" fill="none"
                    stroke="url(#xpGrad)"
                    stroke-width="10"
                    stroke-linecap="round"
                    [style.stroke-dasharray]="'346'"
                    [style.stroke-dashoffset]="346 - (346 * levelProgress() / 100)"
                    style="transform: rotate(-90deg); transform-origin: 65px 65px; transition: stroke-dashoffset 1.2s ease;"
                  />
                  <defs>
                    <linearGradient id="xpGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stop-color="#00d4ff"/>
                      <stop offset="100%" stop-color="#a855f7"/>
                    </linearGradient>
                  </defs>
                </svg>
                <div class="xp-ring-center">
                  <div class="xp-ring-level font-orbitron">{{ profile().level }}</div>
                  <div class="xp-ring-sub">LEVEL</div>
                </div>
              </div>
              <div class="xp-ring-info">
                <div class="xp-curr font-orbitron">{{ profile().totalXp }} <span>XP</span></div>
                <div class="xp-next-info">{{ nextLevelXp() - profile().totalXp }} XP to Level {{ profile().level + 1 }}</div>
              </div>
            </div>

            <!-- Achievement Snapshot -->
            <div class="glass-card ach-snapshot animate-fadeInUp">
              <div class="snap-header">
                <h3 class="snap-title">Achievements</h3>
                <a routerLink="/achievements" class="snap-link">View All →</a>
              </div>
              <div class="snap-ring-row">
                <div class="snap-stat">
                  <div class="snap-val font-orbitron">{{ unlockedCount() }}</div>
                  <div class="snap-label">Unlocked</div>
                </div>
                <div class="snap-stat">
                  <div class="snap-val font-orbitron">{{ totalAchievements() }}</div>
                  <div class="snap-label">Total</div>
                </div>
                <div class="snap-stat">
                  <div class="snap-val font-orbitron">{{ achCompletion() }}%</div>
                  <div class="snap-label">Done</div>
                </div>
              </div>
              <div class="progress-bar" style="margin-top: 12px;">
                <div class="progress-fill" [style.width.%]="achCompletion()" style="background: linear-gradient(90deg, #f59e0b, #a855f7);"></div>
              </div>

              <!-- Badge Icons -->
              <div class="badge-showcase">
                @for (ach of unlockedAchievements(); track ach.id) {
                  <div class="badge-bubble" [title]="ach.title">{{ ach.icon }}</div>
                }
                @for (ach of lockedAchievements().slice(0, 4); track ach.id) {
                  <div class="badge-bubble locked" [title]="ach.title + ' (Locked)'">{{ ach.icon }}</div>
                }
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .profile-page { padding: 40px 0 64px; min-height: calc(100vh - 64px); }

    /* Hero */
    .profile-hero {
      display: flex;
      align-items: center;
      gap: 32px;
      background: rgba(10,22,40,0.85);
      border: 1px solid rgba(0,212,255,0.15);
      border-radius: 24px;
      padding: 36px;
      margin-bottom: 32px;
      position: relative;
      overflow: hidden;
      backdrop-filter: blur(20px);
      flex-wrap: wrap;
    }

    .hero-bg-glow {
      position: absolute;
      top: -40%;
      left: -10%;
      width: 400px;
      height: 300px;
      background: radial-gradient(ellipse, rgba(0,212,255,0.08), transparent);
      pointer-events: none;
    }

    .profile-avatar-wrap { position: relative; flex-shrink: 0; }

    .profile-avatar {
      width: 90px; height: 90px;
      background: linear-gradient(135deg, rgba(0,212,255,0.15), rgba(168,85,247,0.15));
      border: 2px solid rgba(0,212,255,0.3);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 44px;
      animation: float 5s ease-in-out infinite;
    }

    .avatar-ring {
      position: absolute;
      inset: -6px;
      border-radius: 50%;
      border: 1px solid rgba(0,212,255,0.2);
      animation: pulse-ring 3s ease-in-out infinite;
    }

    .avatar-level-badge {
      position: absolute;
      bottom: -4px;
      right: -4px;
      width: 28px; height: 28px;
      background: linear-gradient(135deg, #00d4ff, #a855f7);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 800;
      color: #000;
      border: 2px solid var(--bg-primary);
    }

    .profile-identity { flex: 1; min-width: 200px; }
    .profile-name { font-size: 32px; font-weight: 800; color: #e2e8f0; margin-bottom: 6px; }
    .profile-title { font-family: 'Orbitron', monospace; font-size: 15px; margin-bottom: 14px; }

    .profile-meta { display: flex; gap: 16px; flex-wrap: wrap; }
    .meta-item { font-size: 13px; color: #64748b; }

    .profile-actions { margin-left: auto; }

    /* Career Path */
    .career-section { margin-bottom: 36px; }

    .section-heading { font-family: 'Orbitron', monospace; font-size: 18px; color: #e2e8f0; margin-bottom: 24px; }

    .career-path {
      display: flex;
      align-items: center;
      background: rgba(10,22,40,0.8);
      border: 1px solid rgba(148,163,184,0.08);
      border-radius: 20px;
      padding: 32px;
      backdrop-filter: blur(20px);
      overflow-x: auto;
    }

    .career-node { display: flex; flex-direction: column; align-items: center; gap: 10px; position: relative; flex-shrink: 0; }

    .career-connector {
      position: absolute;
      top: 20px;
      left: 40px;
      width: 80px; height: 2px;
      background: rgba(255,255,255,0.06);
      z-index: 0;
    }
    .career-connector.active { background: linear-gradient(90deg, #00d4ff, rgba(0,212,255,0.3)); box-shadow: 0 0 6px #00d4ff; }

    .career-node-circle {
      width: 44px; height: 44px;
      border-radius: 50%;
      background: rgba(10,22,40,0.9);
      border: 2px solid rgba(255,255,255,0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      color: #475569;
      font-family: 'Orbitron', monospace;
      font-weight: 700;
      position: relative;
      z-index: 1;
      transition: all 0.3s ease;
    }

    .career-node.reached .career-node-circle { background: #00d4ff; border-color: #00d4ff; color: #000; }
    .career-node-circle.active { border-color: #00d4ff; color: #00d4ff; box-shadow: 0 0 16px rgba(0,212,255,0.4); }

    .career-node-label { font-size: 11px; color: #475569; text-align: center; max-width: 90px; line-height: 1.3; margin-right: 60px; }
    .active-label { color: #00d4ff !important; }

    /* Main Layout */
    .profile-main { display: grid; grid-template-columns: 1fr 300px; gap: 24px; align-items: start; }

    /* Cap Summary */
    .cap-summary { display: flex; flex-direction: column; gap: 16px; }

    .cap-summary-card {
      background: rgba(10,22,40,0.85);
      border: 1px solid rgba(148,163,184,0.08);
      border-left: 3px solid var(--c, #00d4ff);
      border-radius: 16px;
      padding: 20px;
      backdrop-filter: blur(20px);
      transition: all 0.3s ease;
    }
    .cap-summary-card:hover { transform: translateX(4px); border-color: rgba(255,255,255,0.12); border-left-color: var(--c); }

    .csc-header { display: flex; align-items: center; gap: 14px; margin-bottom: 14px; }
    .csc-icon { font-size: 32px; }
    .csc-info { display: flex; align-items: baseline; gap: 12px; }
    .csc-name { font-size: 17px; font-weight: 700; }
    .csc-pct { font-size: 14px; font-weight: 700; font-family: 'Orbitron', monospace; }

    .csc-subcap-row { display: flex; flex-direction: column; gap: 6px; margin-top: 14px; }
    .csc-subcap {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      color: #64748b;
      padding: 6px 10px;
      background: rgba(255,255,255,0.02);
      border-radius: 8px;
      border: 1px solid;
    }
    .csc-subcap-name { flex: 1; }
    .csc-subcap-xp { font-weight: 600; font-family: 'Orbitron', monospace; font-size: 11px; }

    /* Sidebar */
    .profile-sidebar { display: flex; flex-direction: column; gap: 20px; }

    .xp-ring-card { padding: 24px; text-align: center; }
    .xp-ring-title { font-family: 'Orbitron', monospace; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px; }
    .xp-ring-wrap { position: relative; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px; }
    .xp-ring-center { position: absolute; text-align: center; }
    .xp-ring-level { font-size: 30px; font-weight: 800; color: #00d4ff; }
    .xp-ring-sub { font-size: 10px; color: #64748b; text-transform: uppercase; }
    .xp-curr { font-size: 24px; font-weight: 700; color: #f59e0b; }
    .xp-curr span { font-size: 14px; color: #64748b; }
    .xp-next-info { font-size: 12px; color: #475569; margin-top: 4px; }

    .ach-snapshot { padding: 20px; }
    .snap-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
    .snap-title { font-family: 'Orbitron', monospace; font-size: 14px; color: #e2e8f0; }
    .snap-link { color: #00d4ff; text-decoration: none; font-size: 12px; }
    .snap-ring-row { display: flex; justify-content: space-around; }
    .snap-stat { text-align: center; }
    .snap-val { font-size: 22px; font-weight: 700; color: #f59e0b; }
    .snap-label { font-size: 10px; color: #64748b; text-transform: uppercase; }

    .badge-showcase { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
    .badge-bubble {
      width: 36px; height: 36px;
      background: rgba(245,158,11,0.1);
      border: 1px solid rgba(245,158,11,0.2);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      transition: transform 0.2s;
      cursor: default;
    }
    .badge-bubble:hover { transform: scale(1.15); }
    .badge-bubble.locked { background: rgba(51,65,85,0.3); border-color: rgba(51,65,85,0.5); filter: grayscale(1); opacity: 0.4; }

    @media (max-width: 1024px) {
      .profile-main { grid-template-columns: 1fr; }
      .profile-sidebar { flex-direction: row; flex-wrap: wrap; }
      .profile-sidebar > * { flex: 1; min-width: 260px; }
    }
  `]
})
export class ProfileComponent {
  private gameState = inject(GameStateService);
  private auth = inject(AuthService);

  profile = this.gameState.profile;
  capabilities = this.gameState.capabilities;
  achievements = this.gameState.achievements;
  username = this.auth.getUsername();
  careerLevels = CAREER_LEVELS;

  currentTitle = computed(() => LEVEL_TITLES[Math.min(this.profile().level - 1, LEVEL_TITLES.length - 1)]);
  levelProgress = computed(() => {
    const xp = this.profile().totalXp;
    return Math.min(100, Math.round(((xp % 500) / 500) * 100));
  });
  nextLevelXp = computed(() => this.profile().level * 500);
  currentCareerIdx = computed(() => Math.min(this.profile().level - 1, CAREER_LEVELS.length - 1));

  unlockedAchievements = computed(() => this.achievements().filter(a => a.unlocked));
  lockedAchievements = computed(() => this.achievements().filter(a => !a.unlocked));
  unlockedCount = computed(() => this.unlockedAchievements().length);
  totalAchievements = computed(() => this.achievements().length);
  achCompletion = computed(() => Math.round((this.unlockedCount() / this.totalAchievements()) * 100));

  getCapProgress(cap: Capability): number {
    return this.gameState.getProgressPercent(cap);
  }
}
