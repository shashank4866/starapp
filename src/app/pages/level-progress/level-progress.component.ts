import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameStateService } from '../../services/game-state.service';
import { Capability, SubCapability, Level, Task } from '../../models/capability.model';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-level-progress',
  standalone: true,
  imports: [RouterLink, CommonModule],
  animations: [
    trigger('taskList', [
      transition(':enter', [
        query('.task-item', [
          style({ opacity: 0, transform: 'translateX(-20px)' }),
          stagger(80, animate('350ms cubic-bezier(0.4,0,0.2,1)', style({ opacity: 1, transform: 'translateX(0)' })))
        ], { optional: true })
      ])
    ]),
    trigger('xpBurst', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.5) translateY(-20px)' }),
        animate('500ms cubic-bezier(0.34,1.56,0.64,1)', style({ opacity: 1, transform: 'scale(1) translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease', style({ opacity: 0, transform: 'scale(0.8) translateY(-20px)' }))
      ])
    ])
  ],
  template: `
    <div class="level-page" *ngIf="capability && subCap && level">
      <div class="content-wrapper">

        <!-- Breadcrumb -->
        <div class="breadcrumb animate-fadeInUp">
          <a routerLink="/galaxy">Galaxy</a><span class="sep">›</span>
          <a [routerLink]="['/capability', capId]" [style.color]="capability.color">{{ capability.name }}</a><span class="sep">›</span>
          <a [routerLink]="['/capability', capId, 'sub', subId]" [style.color]="capability.color">{{ subCap.name }}</a><span class="sep">›</span>
          <span>{{ level.name }}</span>
        </div>

        <!-- Level Header -->
        <div class="level-header animate-fadeInUp">
          <div class="level-badge-row">
            <span class="level-num-badge font-orbitron" [style.background]="capability.color + '22'" [style.color]="capability.color" [style.border-color]="capability.color + '44'">
              Level {{ level.order }}
            </span>
            @if (level.completed) {
              <span class="completed-badge">🏆 Level Completed!</span>
            }
          </div>
          <h1 class="level-title">{{ level.name }}</h1>
          <p class="level-subtitle" [style.color]="capability.color">{{ subCap.name }} · {{ capability.name }}</p>

          <!-- Progress Summary -->
          <div class="level-summary">
            <div class="summary-item hud-card-mini">
              <span class="sum-icon pulse">✅</span>
              <div>
                <div class="sum-val font-orbitron">{{ completedCount() }}/{{ level.tasks.length }}</div>
                <div class="sum-label">Missions</div>
              </div>
            </div>
            <div class="summary-item">
              <span class="sum-icon">⚡</span>
              <div>
                <div class="sum-val font-orbitron" [style.color]="capability.color">{{ earnedXp() }}</div>
                <div class="sum-label">XP Earned</div>
              </div>
            </div>
            <div class="summary-item hud-card-mini">
              <span class="sum-icon">🎯</span>
              <div>
                <div class="sum-val font-orbitron">{{ totalXp }}</div>
                <div class="sum-label">Data Nodes</div>
              </div>
            </div>
          </div>

          <!-- Level Progress Bar -->
          <div class="level-progress-wrap">
            <div class="progress-bar big">
              <div class="progress-fill animated-fill"
                [style.width.%]="taskProgress()"
                [style.background]="'linear-gradient(90deg, ' + capability.color + ', ' + capability.color + '88)'">
              </div>
            </div>
            <div class="prog-label-row">
              <span class="prog-info-label">Sector Clearance</span>
              <span class="prog-pct font-orbitron" [style.color]="capability.color">{{ taskProgress() }}%</span>
            </div>
          </div>
        </div>

        <!-- XP Burst Animation -->
        @if (lastXp()) {
          <div class="xp-burst animate-fadeInScale" [@xpBurst]>
            +{{ lastXp() }} XP ⚡
          </div>
        }

        <!-- Level Unlock Banner / Celebration -->
        @if (justUnlocked()) {
          <div class="level-complete-overlay animate-fadeInScale">
            <div class="celebration-card" [style.--glow]="capability.color">
              <div class="celebration-icon">🏆</div>
              <h2 class="celebration-title font-orbitron" [style.color]="capability.color">LEVEL COMPLETE!</h2>
              <p class="celebration-desc">You've successfully mastered <strong>{{ level.name }}</strong>.</p>
              
              <div class="xp-reward">
                <span>Total XP Earned:</span>
                <span class="reward-val" [style.color]="capability.color">{{ totalXp }} ⚡</span>
              </div>
              
              <button class="btn-neon" [style.background]="'linear-gradient(135deg, ' + capability.color + ', #000)'" (click)="justUnlocked.set(false)">
                Continue Journey 🚀
              </button>
            </div>
            <div class="confetti c-1">⭐</div>
            <div class="confetti c-2">✨</div>
            <div class="confetti c-3">🌟</div>
            <div class="confetti c-4">⭐</div>
            <div class="confetti c-5">✨</div>
          </div>
        }

        <!-- Mission List -->
        <div class="tasks-section" [@taskList]>
          <h2 class="tasks-heading"><span class="terminal-prompt">>_</span> MISSION OBJECTIVES</h2>

          <div class="tasks-grid">
            @for (task of level.tasks; track task.id; let i = $index) {
              <div class="task-item" [class.completed]="task.completed" [style.--c]="capability.color">
                <div class="task-header">
                  <div class="task-left">
                    <div class="task-type-badge badge" [class]="getTypeBadgeClass(task.type)">
                      {{ getTypeIcon(task.type) }} {{ task.type }}
                    </div>
                  </div>
                  <div class="xp-chip">⚡ {{ task.xp }} XP</div>
                </div>

                <h3 class="task-title">{{ task.title }}</h3>
                <p class="task-desc">{{ task.description }}</p>

                <div class="task-footer">
                  @if (task.completed) {
                    <div class="task-done-badge">
                      <span>VERIFIED</span> ✓
                    </div>
                  } @else {
                    <button class="task-btn" [style.--c]="capability.color" (click)="completeTask(task)" [disabled]="level.completed">
                      [ EXPORT DATA ]
                    </button>
                  }
                </div>

                @if (task.completed) {
                  <div class="completed-overlay"></div>
                }
              </div>
            }
          </div>
        </div>

        <!-- Navigation -->
        <div class="level-nav animate-fadeInUp">
          <a [routerLink]="['/capability', capId, 'sub', subId]" class="btn-ghost">← Back to Sub-Capability</a>
          @if (level.completed && nextLevelId) {
            <a [routerLink]="['/capability', capId, 'sub', subId, 'level', nextLevelId]" class="btn-neon">
              Next Level →
            </a>
          }
        </div>

      </div>
    </div>
  `,
  styles: [`
    .level-page { padding: 32px 0 64px; min-height: calc(100vh - 64px); }

    .breadcrumb { display: flex; align-items: center; gap: 8px; margin-bottom: 28px; font-size: 13px; }
    .breadcrumb a { color: #64748b; text-decoration: none; transition: color 0.2s; }
    .breadcrumb a:hover { color: #e2e8f0; }
    .sep { color: #334155; }
    .breadcrumb span:last-child { color: #94a3b8; }

    /* Header */
    .level-header {
      background: rgba(4, 12, 26, 0.95);
      border: 1px solid rgba(0, 212, 255, 0.2);
      padding: 32px;
      margin-bottom: 28px;
      clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px));
      position: relative;
    }
    
    .level-header::after {
      content: ''; position: absolute; inset: 0; background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.03) 2px, rgba(0,212,255,0.03) 4px); pointer-events: none;
    }

    .level-badge-row { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }

    .level-num-badge {
      padding: 4px 14px;
      border-radius: 100px;
      border: 1px solid;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
    }

    .completed-badge {
      background: rgba(34,197,94,0.15);
      color: #22c55e;
      border: 1px solid rgba(34,197,94,0.3);
      border-radius: 100px;
      padding: 4px 14px;
      font-size: 12px;
      font-weight: 600;
    }

    .level-title { font-size: 36px; font-weight: 800; color: #e2e8f0; margin-bottom: 6px; }
    .level-subtitle { font-size: 14px; font-weight: 500; letter-spacing: 0.5px; margin-bottom: 24px; }

    .level-summary { display: flex; gap: 32px; margin-bottom: 24px; flex-wrap: wrap; }
    .summary-item { display: flex; align-items: center; gap: 12px; }
    .hud-card-mini {
      background: rgba(0, 212, 255, 0.05); padding: 10px 16px; border: 1px solid rgba(0, 212, 255, 0.2);
      clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
    }
    .sum-icon { font-size: 24px; }
    .sum-val { font-size: 22px; font-weight: 700; color: #e2e8f0; }
    .sum-label { font-size: 11px; color: #64748b; text-transform: uppercase; }

    .level-progress-wrap { }
    .progress-bar.big { height: 10px; border-radius: 100px; }
    .animated-fill { transition: width 1s cubic-bezier(0.4,0,0.2,1); }
    .prog-label-row { display: flex; justify-content: space-between; margin-top: 6px; }
    .prog-info-label { font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }
    .prog-pct { font-size: 13px; font-weight: 700; }

    /* XP Burst */
    .xp-burst {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      background: linear-gradient(135deg, #f59e0b, #ef4444);
      border-radius: 20px;
      padding: 20px 36px;
      font-family: 'Orbitron', monospace;
      font-size: 28px;
      font-weight: 800;
      color: #fff;
      z-index: 999;
      box-shadow: 0 0 60px rgba(245,158,11,0.6);
      pointer-events: none;
    }

    /* Celebration Overlay */
    .level-complete-overlay {
      position: fixed;
      inset: 0;
      background: rgba(2,8,23,0.95);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .celebration-card {
      background: rgba(10,22,40,0.95);
      border: 1px solid var(--glow);
      border-radius: 24px;
      padding: 48px;
      text-align: center;
      box-shadow: 0 0 80px rgba(var(--glow), 0.3);
      position: relative;
      z-index: 2;
      max-width: 400px;
      animation: float 4s ease-in-out infinite;
    }
    .celebration-icon {
      font-size: 64px;
      margin-bottom: 16px;
      animation: pulse-glow 2s infinite;
    }
    .celebration-title {
      font-size: 32px;
      font-weight: 800;
      margin-bottom: 12px;
      text-shadow: 0 0 10px currentColor;
    }
    .celebration-desc {
      color: #94a3b8;
      font-size: 15px;
      margin-bottom: 24px;
      line-height: 1.5;
    }
    .xp-reward {
      display: flex;
      flex-direction: column;
      gap: 4px;
      background: rgba(255,255,255,0.05);
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 32px;
    }
    .reward-val { font-size: 24px; font-weight: 800; font-family: 'Orbitron', monospace; }
    
    .confetti { position: absolute; font-size: 32px; z-index: 1; animation: float-around 10s linear infinite; }
    .c-1 { top: 20%; left: 20%; animation-delay: 0s; font-size: 48px; }
    .c-2 { top: 60%; right: 20%; animation-delay: 2s; font-size: 24px; }
    .c-3 { top: 30%; right: 30%; animation-delay: 1s; font-size: 36px; }
    .c-4 { bottom: 20%; left: 30%; animation-delay: 3s; font-size: 40px; }
    .c-5 { top: 80%; left: 50%; animation-delay: 0.5s; font-size: 28px; }
    
    @keyframes float-around {
      0% { transform: translate(0,0) rotate(0deg); opacity: 0; }
      10% { opacity: 1; }
      50% { transform: translate(100px, -50px) rotate(180deg); }
      90% { opacity: 1; }
      100% { transform: translate(-50px, -100px) rotate(360deg); opacity: 0; }
    }

    /* Tasks */
    .tasks-section { }
    .tasks-heading { font-family: 'Orbitron', monospace; font-size: 18px; color: #e2e8f0; margin-bottom: 20px; }

    .tasks-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; margin-bottom: 32px; }

    .task-item {
      background: rgba(4, 12, 26, 0.95);
      border: 1px solid rgba(255,255,255,0.1);
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      position: relative;
      transition: all 0.3s ease;
      clip-path: polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px));
    }

    .task-item:not(.completed):hover {
      border-color: rgba(255,255,255,0.15);
      transform: translateY(-3px);
      box-shadow: 0 12px 32px rgba(0,0,0,0.3);
    }

    .task-item.completed { border-color: rgba(34,197,94,0.2); }

    .task-item.completed::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(34,197,94,0.06), transparent);
    }

    .task-header { display: flex; justify-content: space-between; align-items: center; }

    .badge-theory { background: rgba(0,212,255,0.12); color: #00d4ff; border: 1px solid rgba(0,212,255,0.3); }
    .badge-practice { background: rgba(168,85,247,0.12); color: #a855f7; border: 1px solid rgba(168,85,247,0.3); }
    .badge-project { background: rgba(245,158,11,0.12); color: #f59e0b; border: 1px solid rgba(245,158,11,0.3); }
    .badge-quiz { background: rgba(236,72,153,0.12); color: #ec4899; border: 1px solid rgba(236,72,153,0.3); }

    .task-title { font-family: 'Orbitron', monospace; font-size: 14px; font-weight: 700; color: #e2e8f0; line-height: 1.4; }
    .task-desc { color: #64748b; font-size: 13px; line-height: 1.6; flex: 1; }

    .task-footer { margin-top: auto; }

    .task-done-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(34,197,94,0.12);
      color: #22c55e;
      border: 1px solid rgba(34,197,94,0.3);
      border-radius: 100px;
      padding: 6px 14px;
      font-size: 13px;
      font-weight: 600;
    }

    .task-btn {
      width: 100%;
      padding: 10px 16px;
      background: linear-gradient(135deg, var(--c, #00d4ff) 0%, color-mix(in srgb, var(--c, #00d4ff) 70%, black) 100%);
      border: none;
      border-radius: 10px;
      color: #000;
      font-family: 'Orbitron', monospace;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.5px;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 0 16px color-mix(in srgb, var(--c, #00d4ff) 50%, transparent);
    }

    .task-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 0 28px color-mix(in srgb, var(--c, #00d4ff) 70%, transparent); }
    .task-btn:disabled { opacity: 0.5; cursor: not-allowed; }

    .completed-overlay {
      position: absolute;
      top: 12px;
      right: 12px;
      width: 28px;
      height: 28px;
      background: #22c55e;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .completed-overlay::after { content: '✓'; color: #000; font-size: 14px; font-weight: 700; }

    .level-nav { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
  `]
})
export class LevelProgressComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private gameState = inject(GameStateService);

  capability: Capability | undefined;
  subCap: SubCapability | undefined;
  level: Level | undefined;
  capId = '';
  subId = '';
  levelId = '';
  nextLevelId: string | null = null;
  totalXp = 0;
  justUnlocked = signal(false);
  lastXp = signal<number | null>(null);

  completedCount = () => this.level?.tasks.filter(t => t.completed).length ?? 0;
  earnedXp = () => this.level?.tasks.filter(t => t.completed).reduce((a, t) => a + t.xp, 0) ?? 0;
  taskProgress = () => this.level ? Math.round((this.completedCount() / this.level.tasks.length) * 100) : 0;

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.capId = p['capId'];
      this.subId = p['subId'];
      this.levelId = p['levelId'];
      this.capability = this.gameState.getCapability(this.capId);
      this.subCap = this.gameState.getSubCapability(this.capId, this.subId);
      if (this.subCap) {
        this.level = this.subCap.levels.find(l => l.id === this.levelId);
        const lvIdx = this.subCap.levels.findIndex(l => l.id === this.levelId);
        this.nextLevelId = this.subCap.levels[lvIdx + 1]?.id ?? null;
        this.totalXp = this.level?.tasks.reduce((a, t) => a + t.xp, 0) ?? 0;
      }
    });
  }

  completeTask(task: Task) {
    if (task.completed || !this.level) return;
    const wasCompleted = this.level.completed;
    this.gameState.completeTask(this.capId, this.subId, this.levelId, task.id, task.xp);

    // Refresh local references
    this.capability = this.gameState.getCapability(this.capId);
    this.subCap = this.gameState.getSubCapability(this.capId, this.subId);
    this.level = this.subCap?.levels.find(l => l.id === this.levelId);

    // XP burst animation
    this.lastXp.set(task.xp);
    setTimeout(() => this.lastXp.set(null), 2000);

    // Unlock animation
    if (!wasCompleted && this.level?.completed) {
      this.justUnlocked.set(true);
      this.gameState.unlockAchievement('level-up');
    }
  }

  getTypeIcon(type: string): string {
    return { theory: '📖', practice: '🔬', project: '🛠️', quiz: '❓' }[type] ?? '📋';
  }

  getTypeBadgeClass(type: string): string {
    return `badge-${type}`;
  }
}
