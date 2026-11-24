import { Challenge, Difficulty, ChallengeTopic, ChallengeStatus, RunCodeResult, SubmissionResult, ProgrammingLanguage } from '../types';
import { mockChallenges } from '../data/mockChallenges';
import { simulateNetworkDelay, ApiResponse } from './apiClient';

export interface ChallengeFilters {
  topic?: ChallengeTopic | 'All';
  difficulty?: Difficulty | 'All';
  status?: ChallengeStatus | 'All';
  search?: string;
  sortBy?: 'acceptance' | 'difficulty' | 'xp' | 'popularity';
}

class ChallengeService {
  /**
   * [BACKEND INTEGRATION POINT]
   * GET /api/v1/challenges?topic={topic}&difficulty={difficulty}&status={status}&search={search}
   */
  async getChallenges(filters?: ChallengeFilters): Promise<ApiResponse<Challenge[]>> {
    let result = [...mockChallenges];

    if (filters) {
      if (filters.search && filters.search.trim() !== '') {
        const query = filters.search.toLowerCase();
        result = result.filter(
          (c) =>
            c.title.toLowerCase().includes(query) ||
            c.topic.toLowerCase().includes(query) ||
            c.companies.some((comp) => comp.toLowerCase().includes(query))
        );
      }

      if (filters.difficulty && filters.difficulty !== 'All') {
        result = result.filter((c) => c.difficulty === filters.difficulty);
      }

      if (filters.topic && filters.topic !== 'All') {
        result = result.filter((c) => c.topic === filters.topic);
      }

      if (filters.status && filters.status !== 'All') {
        result = result.filter((c) => c.status === filters.status);
      }

      if (filters.sortBy) {
        if (filters.sortBy === 'acceptance') {
          result.sort((a, b) => b.acceptanceRate - a.acceptanceRate);
        } else if (filters.sortBy === 'xp') {
          result.sort((a, b) => b.xpReward - a.xpReward);
        } else if (filters.sortBy === 'popularity') {
          result.sort((a, b) => b.likes - a.likes);
        }
      }
    }

    return simulateNetworkDelay(result, 200);
  }

  /**
   * [BACKEND INTEGRATION POINT]
   * GET /api/v1/challenges/{idOrSlug}
   */
  async getChallengeById(idOrSlug: string): Promise<ApiResponse<Challenge | null>> {
    const challenge = mockChallenges.find(
      (c) => c.id === idOrSlug || c.slug === idOrSlug
    ) || null;
    return simulateNetworkDelay(challenge, 150);
  }

  /**
   * [BACKEND INTEGRATION POINT]
   * POST /api/v1/challenges/{id}/run
   * Executes code in a secure remote sandbox (e.g. Judge0 or custom Docker worker).
   */
  async runCode(
    challengeId: string,
    language: ProgrammingLanguage,
    code: string
  ): Promise<ApiResponse<RunCodeResult>> {
    const challenge = mockChallenges.find((c) => c.id === challengeId);
    
    // Simulate test execution delay (450ms)
    await new Promise((resolve) => setTimeout(resolve, 450));

    const testResults = (challenge?.testCases || []).map((tc, idx) => ({
      caseIndex: idx + 1,
      input: tc.input,
      expectedOutput: tc.expectedOutput,
      actualOutput: tc.expectedOutput, // simulated passing by default
      passed: true,
      logs: `Stdout: Processing test input ${tc.input.slice(0, 20)}... Done.`,
    }));

    const result: RunCodeResult = {
      status: 'passed',
      executionTimeMs: Math.floor(Math.random() * 30) + 40,
      memoryUsageMb: +(14.2 + Math.random() * 2).toFixed(1),
      testCaseResults: testResults,
      consoleOutput: `[CodeQuest Runner v3.2 - ${language.toUpperCase()}]\nExecution completed in ${testResults.length} test cases with status: SUCCESS.`,
    };

    return {
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * [BACKEND INTEGRATION POINT]
   * POST /api/v1/challenges/{id}/submit
   * Submits code to judging queue, updates user stats and returns acceptance results.
   */
  async submitCode(
    challengeId: string,
    language: ProgrammingLanguage,
    code: string
  ): Promise<ApiResponse<SubmissionResult>> {
    const challenge = mockChallenges.find((c) => c.id === challengeId);
    
    // Simulate grading delay (700ms)
    await new Promise((resolve) => setTimeout(resolve, 700));

    const runtime = Math.floor(Math.random() * 25) + 38;
    const runtimeBeats = +(88 + Math.random() * 10).toFixed(1);
    const memory = +(14.1 + Math.random() * 2.5).toFixed(1);
    const memoryBeats = +(82 + Math.random() * 14).toFixed(1);

    const submission: SubmissionResult = {
      id: `sub_${Date.now()}`,
      challengeId,
      status: 'Accepted',
      runtime,
      runtimeBeatsPercentage: runtimeBeats,
      memory,
      memoryBeatsPercentage: memoryBeats,
      totalTestCases: 48,
      passedTestCases: 48,
      xpEarned: challenge?.xpReward || 50,
      submittedAt: 'Just now',
      code,
      language,
    };

    // Mark challenge as solved locally
    if (challenge) {
      challenge.status = 'Solved';
    }

    return {
      success: true,
      data: submission,
      timestamp: new Date().toISOString(),
    };
  }
}

export const challengeService = new ChallengeService();
