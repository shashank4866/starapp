export interface Task {
  id: string;
  title: string;
  description: string;
  xp: number;
  completed: boolean;
  type: 'theory' | 'practice' | 'project' | 'quiz';
}

export interface Level {
  id: string;
  name: string;
  order: number;
  tasks: Task[];
  unlocked: boolean;
  completed: boolean;
  xpRequired: number;
}

export interface SubCapability {
  id: string;
  name: string;
  icon: string;
  description: string;
  levels: Level[];
  totalXp: number;
  earnedXp: number;
}

export interface Capability {
  id: string;
  name: string;
  icon: string;
  color: string;
  glowColor: string;
  description: string;
  subCapabilities: SubCapability[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: Date;
  xpReward: number;
}

export interface CosmonautProfile {
  id: string;
  name: string;
  title: string;
  avatar: string;
  totalXp: number;
  level: number;
  streak: number;
  joinDate: Date;
  achievements: Achievement[];
}
