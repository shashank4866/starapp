import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameStateService } from '../../services/game-state.service';
import { Capability } from '../../models/capability.model';

@Component({
  selector: 'app-capability',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="cap-page" *ngIf="capability">
      <div class="content-wrapper">
        <!-- Back + Header -->
        <div class="cap-header animate-fadeInUp">
          <a routerLink="/galaxy" class="back-link">← Galaxy Map</a>
          <div class="cap-hero">
            <div class="cap-hero-icon" [style.--c]="capability.color">
              <span>{{ capability.icon }}</span>
              <div class="icon-ring"></div>
            </div>
            <div class="cap-hero-info">
              <div class="page-label" [style.color]="capability.color">{{ capability.name }} Galaxy</div>
              <h1 [style.color]="capability.color">{{ capability.name }}</h1>
              <p class="cap-hero-desc">{{ capability.description }}</p>
              <div class="overall-progress">
                <div class="prog-info-row">
                  <span class="prog-info-label">Overall Progress</span>
                  <span class="prog-pct font-orbitron" [style.color]="capability.color">{{ overallProgress }}%</span>
                </div>
                <div class="progress-bar big">
                  <div class="progress-fill" [style.width.%]="overallProgress" [style.background]="'linear-gradient(90deg, ' + capability.color + ', ' + capability.color + '88)'"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sub-Capabilities Grid -->
        <div class="subcap-section">
          <h2 class="section-heading animate-fadeInUp">Sub-Capabilities</h2>
          <div class="subcap-grid">
            @for(sub of capability.subCapabilities; track sub.id; let i = $index) {
              <a [routerLink]="['/capability', capability.id, 'sub', sub.id]"
                 class="subcap-card animate-fadeInUp"
                 [style.animation-delay]="(i * 0.08) + 's'"
                 [style.--c]="capability.color"
                 [style.--glow]="capability.glowColor">
                <div class="subcap-top">
                  <span class="subcap-icon">{{ sub.icon }}</span>
                  <div class="subcap-levels">
                    @for(lv of sub.levels; track lv.id) {
                      <div class="lv-dot" [class.unlocked]="lv.unlocked" [class.completed]="lv.completed" [style.--c]="capability.color"></div>
                    }
                  </div>
                </div>
                <h3 class="subcap-name">{{ sub.name }}</h3>
                <p class="subcap-desc">{{ sub.description }}</p>

                <div class="subcap-stats">
                  <div class="subcap-stat">
                    <span class="s-val font-orbitron" [style.color]="capability.color">{{ sub.earnedXp }}</span>
                    <span class="s-label">XP Earned</span>
                  </div>
                  <div class="subcap-stat">
                    <span class="s-val font-orbitron">{{ getCompletedTasks(sub) }}</span>
                    <span class="s-label">Tasks Done</span>
                  </div>
                  <div class="subcap-stat">
                    <span class="s-val font-orbitron">{{ getUnlockedLevels(sub) }}/5</span>
                    <span class="s-label">Levels</span>
                  </div>
                </div>

                <div class="subcap-progress">
                  <div class="progress-bar">
                    <div class="progress-fill" [style.width.%]="getSubProgress(sub)" [style.background]="'linear-gradient(90deg, ' + capability.color + ', ' + capability.color + '88)'"></div>
                  </div>
                </div>

                <div class="enter-row">
                  <span class="enter-text" [style.color]="capability.color">Enter Sub-Galaxy</span>
                  <span class="enter-arrow">→</span>
                </div>
              </a>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cap-page { padding: 32px 0 64px; min-height: calc(100vh - 64px); }

    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: #64748b;
      text-decoration: none;
      font-size: 14px;
      margin-bottom: 28px;
      transition: color 0.2s;
      display: block;
    }
    .back-link:hover { color: #00d4ff; }

    .cap-hero {
      display: flex;
      align-items: center;
      gap: 32px;
      margin-bottom: 40px;
      flex-wrap: wrap;
    }

    .cap-hero-icon {
      position: relative;
      width: 100px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 52px;
      flex-shrink: 0;
    }

    .cap-hero-icon::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle, var(--c) 0%, transparent 70%);
      opacity: 0.15;
      border-radius: 50%;
    }

    .icon-ring {
      position: absolute;
      inset: -8px;
      border-radius: 50%;
      border: 1px solid var(--c);
      opacity: 0.3;
      animation: pulse-ring 3s ease-in-out infinite;
    }

    @keyframes pulse-ring {
      0%, 100% { transform: scale(1); opacity: 0.3; }
      50% { transform: scale(1.08); opacity: 0.6; }
    }

    .cap-hero-info { flex: 1; min-width: 260px; }

    .page-label {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 6px;
    }

    .cap-hero-info h1 {
      font-size: 40px;
      font-weight: 800;
      margin-bottom: 10px;
    }

    .cap-hero-desc { color: #64748b; font-size: 15px; margin-bottom: 20px; line-height: 1.6; }

    .overall-progress { max-width: 400px; }

    .prog-info-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
    }

    .prog-info-label { font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }
    .prog-pct { font-size: 13px; font-weight: 700; }

    .progress-bar.big { height: 8px; }

    /* SubCap Grid */
    .subcap-section { }

    .section-heading {
      font-family: 'Orbitron', monospace;
      font-size: 18px;
      color: #e2e8f0;
      margin-bottom: 20px;
    }

    .subcap-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
    }

    .subcap-card {
      background: rgba(10,22,40,0.85);
      border: 1px solid rgba(148,163,184,0.1);
      border-radius: 20px;
      padding: 24px;
      text-decoration: none;
      display: flex;
      flex-direction: column;
      gap: 14px;
      transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
      backdrop-filter: blur(20px);
      position: relative;
      overflow: hidden;
    }

    .subcap-card::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse 80% 60% at 50% 0%, var(--glow), transparent 70%);
      opacity: 0;
      transition: opacity 0.35s;
    }

    .subcap-card:hover::before { opacity: 1; }
    .subcap-card:hover {
      transform: translateY(-6px);
      border-color: rgba(255,255,255,0.15);
      box-shadow: 0 16px 48px rgba(0,0,0,0.3);
    }

    .subcap-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .subcap-icon { font-size: 32px; }

    .subcap-levels { display: flex; gap: 5px; }

    .lv-dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.15);
      transition: all 0.3s;
    }

    .lv-dot.unlocked { background: rgba(255,255,255,0.2); border-color: var(--c); }
    .lv-dot.completed { background: var(--c); border-color: var(--c); box-shadow: 0 0 6px var(--c); }

    .subcap-name {
      font-family: 'Orbitron', monospace;
      font-size: 15px;
      font-weight: 700;
      color: #e2e8f0;
      position: relative;
      z-index: 1;
    }

    .subcap-desc {
      color: #64748b;
      font-size: 13px;
      line-height: 1.5;
      position: relative;
      z-index: 1;
    }

    .subcap-stats {
      display: flex;
      gap: 16px;
      position: relative;
      z-index: 1;
    }

    .subcap-stat { text-align: center; }
    .s-val { display: block; font-size: 18px; font-weight: 700; color: #e2e8f0; }
    .s-label { font-size: 10px; color: #64748b; text-transform: uppercase; letter-spacing: 0.35px; }

    .subcap-progress { position: relative; z-index: 1; }

    .enter-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      font-weight: 600;
      position: relative;
      z-index: 1;
      font-family: 'Orbitron', monospace;
      padding-top: 8px;
      border-top: 1px solid rgba(255,255,255,0.04);
    }

    .enter-text {}
    .enter-arrow { color: #475569; transition: transform 0.2s; }
    .subcap-card:hover .enter-arrow { transform: translateX(4px); color: var(--c); }
  `]
})
export class CapabilityComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private gameState = inject(GameStateService);

  capability: Capability | undefined;
  overallProgress = 0;

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.capability = this.gameState.getCapability(p['id']);
      if (this.capability) {
        this.overallProgress = this.gameState.getProgressPercent(this.capability);
        this.gameState.visitGalaxy(p['id']);
      }
    });
  }

  getSubProgress(sub: any): number {
    return this.gameState.getSubCapProgress(sub);
  }

  getCompletedTasks(sub: any): number {
    return sub.levels.reduce((acc: number, lv: any) =>
      acc + lv.tasks.filter((t: any) => t.completed).length, 0);
  }

  getUnlockedLevels(sub: any): number {
    return sub.levels.filter((lv: any) => lv.unlocked).length;
  }
}
