import { LeaderboardUser, LeaderboardTimeframe } from '../types';
import {
  mockWeeklyLeaderboard,
  mockGlobalLeaderboard,
  mockFriendsLeaderboard,
} from '../data/mockLeaderboard';
import { simulateNetworkDelay, ApiResponse } from './apiClient';

class LeaderboardService {
  /**
   * [BACKEND INTEGRATION POINT]
   * GET /api/v1/leaderboard?timeframe={weekly|global|friends}
   */
  async getLeaderboard(
    timeframe: LeaderboardTimeframe = 'weekly'
  ): Promise<ApiResponse<LeaderboardUser[]>> {
    let dataset = mockWeeklyLeaderboard;
    if (timeframe === 'global') dataset = mockGlobalLeaderboard;
    if (timeframe === 'friends') dataset = mockFriendsLeaderboard;

    return simulateNetworkDelay([...dataset], 200);
  }
}

export const leaderboardService = new LeaderboardService();
