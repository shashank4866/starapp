import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameStateService } from '../../services/game-state.service';
import { Capability } from '../../models/capability.model';

@Component({
  selector: 'app-galaxy',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="galaxy-page">
      <div class="content-wrapper">
        <div class="galaxy-header animate-fadeInUp">
          <div class="page-label"><span class="terminal-prompt">>_</span> SECTOR MAP</div>
          <h1 class="gradient-text">Capability Galaxy</h1>
          <p class="galaxy-desc">Your universe of professional growth. Select a sector to set warp coordinates.</p>
        </div>

        <!-- Galaxy Orbs -->
        <div class="galaxy-grid animate-fadeInScale">
          @for (cap of capabilities(); track cap.id; let i = $index) {
            <a [routerLink]="['/capability', cap.id]"
               class="galaxy-orb"
               [class.orb-customer]="cap.id === 'customer'"
               [class.orb-leadership]="cap.id === 'leadership'"
               [class.orb-technology]="cap.id === 'technology'"
               [style.--cap-color]="cap.color"
               [style.--cap-glow]="cap.glowColor"
               (mouseenter)="hoveredCap = cap.id"
               (mouseleave)="hoveredCap = null">

              <!-- Planet Visual -->
              <div class="planet-container">
                <div class="planet" [style.--c]="cap.color">
                  <div class="planet-surface"></div>
                  <div class="planet-ring"></div>
                  <div class="planet-shine"></div>
                  <span class="planet-emoji">{{ cap.icon }}</span>
                </div>
                <!-- HUD Targeting reticle -->
                <div class="target-reticle" [style.border-color]="cap.glowColor"></div>
                <div class="planet-glow" [style.background]="cap.glowColor"></div>

                <!-- Orbiting satellites -->
                <div class="satellites">
                  @for (sub of cap.subCapabilities.slice(0,3); track sub.id; let j = $index) {
                    <div class="satellite" [style.--orbit-angle]="(j * 120) + 'deg'" [style.--orbit-delay]="(j * -2) + 's'">
                      <span>{{ sub.icon }}</span>
                    </div>
                  }
                </div>
              </div>

              <!-- Info -->
              <div class="orb-info">
                <h2 class="orb-name" [style.color]="cap.color">{{ cap.name }}</h2>
                <p class="orb-desc">{{ cap.description }}</p>

                <!-- Sub-caps preview -->
                <div class="subcap-pills">
                  @for (sub of cap.subCapabilities; track sub.id) {
                    <span class="subcap-pill" [style.border-color]="cap.color + '44'" [style.color]="cap.color">
                      {{ sub.icon }} {{ sub.name }}
                    </span>
                  }
                </div>

                <!-- Progress -->
                <div class="orb-progress">
                  <div class="progress-bar">
                    <div class="progress-fill" [style.width.%]="getProgress(cap)" [style.background]="'linear-gradient(90deg, ' + cap.color + ', ' + cap.color + '88)'"></div>
                  </div>
                  <div class="prog-info">
                    <span class="prog-label">Progress</span>
                    <span class="prog-pct font-orbitron" [style.color]="cap.color">{{ getProgress(cap) }}%</span>
                  </div>
                </div>

                <div class="explore-btn" [style.color]="cap.color">
                  [ INITIATE WARP ] <span class="arrow">→</span>
                </div>
              </div>
            </a>
          }
        </div>

        <!-- Galaxy Legend -->
        <div class="galaxy-legend animate-fadeInUp">
          <div class="legend-item">
            <div class="legend-dot" style="background:#00d4ff"></div>
            <span>Customer Galaxy</span>
          </div>
          <div class="legend-item">
            <div class="legend-dot" style="background:#a855f7"></div>
            <span>Leadership Galaxy</span>
          </div>
          <div class="legend-item">
            <div class="legend-dot" style="background:#22c55e"></div>
            <span>Technology Galaxy</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .galaxy-page {
      padding: 40px 0 64px;
      min-height: calc(100vh - 64px);
    }

    .galaxy-header {
      text-align: center;
      margin-bottom: 48px;
    }

    .page-label {
      color: #00d4ff;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 4px;
      margin-bottom: 12px;
      font-family: 'Orbitron', monospace;
    }

    .galaxy-header h1 {
      font-size: 48px;
      margin-bottom: 16px;
    }

    .galaxy-desc {
      color: #64748b;
      font-size: 16px;
      max-width: 500px;
      margin: 0 auto;
    }

    /* Galaxy Grid */
    .galaxy-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 28px;
      margin-bottom: 48px;
    }

    .galaxy-orb {
      background: rgba(4, 12, 26, 0.9);
      border: 1px solid rgba(0, 212, 255, 0.2);
      padding: 32px 28px;
      text-decoration: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 28px;
      transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
      position: relative;
      clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px));
    }
    
    .galaxy-orb::before, .galaxy-orb::after {
      content: ''; position: absolute; width: 30px; height: 30px;
      border: 2px solid transparent; pointer-events: none; transition: 0.3s; z-index: 10;
    }

    .galaxy-orb::before {
      top: 0; left: 0;
      border-top-color: var(--cap-glow); border-left-color: var(--cap-glow);
    }
    .galaxy-orb::after {
      bottom: 0; right: 0;
      border-bottom-color: var(--cap-glow); border-right-color: var(--cap-glow);
    }
    
    .galaxy-orb > .bg-glow-effect {
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse 80% 60% at 50% 0%, var(--cap-glow), transparent 70%);
      opacity: 0;
      transition: opacity 0.4s ease;
      z-index: 0;
      pointer-events: none;
    }

    .galaxy-orb:hover > .bg-glow-effect { opacity: 1; }

    .galaxy-orb:hover {
      transform: translateY(-8px);
      border-color: rgba(var(--cap-color-rgb, 0,212,255), 0.3);
      box-shadow: 0 20px 60px rgba(0,0,0,0.4);
    }

    .orb-customer:hover { border-color: rgba(0,212,255,0.4); box-shadow: 0 20px 60px rgba(0,212,255,0.15); }
    .orb-leadership:hover { border-color: rgba(168,85,247,0.4); box-shadow: 0 20px 60px rgba(168,85,247,0.15); }
    .orb-technology:hover { border-color: rgba(34,197,94,0.4); box-shadow: 0 20px 60px rgba(34,197,94,0.15); }

    /* Planet */
    .planet-container {
      position: relative;
      width: 140px;
      height: 140px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .planet {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 35%, color-mix(in srgb, var(--c) 80%, white), color-mix(in srgb, var(--c) 40%, black));
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 2;
      animation: float 5s ease-in-out infinite;
      box-shadow: inset -15px -15px 30px rgba(0,0,0,0.5), inset 5px 5px 15px rgba(255,255,255,0.1);
    }

    .planet-emoji { font-size: 36px; }

    .planet-ring {
      position: absolute;
      width: 130px;
      height: 30px;
      border: 2px solid rgba(255,255,255,0.15);
      border-radius: 50%;
      z-index: 1;
      transform: rotateX(75deg);
    }

    .planet-shine {
      position: absolute;
      top: 15%;
      left: 20%;
      width: 25px;
      height: 15px;
      background: rgba(255,255,255,0.2);
      border-radius: 50%;
      filter: blur(5px);
      z-index: 3;
    }

    .planet-glow {
      position: absolute;
      inset: -15px;
      border-radius: 50%;
      filter: blur(20px);
      opacity: 0.5;
      z-index: 0;
    }
    
    .target-reticle {
      position: absolute;
      inset: -10px;
      border: 1px dashed;
      border-radius: 50%;
      opacity: 0.3;
      animation: spin-reticle 20s linear infinite;
      z-index: 1;
      pointer-events: none;
    }
    
    @keyframes spin-reticle {
      100% { transform: rotate(360deg); }
    }

    /* Satellites */
    .satellites { position: absolute; inset: 0; }

    .satellite {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 24px;
      height: 24px;
      margin: -12px;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(10,22,40,0.8);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 50%;
      animation: orbit-planet 8s linear infinite;
      animation-delay: var(--orbit-delay);
      transform-origin: 70px 0;
    }

    @keyframes orbit-planet {
      from { transform: rotate(var(--orbit-angle)) translateX(70px) rotate(calc(-1 * var(--orbit-angle))); }
      to { transform: rotate(calc(var(--orbit-angle) + 360deg)) translateX(70px) rotate(calc(-1 * (var(--orbit-angle) + 360deg))); }
    }

    /* Orb Info */
    .orb-info {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 14px;
      position: relative;
      z-index: 1;
    }

    .orb-name {
      font-family: 'Orbitron', monospace;
      font-size: 22px;
      font-weight: 800;
      text-align: center;
    }

    .orb-desc {
      color: #64748b;
      font-size: 13px;
      text-align: center;
      line-height: 1.6;
    }

    .subcap-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      justify-content: center;
    }

    .subcap-pill {
      padding: 3px 10px;
      border-radius: 100px;
      border: 1px solid;
      font-size: 11px;
      font-weight: 500;
      background: rgba(255,255,255,0.03);
    }

    .orb-progress {}

    .prog-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 6px;
    }

    .prog-label { font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }
    .prog-pct { font-size: 13px; font-weight: 700; }

    .explore-btn {
      text-align: center;
      font-family: 'Orbitron', monospace;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.5px;
      padding: 10px;
      border-radius: 8px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      transition: all 0.2s ease;
    }

    .galaxy-orb:hover .explore-btn { background: rgba(255,255,255,0.08); }

    .arrow { display: inline-block; transition: transform 0.2s; }
    .galaxy-orb:hover .arrow { transform: translateX(4px); }

    /* Legend */
    .galaxy-legend {
      display: flex;
      align-items: center;
      gap: 28px;
      justify-content: center;
    }

    .legend-item { display: flex; align-items: center; gap: 8px; color: #64748b; font-size: 13px; }
    .legend-dot { width: 8px; height: 8px; border-radius: 50%; }

    @media (max-width: 1024px) {
      .galaxy-grid { grid-template-columns: 1fr; max-width: 480px; margin: 0 auto 48px; }
    }
  `]
})
export class GalaxyComponent {
  private gameState = inject(GameStateService);
  capabilities = this.gameState.capabilities;
  hoveredCap: string | null = null;

  getProgress(cap: Capability): number {
    return this.gameState.getProgressPercent(cap);
  }
}
