import { AnalyticsData } from '../types';

export const mockAnalyticsData: AnalyticsData = {
  weeklyActivity: [
    { day: 'Mon', date: 'Nov 17', problemsSolved: 3, xpEarned: 135, hoursSpent: 2.2 },
    { day: 'Tue', date: 'Nov 18', problemsSolved: 4, xpEarned: 190, hoursSpent: 2.8 },
    { day: 'Wed', date: 'Nov 19', problemsSolved: 2, xpEarned: 85, hoursSpent: 1.5 },
    { day: 'Thu', date: 'Nov 20', problemsSolved: 5, xpEarned: 240, hoursSpent: 3.4 },
    { day: 'Fri', date: 'Nov 21', problemsSolved: 3, xpEarned: 150, hoursSpent: 2.0 },
    { day: 'Sat', date: 'Nov 22', problemsSolved: 6, xpEarned: 310, hoursSpent: 4.1 },
    { day: 'Sun', date: 'Nov 23', problemsSolved: 4, xpEarned: 210, hoursSpent: 2.7 },
  ],
  monthlySubmissions: [
    { month: 'Jun', submissions: 28, acceptanceRate: 64.2 },
    { month: 'Jul', submissions: 42, acceptanceRate: 68.5 },
    { month: 'Aug', submissions: 65, acceptanceRate: 71.0 },
    { month: 'Sep', submissions: 88, acceptanceRate: 74.8 },
    { month: 'Oct', submissions: 112, acceptanceRate: 78.4 },
    { month: 'Nov', submissions: 142, acceptanceRate: 82.1 },
  ],
  topicProficiency: [
    { topic: 'Arrays', proficiencyPercentage: 88, solvedCount: 38, totalAvailable: 45 },
    { topic: 'Strings', proficiencyPercentage: 82, solvedCount: 29, totalAvailable: 35 },
    { topic: 'Trees', proficiencyPercentage: 68, solvedCount: 21, totalAvailable: 32 },
    { topic: 'Graphs', proficiencyPercentage: 62, solvedCount: 16, totalAvailable: 28 },
    { topic: 'Dynamic Programming', proficiencyPercentage: 48, solvedCount: 18, totalAvailable: 40 },
    { topic: 'Stack & Queue', proficiencyPercentage: 75, solvedCount: 15, totalAvailable: 20 },
    { topic: 'Sorting', proficiencyPercentage: 90, solvedCount: 14, totalAvailable: 16 },
    { topic: 'Searching', proficiencyPercentage: 70, solvedCount: 12, totalAvailable: 18 },
  ],
  heatmapData: generateHeatmapData(),
  xpHistory: [
    { week: 'W1', xp: 450 },
    { week: 'W2', xp: 980 },
    { week: 'W3', xp: 1600 },
    { week: 'W4', xp: 2200 },
    { week: 'W5', xp: 2850 },
    { week: 'W6', xp: 3450 },
  ],
};

function generateHeatmapData() {
  const result = [];
  const today = new Date('2026-11-23');
  // Generate 120 days (approx 17 weeks) of realistic contribution activity
  for (let i = 119; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    
    // Pattern: high activity in recent weeks, some rest days
    let count = 0;
    const dayOfWeek = d.getDay(); // 0 is Sunday, 6 is Saturday
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    // Seed pseudo-randomness based on date
    const seed = (d.getDate() * 17 + d.getMonth() * 31) % 100;
    if (i < 20) {
      // Recent streak: always active!
      count = isWeekend ? (seed % 4) + 4 : (seed % 4) + 2;
    } else if (seed > 25) {
      count = isWeekend ? (seed % 5) + 2 : (seed % 4) + 1;
    }

    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (count === 0) level = 0;
    else if (count <= 2) level = 1;
    else if (count <= 4) level = 2;
    else if (count <= 6) level = 3;
    else level = 4;

    result.push({
      date: dateStr,
      count,
      level,
    });
  }
  return result;
}
