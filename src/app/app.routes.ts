import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

// Force rebuild trigger
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'role',
    loadComponent: () => import('./pages/role-overview/role-overview.component').then(m => m.RoleOverviewComponent),
    canActivate: [authGuard]
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: 'galaxy',
    loadComponent: () => import('./pages/galaxy/galaxy.component').then(m => m.GalaxyComponent),
    canActivate: [authGuard]
  },
  {
    path: 'capability/:id',
    loadComponent: () => import('./pages/capability/capability.component').then(m => m.CapabilityComponent),
    canActivate: [authGuard]
  },
  {
    path: 'capability/:capId/sub/:subId',
    loadComponent: () => import('./pages/sub-capability/sub-capability.component').then(m => m.SubCapabilityComponent),
    canActivate: [authGuard]
  },
  {
    path: 'capability/:capId/sub/:subId/level/:levelId',
    loadComponent: () => import('./pages/level-progress/level-progress.component').then(m => m.LevelProgressComponent),
    canActivate: [authGuard]
  },
  {
    path: 'achievements',
    loadComponent: () => import('./pages/achievements/achievements.component').then(m => m.AchievementsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: 'login' }
];
