import { Component, inject, computed, effect } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { NavShellComponent } from './components/nav-shell/nav-shell.component';
import { GameStateService } from './services/game-state.service';
import { trigger, transition, style, animate, query } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavShellComponent],
  template: `
    <!-- Cosmic Background Elements -->
    <div class="crt-overlay"></div>
    <div class="space-layer deep-space"></div>
    <div class="space-layer stars-bg"></div>
    <div class="space-layer nebula-bg"></div>
    <div class="space-layer shooting-stars">
      <div class="star"></div>
      <div class="star"></div>
      <div class="star"></div>
    </div>
    
    <!-- Floating Background Planets -->
    <div class="bg-planet planet-1"></div>
    <div class="bg-planet planet-2"></div>
    <div class="bg-planet planet-3"></div>
    <div class="bg-planet planet-4"></div>
    <div class="bg-planet planet-5"></div>
    <div class="bg-planet planet-6"></div>

    <div class="page-container">
      @if (showNav) {
        <app-nav-shell />
      }
      @if (notification()) {
        <div class="notification-toast">🎉 {{ notification() }}</div>
      }
      <div [@routeAnimations]="routeState">
        <router-outlet />
      </div>
    </div>
  `,
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(16px)' }),
          animate('350ms cubic-bezier(0.4,0,0.2,1)', style({ opacity: 1, transform: 'translateY(0)' }))
        ], { optional: true })
      ])
    ])
  ]
})
export class App {
  private gameState = inject(GameStateService);
  private router = inject(Router);

  notification = this.gameState.lastNotification;
  showNav = false;
  routeState = 0;

  constructor() {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: any) => {
      this.showNav = !e.urlAfterRedirects.includes('/login');
      this.routeState++;
    });

    effect(() => {
      const n = this.notification();
      if (n) setTimeout(() => this.gameState.clearNotification(), 4000);
    });
  }
}
