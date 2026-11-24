import { Achievement, AchievementCategory } from '../types';
import { mockAchievements } from '../data/mockAchievements';
import { simulateNetworkDelay, ApiResponse } from './apiClient';

class AchievementService {
  /**
   * [BACKEND INTEGRATION POINT]
   * GET /api/v1/achievements?category={category}
   */
  async getAchievements(
    category?: AchievementCategory | 'All'
  ): Promise<ApiResponse<Achievement[]>> {
    let list = [...mockAchievements];
    if (category && category !== 'All') {
      list = list.filter((a) => a.category === category);
    }
    return simulateNetworkDelay(list, 180);
  }

  /**
   * [BACKEND INTEGRATION POINT]
   * POST /api/v1/achievements/{id}/claim
   */
  async claimAchievement(id: string): Promise<ApiResponse<Achievement | null>> {
    const ach = mockAchievements.find((a) => a.id === id);
    if (ach && !ach.isUnlocked && ach.currentProgress >= ach.maxProgress) {
      ach.isUnlocked = true;
      ach.unlockedAt = 'Just now';
      return simulateNetworkDelay({ ...ach }, 200);
    }
    return simulateNetworkDelay(ach || null, 100);
  }
}

export const achievementService = new AchievementService();
