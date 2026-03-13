import { Injectable, signal, computed } from '@angular/core';
import { Capability, CosmonautProfile, Achievement } from '../models/capability.model';
import { DataService } from './data.service';

export interface GameState {
  capabilities: Capability[];
  profile: CosmonautProfile;
  achievements: Achievement[];
  completedTasks: Set<string>;
  visitedGalaxies: Set<string>;
  lastNotification: string | null;
}

@Injectable({ providedIn: 'root' })
export class GameStateService {
  private state = signal<GameState>({
    capabilities: [],
    profile: { id: '', name: '', title: '', avatar: '', totalXp: 0, level: 1, streak: 5, joinDate: new Date(), achievements: [] },
    achievements: [],
    completedTasks: new Set<string>(),
    visitedGalaxies: new Set<string>(),
    lastNotification: null
  });

  capabilities = computed(() => this.state().capabilities);
  profile = computed(() => this.state().profile);
  achievements = computed(() => this.state().achievements);
  totalXp = computed(() => this.state().profile.totalXp);
  lastNotification = computed(() => this.state().lastNotification);

  constructor(private dataService: DataService) {
    this.initializeState();
  }

  private initializeState() {
    const caps = this.dataService.getCapabilities();
    const profile = this.dataService.getProfile();
    const achievements = this.dataService.getAchievements();
    this.state.set({
      capabilities: caps,
      profile,
      achievements,
      completedTasks: new Set(),
      visitedGalaxies: new Set(),
      lastNotification: null
    });
  }

  visitGalaxy(capabilityId: string) {
    const visited = new Set(this.state().visitedGalaxies);
    visited.add(capabilityId);
    this.state.update(s => ({ ...s, visitedGalaxies: visited }));
    if (visited.size >= 3) {
      this.unlockAchievement('explorer');
    }
  }

  completeTask(capabilityId: string, subCapId: string, levelId: string, taskId: string, xp: number) {
    const completed = new Set(this.state().completedTasks);
    if (completed.has(taskId)) return;
    completed.add(taskId);

    const caps = this.state().capabilities.map(cap => {
      if (cap.id !== capabilityId) return cap;
      return {
        ...cap,
        subCapabilities: cap.subCapabilities.map(sub => {
          if (sub.id !== subCapId) return sub;
          const newEarned = sub.earnedXp + xp;
          const updatedLevels = sub.levels.map(lv => {
            if (lv.id !== levelId) return lv;
            const updatedTasks = lv.tasks.map(t => t.id === taskId ? { ...t, completed: true } : t);
            const allDone = updatedTasks.every(t => t.completed);
            return { ...lv, tasks: updatedTasks, completed: allDone };
          });
          // Unlock next level if current is completed
          const completedLevels = updatedLevels.filter(lv => lv.completed).map(lv => lv.order);
          const finalLevels = updatedLevels.map(lv => {
            const prevCompleted = completedLevels.includes(lv.order - 1);
            return prevCompleted && !lv.unlocked ? { ...lv, unlocked: true } : lv;
          });
          return { ...sub, earnedXp: newEarned, levels: finalLevels };
        })
      };
    });

    const oldTotal = this.state().profile.totalXp;
    const newTotal = oldTotal + xp;
    const newLevel = Math.floor(newTotal / 500) + 1;

    const updatedProfile = { ...this.state().profile, totalXp: newTotal, level: newLevel };
    this.state.update(s => ({ ...s, capabilities: caps, profile: updatedProfile, completedTasks: completed }));

    this.checkAchievements(completed, capabilityId, newTotal);
  }

  private checkAchievements(completed: Set<string>, capabilityId: string, totalXp: number) {
    if (completed.size === 1) this.unlockAchievement('first-task');
    if (completed.size >= 10) this.unlockAchievement('task-10');
    if (totalXp >= 1000) this.unlockAchievement('centurion');

    // Check all-rounder
    const state = this.state();
    const completedCaps = new Set<string>();
    state.capabilities.forEach(cap => {
      cap.subCapabilities.forEach(sub => {
        sub.levels.forEach(lv => {
          lv.tasks.forEach(t => {
            if (t.completed) completedCaps.add(cap.id);
          });
        });
      });
    });
    if (completedCaps.size >= 3) this.unlockAchievement('all-rounder');
  }

  unlockAchievement(achievementId: string) {
    const achievements = this.state().achievements.map(a =>
      a.id === achievementId && !a.unlocked ? { ...a, unlocked: true, unlockedDate: new Date() } : a
    );
    const justUnlocked = achievements.find(a => a.id === achievementId && a.unlocked);
    this.state.update(s => ({
      ...s,
      achievements,
      lastNotification: justUnlocked ? `🏆 Achievement unlocked: ${justUnlocked.title}` : s.lastNotification
    }));
  }

  clearNotification() {
    this.state.update(s => ({ ...s, lastNotification: null }));
  }

  getCapability(id: string) {
    return this.state().capabilities.find(c => c.id === id);
  }

  getSubCapability(capId: string, subId: string) {
    return this.getCapability(capId)?.subCapabilities.find(s => s.id === subId);
  }

  getProgressPercent(cap: Capability): number {
    let total = 0, earned = 0;
    cap.subCapabilities.forEach(sub => {
      total += sub.totalXp;
      earned += sub.earnedXp;
    });
    return total > 0 ? Math.round((earned / total) * 100) : 0;
  }

  getSubCapProgress(sub: { earnedXp: number; totalXp: number }): number {
    return sub.totalXp > 0 ? Math.round((sub.earnedXp / sub.totalXp) * 100) : 0;
  }
}
