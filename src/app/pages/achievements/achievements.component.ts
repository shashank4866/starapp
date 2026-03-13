import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GameStateService } from '../../services/game-state.service';

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="achievements-page">
      <div class="content-wrapper">

        <!-- Header -->
        <div class="ach-header animate-fadeInUp">
          <div class="page-label">🏆 Hall of Fame</div>
          <h1 class="gradient-text">Achievements</h1>
          <p class="ach-subtitle">Your cosmic accomplishments. Keep pushing the boundaries of your galaxy.</p>
        </div>

        <!-- Stats Bar -->
        <div class="ach-stats animate-fadeInUp">
          <div class="ach-stat-card">
            <div class="asc-icon">🏆</div>
            <div class="asc-val font-orbitron">{{ unlockedCount() }}</div>
            <div class="asc-label">Unlocked</div>
          </div>
          <div class="ach-stat-card">
            <div class="asc-icon">🔒</div>
            <div class="asc-val font-orbitron">{{ lockedCount() }}</div>
            <div class="asc-label">Remaining</div>
          </div>
          <div class="ach-stat-card">
            <div class="asc-icon">⚡</div>
            <div class="asc-val font-orbitron">{{ bonusXp() }}</div>
            <div class="asc-label">Bonus XP Available</div>
          </div>
          <div class="ach-stat-card">
            <div class="asc-icon">📊</div>
            <div class="asc-val font-orbitron">{{ completion() }}%</div>
            <div class="asc-label">Completion</div>
          </div>
        </div>

        <!-- Overall Progress -->
        <div class="overall-ach-progress animate-fadeInUp">
          <div class="oap-header">
            <span class="oap-label">Overall Achievement Progress</span>
            <span class="oap-pct font-orbitron">{{ unlockedCount() }}/{{ achievements().length }}</span>
          </div>
          <div class="progress-bar big">
            <div class="progress-fill" [style.width.%]="completion()" style="background: linear-gradient(90deg, #f59e0b, #a855f7);"></div>
          </div>
        </div>

        <!-- Unlocked Achievements -->
        @if (unlockedAchievements().length > 0) {
          <div class="ach-section animate-fadeInUp">
            <h2 class="ach-section-title"><span class="section-dot unlocked-dot"></span> Unlocked</h2>
            <div class="ach-grid">
              @for (ach of unlockedAchievements(); track ach.id) {
                <div class="ach-card unlocked">
                  <div class="ach-card-icon">
                    <span>{{ ach.icon }}</span>
                    <div class="ach-icon-glow"></div>
                  </div>
                  <div class="ach-card-body">
                    <div class="ach-card-title">{{ ach.title }}</div>
                    <div class="ach-card-desc">{{ ach.description }}</div>
                    @if (ach.unlockedDate) {
                      <div class="ach-date">{{ ach.unlockedDate | date:'mediumDate' }}</div>
                    }
                  </div>
                  <div class="ach-xp-badge xp-chip">+{{ ach.xpReward }} XP</div>
                  <div class="ach-check">✓</div>
                </div>
              }
            </div>
          </div>
        }

        <!-- Locked Achievements -->
        <div class="ach-section animate-fadeInUp">
          <h2 class="ach-section-title"><span class="section-dot locked-dot"></span> Locked</h2>
          <div class="ach-grid locked-grid">
            @for (ach of lockedAchievements(); track ach.id) {
              <div class="ach-card locked">
                <div class="ach-card-icon locked-icon">
                  <span>{{ ach.icon }}</span>
                </div>
                <div class="ach-card-body">
                  <div class="ach-card-title">{{ ach.title }}</div>
                  <div class="ach-card-desc">{{ ach.description }}</div>
                </div>
                <div class="ach-xp-badge xp-chip muted">+{{ ach.xpReward }} XP</div>
                <div class="ach-lock">🔒</div>
              </div>
            }
          </div>
        </div>

        <div class="back-nav animate-fadeInUp">
          <a routerLink="/dashboard" class="btn-ghost">← Back to Dashboard</a>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .achievements-page { padding: 40px 0 64px; min-height: calc(100vh - 64px); }

    /* Header */
    .ach-header { text-align: center; margin-bottom: 36px; }
    .page-label { color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px; }
    .ach-header h1 { font-size: 42px; margin-bottom: 12px; }
    .ach-subtitle { color: #64748b; font-size: 15px; max-width: 480px; margin: 0 auto; }

    /* Stats */
    .ach-stats {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-bottom: 28px;
    }

    .ach-stat-card {
      background: rgba(10,22,40,0.8);
      border: 1px solid rgba(148,163,184,0.1);
      border-radius: 16px;
      padding: 20px;
      text-align: center;
      backdrop-filter: blur(20px);
    }

    .asc-icon { font-size: 28px; margin-bottom: 8px; }
    .asc-val { font-size: 26px; font-weight: 700; color: #f59e0b; margin-bottom: 4px; }
    .asc-label { font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }

    /* Progress */
    .overall-ach-progress {
      background: rgba(10,22,40,0.8);
      border: 1px solid rgba(148,163,184,0.1);
      border-radius: 16px;
      padding: 20px 24px;
      margin-bottom: 36px;
      backdrop-filter: blur(20px);
    }

    .oap-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
    .oap-label { font-size: 13px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }
    .oap-pct { font-size: 14px; font-weight: 700; color: #f59e0b; }
    .progress-bar.big { height: 10px; }

    /* Sections */
    .ach-section { margin-bottom: 36px; }
    .ach-section-title {
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: 'Orbitron', monospace;
      font-size: 16px;
      color: #e2e8f0;
      margin-bottom: 20px;
    }

    .section-dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
    .unlocked-dot { background: #f59e0b; box-shadow: 0 0 8px #f59e0b; }
    .locked-dot { background: #334155; }

    .ach-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }
    .locked-grid { opacity: 0.5; }

    /* Achievement Card */
    .ach-card {
      background: rgba(10,22,40,0.85);
      border: 1px solid rgba(148,163,184,0.1);
      border-radius: 16px;
      padding: 20px;
      display: flex;
      align-items: flex-start;
      gap: 16px;
      position: relative;
      backdrop-filter: blur(20px);
      transition: all 0.3s ease;
    }

    .ach-card.unlocked {
      border-color: rgba(245,158,11,0.2);
      background: linear-gradient(135deg, rgba(245,158,11,0.04), rgba(10,22,40,0.85));
    }

    .ach-card.unlocked:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 32px rgba(245,158,11,0.1);
      border-color: rgba(245,158,11,0.35);
    }

    .ach-card-icon {
      width: 52px;
      height: 52px;
      background: rgba(245,158,11,0.1);
      border: 1px solid rgba(245,158,11,0.2);
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 26px;
      flex-shrink: 0;
      position: relative;
    }

    .ach-icon-glow {
      position: absolute;
      inset: -4px;
      background: rgba(245,158,11,0.2);
      border-radius: 18px;
      filter: blur(8px);
    }

    .locked-icon { background: rgba(51,65,85,0.5); border-color: rgba(51,65,85,0.5); filter: grayscale(1); }

    .ach-card-body { flex: 1; min-width: 0; }
    .ach-card-title { font-weight: 700; color: #e2e8f0; font-size: 15px; margin-bottom: 4px; }
    .ach-card-desc { color: #64748b; font-size: 12px; line-height: 1.5; }
    .ach-date { color: #475569; font-size: 11px; margin-top: 6px; }

    .ach-xp-badge { flex-shrink: 0; }
    .ach-xp-badge.muted { opacity: 0.4; }

    .ach-check {
      position: absolute;
      top: 12px;
      right: 12px;
      width: 22px; height: 22px;
      background: #f59e0b;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 700;
      color: #000;
    }

    .ach-lock { position: absolute; top: 12px; right: 12px; font-size: 16px; opacity: 0.5; }

    .back-nav { display: flex; }

    @media (max-width: 768px) {
      .ach-stats { grid-template-columns: repeat(2, 1fr); }
    }
  `]
})
export class AchievementsComponent {
  private gameState = inject(GameStateService);
  achievements = this.gameState.achievements;

  unlockedAchievements = computed(() => this.achievements().filter(a => a.unlocked));
  lockedAchievements = computed(() => this.achievements().filter(a => !a.unlocked));
  unlockedCount = computed(() => this.unlockedAchievements().length);
  lockedCount = computed(() => this.lockedAchievements().length);
  completion = computed(() => Math.round((this.unlockedCount() / this.achievements().length) * 100));
  bonusXp = computed(() => this.lockedAchievements().reduce((a, ach) => a + ach.xpReward, 0));
}
