import { AnalyticsData } from '../types';
import { mockAnalyticsData } from '../data/mockAnalytics';
import { simulateNetworkDelay, ApiResponse } from './apiClient';

class AnalyticsService {
  /**
   * [BACKEND INTEGRATION POINT]
   * GET /api/v1/analytics/overview
   */
  async getAnalyticsData(): Promise<ApiResponse<AnalyticsData>> {
    return simulateNetworkDelay(mockAnalyticsData, 220);
  }
}

export const analyticsService = new AnalyticsService();
