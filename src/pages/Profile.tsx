import React, { useState } from 'react';
import {
  Calendar,
  Flame,
  Sparkles,
  Edit3,
  Check,
  Shield,
  Target,
  Globe,
  Code2,
  Share2,
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const Profile: React.FC = () => {
  const { user, updateProfileBio } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(user?.bio || '');
  const [githubUrl, setGithubUrl] = useState(user?.githubUrl || '');
  const [linkedinUrl, setLinkedinUrl] = useState(user?.linkedinUrl || '');

  if (!user) return null;

  const handleSave = async () => {
    await updateProfileBio(bio, githubUrl, linkedinUrl);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in max-w-5xl mx-auto">
      {/* Profile Header Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover ring-4 ring-purple-500/40 shadow-xl"
              />
              <span className="absolute -bottom-1 -right-1 bg-purple-600 text-xs font-bold text-white px-2 py-0.5 rounded-full border-2 border-slate-900">
                L{user.level}
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl md:text-2xl font-black text-white">{user.name}</h1>
                <Badge variant="purple">{user.title}</Badge>
                <Badge variant="cyan">{user.tier}</Badge>
              </div>

              <p className="text-xs text-slate-400 font-mono">@{user.username} · {user.email}</p>

              <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-purple-400" />
                  Joined {user.joinedDate}
                </span>
                <span className="flex items-center gap-1 text-amber-400 font-bold">
                  <Flame className="w-3.5 h-3.5 fill-amber-500" />
                  {user.streakDays}-Day Streak
                </span>
              </div>
            </div>
          </div>

          <Button
            variant={isEditing ? 'emerald' : 'outline'}
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            leftIcon={isEditing ? <Check className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
          >
            {isEditing ? 'Save Profile' : 'Edit Profile'}
          </Button>
        </div>

        {/* Bio Section */}
        <div className="mt-6 pt-6 border-t border-slate-800/80">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Developer Bio & Focus
          </h3>
          {isEditing ? (
            <div className="space-y-3">
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                placeholder="Write a short summary about your coding journey..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="GitHub URL"
                  className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                />
                <input
                  type="text"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="LinkedIn URL"
                  className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          ) : (
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-3xl">
              {user.bio}
            </p>
          )}
        </div>
      </div>

      {/* Grid of Profile Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Connected Developer Accounts */}
        <div className="space-y-6">
          <Card className="p-5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-purple-400" />
              Connected Profiles
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center gap-2.5">
                  <Code2 className="w-4 h-4 text-purple-400" />
                  <span className="text-xs text-slate-200 font-medium">GitHub ({user.username})</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold">Connected</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs text-slate-200 font-medium">LinkedIn</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold">Connected</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center gap-2.5">
                  <Share2 className="w-4 h-4 text-amber-400" />
                  <span className="text-xs text-slate-200 font-medium">LeetCode Synced</span>
                </div>
                <span className="text-[10px] text-purple-300 font-bold">Active</span>
              </div>
            </div>
          </Card>

          {/* Quick Stats Card */}
          <Card className="p-5 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Summary Metrics
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Total XP</span>
                <span className="font-mono font-bold text-purple-300">
                  {user.currentXp.toLocaleString()} XP
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Problems Solved</span>
                <span className="font-mono font-bold text-white">{user.totalSolved}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Current Streak</span>
                <span className="font-mono font-bold text-amber-400">{user.streakDays} Days</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Global Rank</span>
                <span className="font-mono font-bold text-emerald-400">#{user.rank}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Daily Targets & Architecture Notice */}
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Target className="w-4 h-4 text-purple-400" />
                  Daily Coding Targets
                </h3>
                <p className="text-xs text-slate-400">Configured goals to maintain streak multiplier</p>
              </div>
            </div>

            <div className="space-y-3">
              {user.dailyGoals.map((goal) => (
                <div
                  key={goal.id}
                  className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between"
                >
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">{goal.title}</h4>
                    <p className="text-[11px] text-slate-400 font-mono">
                      Target: {goal.target} {goal.unit} · Progress: {goal.current} / {goal.target}
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-purple-300">
                    +{goal.xpReward} XP
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Platform Architecture Notice */}
          <Card className="p-6 space-y-3 bg-gradient-to-r from-slate-900 to-purple-950/20 border-purple-500/20">
            <h3 className="text-sm font-bold text-white">Full-Stack Architecture Ready</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              This frontend application is decoupled via the centralized API service layer in{' '}
              <code className="text-purple-300 bg-slate-950 px-1 py-0.5 rounded">src/services/</code>.
              When connecting your backend server (Node.js, Go, or Python FastAPI), update the base endpoint
              in <code className="text-purple-300 bg-slate-950 px-1 py-0.5 rounded">apiClient.ts</code> to bind authentication tokens, remote code runners, and LLM endpoints.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};
