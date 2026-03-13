import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameStateService } from '../../services/game-state.service';
import { Capability, SubCapability } from '../../models/capability.model';

@Component({
  selector: 'app-sub-capability',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="subcap-page" *ngIf="capability && subCap">
      <div class="content-wrapper">

        <!-- Breadcrumb -->
        <div class="breadcrumb animate-fadeInUp">
          <a routerLink="/galaxy">Galaxy</a>
          <span class="sep">›</span>
          <a [routerLink]="['/capability', capId]" [style.color]="capability.color">{{ capability.name }}</a>
          <span class="sep">›</span>
          <span>{{ subCap.name }}</span>
        </div>

        <!-- Header -->
        <div class="subcap-hero animate-fadeInUp">
          <div class="hero-icon" [style.--c]="capability.color">
            <span>{{ subCap.icon }}</span>
          </div>
          <div class="hero-info">
            <div class="hero-label font-orbitron" [style.color]="capability.color">{{ capability.name }} · Sub-Capability</div>
            <h1>{{ subCap.name }}</h1>
            <p class="hero-desc">{{ subCap.description }}</p>
            <div class="hero-stats">
              <div class="hstat">
                <span class="hstat-v font-orbitron" [style.color]="capability.color">{{ subCap.earnedXp }}</span>
                <span class="hstat-l">XP Earned</span>
              </div>
              <div class="hstat">
                <span class="hstat-v font-orbitron">{{ totalTasks }}</span>
                <span class="hstat-l">Total Tasks</span>
              </div>
              <div class="hstat">
                <span class="hstat-v font-orbitron">{{ completedTasks }}</span>
                <span class="hstat-l">Completed</span>
              </div>
            </div>
          </div>
          <!-- Radial Progress -->
          <div class="hero-ring">
            <svg width="110" height="110">
              <circle cx="55" cy="55" r="45" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="8"/>
              <circle cx="55" cy="55" r="45" fill="none"
                [attr.stroke]="capability.color"
                stroke-width="8"
                stroke-linecap="round"
                [style.stroke-dasharray]="'283'"
                [style.stroke-dashoffset]="283 - (283 * progress / 100)"
                [style.filter]="'drop-shadow(0 0 6px ' + capability.color + ')'"
                style="transform: rotate(-90deg); transform-origin: 55px 55px; transition: stroke-dashoffset 1s ease;"
              />
            </svg>
            <div class="ring-center">
              <div class="ring-pct font-orbitron" [style.color]="capability.color">{{ progress }}%</div>
              <div class="ring-sub">Progress</div>
            </div>
          </div>
        </div>

        <!-- Level Journey -->
        <div class="level-journey animate-fadeInUp">
          <h2 class="journey-title">Career Level Journey</h2>
          <div class="level-timeline">
            @for (level of subCap.levels; track level.id; let i = $index) {
              <div class="timeline-item" [class.unlocked]="level.unlocked" [class.completed]="level.completed">
                <!-- Connector -->
                @if (i < subCap.levels.length - 1) {
                  <div class="connector" [class.active]="level.completed"></div>
                }
                <!-- Node -->
                <div class="timeline-node" [style.--c]="capability.color">
                  <div class="node-circle">
                    @if (level.completed) {
                      <span>✓</span>
                    } @else if (level.unlocked) {
                      <span>{{ i + 1 }}</span>
                    } @else {
                      <span>🔒</span>
                    }
                  </div>
                </div>

                <!-- Level Card -->
                <a [routerLink]="level.unlocked ? ['/capability', capId, 'sub', subId, 'level', level.id] : null"
                   class="level-card"
                   [class.locked]="!level.unlocked"
                   [style.--c]="capability.color">

                  <div class="level-card-top">
                    <div>
                      <div class="level-order badge"
                        [class.badge-blue]="i===0"
                        [class.badge-purple]="i===1"
                        [class.badge-gold]="i===2"
                        [class.badge-green]="i===3"
                        [class.badge-pink]="i===4">
                        Level {{ i + 1 }}
                      </div>
                      <h3 class="level-title" [class.gradient-text]="level.unlocked && !level.completed">{{ level.name }}</h3>
                    </div>
                    <div class="level-status">
                      @if (level.completed) {
                        <span class="status-badge completed">✓ Completed</span>
                      } @else if (level.unlocked) {
                        <span class="status-badge active">🚀 In Progress</span>
                      } @else {
                        <span class="status-badge locked">🔒 Locked</span>
                      }
                    </div>
                  </div>

                  <div class="level-tasks-preview">
                    <div class="tasks-label">{{ level.tasks.length }} Tasks ·
                      {{ getLevelXp(level) }} XP Available
                      @if (!level.unlocked) {
                        · Requires {{ level.xpRequired }} XP
                      }
                    </div>
                    <div class="task-dots">
                      @for (t of level.tasks; track t.id) {
                        <div class="task-dot" [class.done]="t.completed" [style.--c]="capability.color"></div>
                      }
                    </div>
                  </div>

                  @if (level.unlocked && !level.completed) {
                    <div class="level-cta" [style.color]="capability.color">
                      Enter Level → 
                    </div>
                  }

                  @if (!level.unlocked) {
                    <div class="locked-overlay">
                      <div class="lock-msg">🔒 Complete previous level to unlock</div>
                    </div>
                  }
                </a>
              </div>
            }
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .subcap-page { padding: 32px 0 64px; min-height: calc(100vh - 64px); }

    /* Breadcrumb */
    .breadcrumb {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 28px;
      font-size: 13px;
    }
    .breadcrumb a { color: #64748b; text-decoration: none; transition: color 0.2s; }
    .breadcrumb a:hover { color: #e2e8f0; }
    .sep { color: #334155; }
    .breadcrumb span:last-child { color: #94a3b8; }

    /* Hero */
    .subcap-hero {
      display: flex;
      align-items: flex-start;
      gap: 28px;
      margin-bottom: 48px;
      flex-wrap: wrap;
    }

    .hero-icon {
      width: 80px;
      height: 80px;
      background: radial-gradient(circle, rgba(255,255,255,0.05), transparent);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 40px;
      flex-shrink: 0;
      box-shadow: 0 0 30px var(--c, rgba(0,212,255,0.2));
    }

    .hero-info { flex: 1; min-width: 240px; }
    .hero-label { font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px; }
    .hero-info h1 { font-size: 34px; font-weight: 800; color: #e2e8f0; margin-bottom: 10px; }
    .hero-desc { color: #64748b; font-size: 14px; line-height: 1.6; margin-bottom: 20px; }

    .hero-stats { display: flex; gap: 28px; }
    .hstat { }
    .hstat-v { display: block; font-size: 24px; font-weight: 700; color: #e2e8f0; }
    .hstat-l { font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 0.35px; }

    .hero-ring {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .ring-center { position: absolute; text-align: center; }
    .ring-pct { font-size: 22px; font-weight: 800; }
    .ring-sub { font-size: 10px; color: #64748b; text-transform: uppercase; }

    /* Timeline */
    .level-journey { }
    .journey-title { font-family: 'Orbitron', monospace; font-size: 18px; color: #e2e8f0; margin-bottom: 24px; }

    .level-timeline { display: flex; flex-direction: column; gap: 0; }

    .timeline-item {
      display: grid;
      grid-template-columns: 48px 1fr;
      gap: 16px;
      position: relative;
      margin-bottom: 12px;
      align-items: start;
    }

    .connector {
      position: absolute;
      left: 23px;
      top: 44px;
      bottom: -14px;
      width: 2px;
      background: rgba(255,255,255,0.06);
      z-index: 0;
    }
    .connector.active { background: linear-gradient(180deg, var(--cap-color, #00d4ff), rgba(0,212,255,0.2)); }

    .timeline-node { display: flex; justify-content: center; padding-top: 8px; position: relative; z-index: 1; }

    .node-circle {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(10,22,40,0.9);
      border: 2px solid rgba(255,255,255,0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 700;
      color: #475569;
      font-family: 'Orbitron', monospace;
      transition: all 0.3s ease;
    }

    .timeline-item.unlocked .node-circle {
      border-color: var(--c);
      color: var(--c);
      box-shadow: 0 0 12px var(--c, rgba(0,212,255,0.3));
    }

    .timeline-item.completed .node-circle {
      background: var(--c, #00d4ff);
      border-color: var(--c);
      color: #000;
    }

    /* Level Card */
    .level-card {
      background: rgba(10,22,40,0.8);
      border: 1px solid rgba(148,163,184,0.08);
      border-radius: 16px;
      padding: 20px;
      text-decoration: none;
      display: block;
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
      backdrop-filter: blur(20px);
    }

    .level-card:not(.locked):hover {
      border-color: rgba(255,255,255,0.15);
      transform: translateX(4px);
      box-shadow: 0 8px 32px rgba(0,0,0,0.3);
    }

    .level-card.locked { cursor: not-allowed; opacity: 0.6; }

    .level-card-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 14px;
    }

    .level-order { font-size: 10px; margin-bottom: 6px; }
    .level-title { font-family: 'Orbitron', monospace; font-size: 16px; font-weight: 700; color: #94a3b8; }

    .status-badge {
      font-size: 11px;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 100px;
    }
    .status-badge.completed { background: rgba(34,197,94,0.15); color: #22c55e; border: 1px solid rgba(34,197,94,0.3); }
    .status-badge.active { background: rgba(0,212,255,0.15); color: #00d4ff; border: 1px solid rgba(0,212,255,0.3); }
    .status-badge.locked { background: rgba(148,163,184,0.08); color: #475569; border: 1px solid rgba(255,255,255,0.06); }

    .level-tasks-preview { margin-bottom: 12px; }
    .tasks-label { font-size: 12px; color: #64748b; margin-bottom: 8px; }
    .task-dots { display: flex; gap: 5px; }
    .task-dot {
      width: 10px; height: 10px;
      border-radius: 50%;
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.1);
      transition: all 0.2s;
    }
    .task-dot.done { background: var(--c, #00d4ff); border-color: var(--c, #00d4ff); box-shadow: 0 0 4px var(--c, #00d4ff); }

    .level-cta { font-size: 13px; font-weight: 600; font-family: 'Orbitron', monospace; }

    .locked-overlay {
      position: absolute;
      inset: 0;
      background: rgba(2,8,23,0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: inherit;
      backdrop-filter: blur(4px);
    }
    .lock-msg { color: #475569; font-size: 13px; }

    .badge-pink { background: rgba(236,72,153,0.15); color: #ec4899; border: 1px solid rgba(236,72,153,0.3); }
  `]
})
export class SubCapabilityComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private gameState = inject(GameStateService);

  capability: Capability | undefined;
  subCap: SubCapability | undefined;
  capId = '';
  subId = '';
  progress = 0;
  totalTasks = 0;
  completedTasks = 0;

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.capId = p['capId'];
      this.subId = p['subId'];
      this.capability = this.gameState.getCapability(this.capId);
      this.subCap = this.gameState.getSubCapability(this.capId, this.subId);
      if (this.subCap) {
        this.progress = this.gameState.getSubCapProgress(this.subCap);
        this.subCap.levels.forEach(lv => {
          this.totalTasks += lv.tasks.length;
          this.completedTasks += lv.tasks.filter(t => t.completed).length;
        });
      }
    });
  }

  getLevelXp(level: any): number {
    return level.tasks.reduce((a: number, t: any) => a + t.xp, 0);
  }
}
