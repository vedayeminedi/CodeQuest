export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type ChallengeTopic = 
  | 'Arrays' 
  | 'Strings' 
  | 'Linked Lists' 
  | 'Trees' 
  | 'Graphs' 
  | 'Dynamic Programming' 
  | 'Recursion' 
  | 'Sorting' 
  | 'Searching' 
  | 'Stack & Queue' 
  | 'Bit Manipulation' 
  | 'Greedy';

export type ChallengeStatus = 'Solved' | 'Attempted' | 'Unsolved';

export type ProgrammingLanguage = 'python' | 'javascript' | 'typescript' | 'cpp' | 'java';

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isCustom?: boolean;
}

export interface CodeTemplate {
  language: ProgrammingLanguage;
  template: string;
  solution?: string;
}

export interface Challenge {
  id: string;
  title: string;
  slug: string;
  difficulty: Difficulty;
  topic: ChallengeTopic;
  acceptanceRate: number;
  xpReward: number;
  status: ChallengeStatus;
  companies: string[];
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  hints: string[];
  codeTemplates: Record<ProgrammingLanguage, string>;
  testCases: TestCase[];
  likes: number;
  dislikes: number;
  author: string;
}

export interface RunCodeResult {
  status: 'passed' | 'failed' | 'error';
  executionTimeMs: number;
  memoryUsageMb: number;
  testCaseResults: {
    caseIndex: number;
    input: string;
    expectedOutput: string;
    actualOutput: string;
    passed: boolean;
    logs?: string;
  }[];
  consoleOutput?: string;
  errorMessage?: string;
}

export interface SubmissionResult {
  id: string;
  challengeId: string;
  status: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Runtime Error';
  runtime: number; // in ms
  runtimeBeatsPercentage: number;
  memory: number; // in MB
  memoryBeatsPercentage: number;
  totalTestCases: number;
  passedTestCases: number;
  xpEarned: number;
  submittedAt: string;
  code: string;
  language: ProgrammingLanguage;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  xpReward: number;
  status: 'locked' | 'in_progress' | 'completed';
  type: 'concept' | 'interactive' | 'challenge' | 'quiz';
  associatedChallengeId?: string;
}

export interface LearningModule {
  id: string;
  order: number;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface LearningPath {
  id: string;
  slug: string;
  title: string;
  description: string;
  iconName: string;
  category: 'Language' | 'Algorithms' | 'Development' | 'Architecture';
  difficulty: Difficulty;
  estimatedHours: number;
  totalModules: number;
  totalLessons: number;
  completedLessons: number;
  xpReward: number;
  rating: number;
  tags: string[];
  bannerGradient: string;
  modules: LearningModule[];
}

export type Rarity = 'Common' | 'Rare' | 'Epic' | 'Legendary';
export type AchievementCategory = 'Problem Solving' | 'Streaks' | 'Mastery' | 'Speed' | 'Community';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: AchievementCategory;
  rarity: Rarity;
  iconName: string;
  xpReward: number;
  currentProgress: number;
  maxProgress: number;
  isUnlocked: boolean;
  unlockedAt?: string;
}

export interface LeaderboardUser {
  rank: number;
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  level: number;
  tier: 'Grandmaster' | 'Master' | 'Diamond' | 'Platinum' | 'Gold';
  xp: number;
  problemsSolved: number;
  streakDays: number;
  countryCode: string;
  badge?: string;
  change: 'up' | 'down' | 'same';
  isCurrentUser?: boolean;
}

export type LeaderboardTimeframe = 'weekly' | 'global' | 'friends';

export interface DailyGoal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
  completed: boolean;
  xpReward: number;
}

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  avatarUrl: string;
  level: number;
  title: string;
  currentXp: number;
  nextLevelXp: number;
  streakDays: number;
  streakFreezeRemaining: number;
  totalSolved: number;
  solvedByDifficulty: {
    easy: number;
    totalEasy: number;
    medium: number;
    totalMedium: number;
    hard: number;
    totalHard: number;
  };
  rank: number;
  tier: string;
  joinedDate: string;
  bio: string;
  githubUrl: string;
  linkedinUrl: string;
  dailyGoals: DailyGoal[];
  recentActivities: {
    id: string;
    type: 'challenge_solved' | 'level_up' | 'achievement_unlocked' | 'streak_milestone';
    title: string;
    description: string;
    timestamp: string;
    xpEarned: number;
  }[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
  complexityAnalysis?: {
    time: string;
    space: string;
  };
  suggestedFollowUps?: string[];
}

export interface AnalyticsData {
  weeklyActivity: {
    day: string;
    date: string;
    problemsSolved: number;
    xpEarned: number;
    hoursSpent: number;
  }[];
  monthlySubmissions: {
    month: string;
    submissions: number;
    acceptanceRate: number;
  }[];
  topicProficiency: {
    topic: ChallengeTopic;
    proficiencyPercentage: number;
    solvedCount: number;
    totalAvailable: number;
  }[];
  heatmapData: {
    date: string;
    count: number;
    level: 0 | 1 | 2 | 3 | 4; // intensity
  }[];
  xpHistory: {
    week: string;
    xp: number;
  }[];
}
