import { UserProfile, DailyGoal } from '../types';
import { mockUserProfile } from '../data/mockUser';
import { simulateNetworkDelay, ApiResponse } from './apiClient';

class UserService {
  private userState: UserProfile = { ...mockUserProfile };

  /**
   * [BACKEND INTEGRATION POINT]
   * GET /api/v1/user/profile
   */
  async getUserProfile(): Promise<ApiResponse<UserProfile>> {
    return simulateNetworkDelay({ ...this.userState }, 150);
  }

  /**
   * [BACKEND INTEGRATION POINT]
   * PATCH /api/v1/user/profile
   */
  async updateProfile(updates: Partial<UserProfile>): Promise<ApiResponse<UserProfile>> {
    this.userState = {
      ...this.userState,
      ...updates,
    };
    return simulateNetworkDelay({ ...this.userState }, 200);
  }

  /**
   * [BACKEND INTEGRATION POINT]
   * POST /api/v1/user/goals/{goalId}/toggle
   */
  async toggleGoal(goalId: string): Promise<ApiResponse<DailyGoal | null>> {
    const goal = this.userState.dailyGoals.find((g) => g.id === goalId);
    if (goal) {
      goal.completed = !goal.completed;
      if (goal.completed) {
        goal.current = goal.target;
        this.addXP(goal.xpReward);
      } else {
        goal.current = Math.max(0, goal.target - 1);
      }
      return simulateNetworkDelay({ ...goal }, 150);
    }
    return simulateNetworkDelay(null, 100);
  }

  /**
   * [BACKEND INTEGRATION POINT]
   * POST /api/v1/user/xp
   */
  async addXP(amount: number): Promise<ApiResponse<{ currentXp: number; level: number; leveledUp: boolean }>> {
    let currentXp = this.userState.currentXp + amount;
    let level = this.userState.level;
    let leveledUp = false;

    while (currentXp >= this.userState.nextLevelXp) {
      currentXp -= this.userState.nextLevelXp;
      level += 1;
      leveledUp = true;
      this.userState.nextLevelXp = Math.floor(this.userState.nextLevelXp * 1.25);
    }

    this.userState.currentXp = currentXp;
    this.userState.level = level;

    return simulateNetworkDelay({ currentXp, level, leveledUp }, 100);
  }
}

export const userService = new UserService();
