import { LearningPath, Lesson } from '../types';
import { mockLearningPaths } from '../data/mockLearningPaths';
import { simulateNetworkDelay, ApiResponse } from './apiClient';

class LearningPathService {
  /**
   * [BACKEND INTEGRATION POINT]
   * GET /api/v1/learning-paths
   */
  async getLearningPaths(): Promise<ApiResponse<LearningPath[]>> {
    return simulateNetworkDelay(mockLearningPaths, 200);
  }

  /**
   * [BACKEND INTEGRATION POINT]
   * GET /api/v1/learning-paths/{idOrSlug}
   */
  async getLearningPathById(idOrSlug: string): Promise<ApiResponse<LearningPath | null>> {
    const path = mockLearningPaths.find(
      (p) => p.id === idOrSlug || p.slug === idOrSlug
    ) || null;
    return simulateNetworkDelay(path, 150);
  }

  /**
   * [BACKEND INTEGRATION POINT]
   * PATCH /api/v1/learning-paths/{pathId}/lessons/{lessonId}/status
   */
  async updateLessonStatus(
    pathId: string,
    lessonId: string,
    status: 'locked' | 'in_progress' | 'completed'
  ): Promise<ApiResponse<Lesson | null>> {
    const path = mockLearningPaths.find((p) => p.id === pathId || p.slug === pathId);
    if (!path) {
      return simulateNetworkDelay(null, 100);
    }

    let targetLesson: Lesson | null = null;
    for (const mod of path.modules) {
      const les = mod.lessons.find((l) => l.id === lessonId);
      if (les) {
        les.status = status;
        targetLesson = les;
        break;
      }
    }

    // Recalculate completed lessons count
    let completed = 0;
    for (const mod of path.modules) {
      completed += mod.lessons.filter((l) => l.status === 'completed').length;
    }
    path.completedLessons = completed;

    return simulateNetworkDelay(targetLesson, 200);
  }
}

export const learningPathService = new LearningPathService();
