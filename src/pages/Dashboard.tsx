import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Flame,
  Sparkles,
  Trophy,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Brain,
  Code2,
  Calendar,
  BookOpen,
  Compass,
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { Challenge, LearningPath, AnalyticsData } from '../types';
import { challengeService } from '../services/challengeService';
import { learningPathService } from '../services/learningPathService';
import { analyticsService } from '../services/analyticsService';
import { StatCard } from '../components/cards/StatCard';
import { ChallengeCard } from '../components/cards/ChallengeCard';
import { WeeklyBarChart } from '../components/charts/WeeklyBarChart';
import { DifficultyBreakdown } from '../components/charts/DifficultyBreakdown';
import { Card } from '../components/ui/Card';
import { ProgressBar } from '../components/ui/ProgressBar';

export const Dashboard: React.FC = () => {
  const { user, toggleDailyGoal } = useUser();
  const [recommendedChallenges, setRecommendedChallenges] = useState<Challenge[]>([]);
  const [activePath, setActivePath] = useState<LearningPath | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    // [BACKEND INTEGRATION POINT] Fetch dashboard initial resources
    const loadDashboardData = async () => {
      const [chalRes, pathRes, analRes] = await Promise.all([
        challengeService.getChallenges({ status: 'Unsolved' }),
        learningPathService.getLearningPathById('path-dsa'),
        analyticsService.getAnalyticsData(),
      ]);

      if (chalRes.success) setRecommendedChallenges(chalRes.data.slice(0, 3));
      if (pathRes.success) setActivePath(pathRes.data);
      if (analRes.success) setAnalytics(analRes.data);
    };

    loadDashboardData();
  }, []);

  if (!user) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const getTimeOfDayGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const levelProgress = Math.round((user.currentXp / user.nextLevelXp) * 100);

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in">
      {/* 1. Welcome Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-950/60 via-indigo-950/40 to-slate-900 border border-purple-500/30 p-6 md:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-500/20 px-3 py-1 rounded-full border border-purple-500/30 flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5" /> Ready to conquer today's quest?
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {getTimeOfDayGreeting()}, {user.name.split(' ')[0]}! 🚀
            </h1>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              You are on an <span className="text-amber-400 font-bold">{user.streakDays}-day coding streak</span>! Maintain consistency today to unlock the <em>Relentless Momentum</em> badge and advance to Level {user.level + 1}.
            </p>
          </div>

          {/* Quick Level Pill & XP overview */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 shrink-0 w-full md:w-72 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-300">Level {user.level} Progress</span>
              <span className="text-xs font-mono font-bold text-purple-400">
                {user.currentXp} / {user.nextLevelXp} XP
              </span>
            </div>
            <ProgressBar value={user.currentXp} max={user.nextLevelXp} size="sm" variant="gradient" />
            <p className="text-[11px] text-slate-400 mt-2 text-right">
              {user.nextLevelXp - user.currentXp} XP until Level {user.level + 1}
            </p>
          </div>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 2. Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Coding Streak"
          value={`${user.streakDays} Days`}
          subtitle="2 freeze protectors available"
          icon={<Flame className="w-6 h-6 text-amber-500 fill-amber-500" />}
          accentColor="amber"
          trend={{ value: 'Best: 24d', isPositive: true }}
        />
        <StatCard
          title="Problems Solved"
          value={user.totalSolved}
          subtitle="Top 8% globally this month"
          icon={<Code2 className="w-6 h-6 text-purple-400" />}
          accentColor="purple"
          trend={{ value: '+8 this week', isPositive: true }}
        />
        <StatCard
          title="Experience Points"
          value={user.currentXp.toLocaleString()}
          subtitle="Diamond League Division"
          icon={<Sparkles className="w-6 h-6 text-cyan-400" />}
          accentColor="cyan"
          trend={{ value: '+420 XP today', isPositive: true }}
        />
        <StatCard
          title="Global Ranking"
          value={`#${user.rank}`}
          subtitle="Top 5% of active developers"
          icon={<Trophy className="w-6 h-6 text-emerald-400" />}
          accentColor="emerald"
          trend={{ value: 'Up 4 ranks', isPositive: true }}
        />
      </div>

      {/* 3. Middle Section: Activity Chart + Difficulty Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-6">
            {analytics ? (
              <WeeklyBarChart data={analytics.weeklyActivity} />
            ) : (
              <div className="h-44 flex items-center justify-center text-xs text-slate-500">
                Loading weekly metrics...
              </div>
            )}
          </Card>
        </div>

        <div>
          <Card className="p-6">
            <DifficultyBreakdown
              data={user.solvedByDifficulty}
              totalSolved={user.totalSolved}
            />
          </Card>
        </div>
      </div>

      {/* 4. Continue Learning & Daily Goals Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Continue Learning Course Card */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-purple-400" />
              Continue Learning
            </h3>
            <NavLink
              to="/learning-paths"
              className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
            >
              All Paths <ArrowRight className="w-3.5 h-3.5" />
            </NavLink>
          </div>

          {activePath && (
            <Card className="p-6 relative overflow-hidden bg-gradient-to-r from-slate-900/90 to-purple-950/30 border-purple-500/20">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1.5 max-w-xl">
                  <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/30">
                    Active Roadmap · Module 3
                  </span>
                  <h4 className="text-lg font-bold text-white">{activePath.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Next Lesson: <strong>Building an O(1) LRU Cache</strong> (Combining Hash Maps & Doubly Linked Lists)
                  </p>

                  <div className="pt-2">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-slate-400">
                        {activePath.completedLessons} of {activePath.totalLessons} Lessons Completed
                      </span>
                      <span className="font-mono text-purple-300 font-bold">
                        {Math.round((activePath.completedLessons / activePath.totalLessons) * 100)}%
                      </span>
                    </div>
                    <ProgressBar
                      value={activePath.completedLessons}
                      max={activePath.totalLessons}
                      size="sm"
                      variant="purple"
                    />
                  </div>
                </div>

                <NavLink
                  to={`/learning-paths/${activePath.id}`}
                  className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs md:text-sm font-bold shadow-lg shadow-purple-900/40 hover:shadow-purple-700/50 transition-all flex items-center gap-2 shrink-0"
                >
                  <span>Resume Lesson</span>
                  <ArrowRight className="w-4 h-4" />
                </NavLink>
              </div>
            </Card>
          )}
        </div>

        {/* Daily Goals Checklist */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Daily Goals
            </h3>
            <span className="text-xs text-slate-400 font-mono">1/3 Done</span>
          </div>

          <Card className="p-4 space-y-2.5">
            {user.dailyGoals.map((goal) => (
              <div
                key={goal.id}
                onClick={() => toggleDailyGoal(goal.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  goal.completed
                    ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                    : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      goal.completed ? 'text-emerald-400' : 'text-slate-600'
                    }`}
                  />
                  <div>
                    <p
                      className={`text-xs font-semibold ${
                        goal.completed ? 'line-through text-slate-400' : 'text-slate-200'
                      }`}
                    >
                      {goal.title}
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono">
                      {goal.current} / {goal.target} {goal.unit}
                    </p>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold text-purple-300">
                  +{goal.xpReward} XP
                </span>
              </div>
            ))}
          </Card>
        </div>
      </div>

      {/* 5. Recommended Challenges Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Recommended for Your Skill Level
            </h3>
            <p className="text-xs text-slate-400">
              Curated algorithmic challenges to reinforce recently practiced concepts
            </p>
          </div>
          <NavLink
            to="/challenges"
            className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
          >
            Explore 150+ Problems <ArrowRight className="w-3.5 h-3.5" />
          </NavLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendedChallenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      </div>

      {/* 6. Recent Activity Timeline */}
      <div>
        <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-purple-400" />
          Recent Activity Timeline
        </h3>

        <Card className="p-4 divide-y divide-slate-800/60">
          {user.recentActivities.map((act) => (
            <div key={act.id} className="py-3 flex items-start justify-between gap-4 first:pt-1 last:pb-1">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 shrink-0 shadow-sm shadow-purple-500/50" />
                <div>
                  <h4 className="text-xs md:text-sm font-semibold text-slate-200">{act.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{act.description}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs font-bold font-mono text-purple-300">
                  +{act.xpEarned} XP
                </span>
                <span className="text-[11px] text-slate-500 block">{act.timestamp}</span>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};
