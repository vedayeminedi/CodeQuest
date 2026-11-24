import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  Calendar,
  Flame,
  Sparkles,
  TrendingUp,
  Brain,
  Code2,
  CheckCircle2,
} from 'lucide-react';
import { AnalyticsData } from '../types';
import { analyticsService } from '../services/analyticsService';
import { useUser } from '../context/UserContext';
import { StatCard } from '../components/cards/StatCard';
import { ActivityHeatmap } from '../components/charts/ActivityHeatmap';
import { WeeklyBarChart } from '../components/charts/WeeklyBarChart';
import { DifficultyBreakdown } from '../components/charts/DifficultyBreakdown';
import { SkillRadar } from '../components/charts/SkillRadar';
import { Card } from '../components/ui/Card';

export const Analytics: React.FC = () => {
  const { user } = useUser();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // [BACKEND INTEGRATION POINT] GET /api/v1/analytics/overview
    const fetchAnalytics = async () => {
      try {
        const res = await analyticsService.getAnalyticsData();
        if (res.success) {
          setData(res.data);
        }
      } catch (err) {
        console.error('Failed to load analytics:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (isLoading || !data || !user) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <BarChart3 className="w-4 h-4" />
            Performance & Insights
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Progress Analytics & Mastery
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-2xl">
            Track your algorithmic growth, consistency heatmaps, submission trends, and topic proficiency over time.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-xl text-xs font-mono text-slate-300">
          <Calendar className="w-4 h-4 text-purple-400" />
          <span>Last updated: Today</span>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Solved"
          value={user.totalSolved}
          subtitle="142 of 345 catalog problems"
          icon={<Code2 className="w-6 h-6 text-purple-400" />}
          accentColor="purple"
          trend={{ value: '82.1% accuracy', isPositive: true }}
        />
        <StatCard
          title="Active Streak"
          value={`${user.streakDays} Days`}
          subtitle="Longest: 24 consecutive days"
          icon={<Flame className="w-6 h-6 text-amber-500 fill-amber-500" />}
          accentColor="amber"
          trend={{ value: '18d ongoing', isPositive: true }}
        />
        <StatCard
          title="Total XP Earned"
          value={user.currentXp.toLocaleString()}
          subtitle="Level 14 Algorithm Architect"
          icon={<Sparkles className="w-6 h-6 text-cyan-400" />}
          accentColor="cyan"
          trend={{ value: '+1,250 this week', isPositive: true }}
        />
        <StatCard
          title="Global League"
          value={`#${user.rank}`}
          subtitle="Diamond League Division 2"
          icon={<TrendingUp className="w-6 h-6 text-emerald-400" />}
          accentColor="emerald"
          trend={{ value: 'Top 5%', isPositive: true }}
        />
      </div>

      {/* Contribution Calendar Heatmap Card */}
      <Card className="p-6">
        <ActivityHeatmap data={data.heatmapData} />
      </Card>

      {/* Middle Grid: Weekly Activity & Difficulty Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <WeeklyBarChart data={data.weeklyActivity} />
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

      {/* Topic-Wise Skill Mastery */}
      <Card className="p-6">
        <SkillRadar data={data.topicProficiency} />
      </Card>

      {/* Monthly Submissions Progress Chart */}
      <Card className="p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
          <div>
            <h4 className="text-sm font-bold text-slate-200">6-Month Submission Velocity</h4>
            <p className="text-xs text-slate-400">Total submission volume and acceptance rate growth</p>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
            Acceptance Rate: 82.1%
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {data.monthlySubmissions.map((m) => (
            <div
              key={m.month}
              className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-center space-y-1"
            >
              <span className="text-xs font-bold text-slate-400 uppercase">{m.month}</span>
              <p className="text-lg font-bold font-mono text-purple-300">{m.submissions}</p>
              <span className="text-[10px] text-slate-500 block">{m.acceptanceRate}% acc</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
