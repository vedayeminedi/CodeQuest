import React, { useState, useEffect } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  Lock,
  Play,
  Sparkles,
  Clock,
  BookOpen,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Code2,
} from 'lucide-react';
import { LearningPath, Lesson } from '../types';
import { learningPathService } from '../services/learningPathService';
import { useUser } from '../context/UserContext';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';

export const LearningPathDetail: React.FC = () => {
  const { pathId } = useParams<{ pathId: string }>();
  const navigate = useNavigate();
  const { addXP } = useUser();
  const [path, setPath] = useState<LearningPath | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // [BACKEND INTEGRATION POINT] GET /api/v1/learning-paths/{id}
    const fetchPath = async () => {
      try {
        const res = await learningPathService.getLearningPathById(pathId || 'path-dsa');
        if (res.success && res.data) {
          setPath(res.data);
          // Expand all modules by default
          const initialExpanded: Record<string, boolean> = {};
          res.data.modules.forEach((m) => {
            initialExpanded[m.id] = true;
          });
          setExpandedModules(initialExpanded);
        }
      } catch (err) {
        console.error('Error fetching path:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPath();
  }, [pathId]);

  const toggleModule = (modId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [modId]: !prev[modId],
    }));
  };

  const handleCompleteLesson = async () => {
    if (!path || !selectedLesson) return;
    const res = await learningPathService.updateLessonStatus(
      path.id,
      selectedLesson.id,
      'completed'
    );
    if (res.success) {
      await addXP(selectedLesson.xpReward, `Completed lesson: ${selectedLesson.title}`);
      setSelectedLesson((prev) => (prev ? { ...prev, status: 'completed' } : null));

      // Refresh path local state
      setPath({
        ...path,
        completedLessons: path.completedLessons + 1,
        modules: path.modules.map((m) => ({
          ...m,
          lessons: m.lessons.map((l) =>
            l.id === selectedLesson.id ? { ...l, status: 'completed' } : l
          ),
        })),
      });
    }
  };

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!path) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-slate-300">Learning path not found.</p>
        <NavLink to="/learning-paths" className="text-purple-400 hover:underline">
          Return to All Paths
        </NavLink>
      </div>
    );
  }

  const progressPercent = Math.round((path.completedLessons / path.totalLessons) * 100);

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in max-w-5xl mx-auto">
      {/* Back Link */}
      <NavLink
        to="/learning-paths"
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Learning Paths
      </NavLink>

      {/* Path Header Hero */}
      <div className={`p-6 md:p-8 rounded-3xl bg-gradient-to-br ${path.bannerGradient} border border-slate-700/80 shadow-2xl relative overflow-hidden`}>
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge difficulty={path.difficulty} />
            <Badge variant="cyan">{path.category}</Badge>
            <span className="flex items-center gap-1 text-xs font-mono font-bold text-purple-300 bg-purple-500/20 px-2.5 py-1 rounded-full border border-purple-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              +{path.xpReward} XP Track
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            {path.title}
          </h1>

          <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
            {path.description}
          </p>

          {/* Stats Bar & Overall Progress */}
          <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <span className="text-xs text-slate-400">Total Curriculum</span>
              <p className="text-sm font-bold text-white mt-0.5">
                {path.totalModules} Modules · {path.totalLessons} Lessons
              </p>
            </div>
            <div>
              <span className="text-xs text-slate-400">Estimated Duration</span>
              <p className="text-sm font-bold text-white mt-0.5">{path.estimatedHours} Hours of Hands-on Coding</p>
            </div>
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-slate-400">Roadmap Progress</span>
                <span className="font-mono text-purple-300 font-bold">{progressPercent}%</span>
              </div>
              <ProgressBar value={path.completedLessons} max={path.totalLessons} size="sm" variant="gradient" />
            </div>
          </div>
        </div>
      </div>

      {/* Roadmap Modules Tree */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-purple-400" />
          Interactive Learning Roadmap
        </h2>

        <div className="space-y-4">
          {path.modules.map((module, modIdx) => {
            const isExpanded = expandedModules[module.id] ?? true;
            const completedCount = module.lessons.filter((l) => l.status === 'completed').length;

            return (
              <div
                key={module.id}
                className="bg-slate-900/80 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl"
              >
                {/* Module Header Bar */}
                <button
                  onClick={() => toggleModule(module.id)}
                  className="w-full p-4 md:p-5 flex items-center justify-between text-left hover:bg-slate-800/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center justify-center font-mono font-bold text-xs">
                      {modIdx + 1}
                    </span>
                    <div>
                      <h3 className="text-sm md:text-base font-bold text-white">
                        {module.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">{module.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                      {completedCount} / {module.lessons.length} Completed
                    </span>
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </button>

                {/* Lessons Sequential Steps */}
                {isExpanded && (
                  <div className="p-4 md:p-5 pt-0 border-t border-slate-800/60 divide-y divide-slate-800/40 space-y-2">
                    {module.lessons.map((lesson, lesIdx) => {
                      const isLocked = lesson.status === 'locked';
                      const isCompleted = lesson.status === 'completed';
                      const isInProgress = lesson.status === 'in_progress';

                      return (
                        <div
                          key={lesson.id}
                          onClick={() => setSelectedLesson(lesson)}
                          className={`pt-2 flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${
                            isLocked
                              ? 'opacity-60 bg-slate-950/40 cursor-not-allowed'
                              : isInProgress
                              ? 'bg-purple-950/20 border border-purple-500/40 hover:bg-purple-950/40'
                              : 'hover:bg-slate-800/60'
                          }`}
                        >
                          <div className="flex items-center gap-3.5">
                            {/* Step Indicator Node */}
                            <div className="relative">
                              {isCompleted ? (
                                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
                                  <CheckCircle2 className="w-4 h-4" />
                                </div>
                              ) : isInProgress ? (
                                <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-600/50 animate-pulse">
                                  <Play className="w-3.5 h-3.5 fill-white" />
                                </div>
                              ) : (
                                <div className="w-8 h-8 rounded-full bg-slate-800 text-slate-500 border border-slate-700 flex items-center justify-center">
                                  <Lock className="w-3.5 h-3.5" />
                                </div>
                              )}
                            </div>

                            {/* Lesson Title & Info */}
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs md:text-sm font-semibold text-slate-200">
                                  {lesIdx + 1}. {lesson.title}
                                </span>
                                {lesson.type === 'challenge' && (
                                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                                    Hands-on Challenge
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                                {lesson.description}
                              </p>
                            </div>
                          </div>

                          {/* Right duration & XP */}
                          <div className="flex items-center gap-3 shrink-0 text-xs">
                            <span className="text-slate-400 flex items-center gap-1 font-mono">
                              <Clock className="w-3 h-3" />
                              {lesson.durationMinutes}m
                            </span>
                            <span className="font-mono text-purple-300 font-bold">
                              +{lesson.xpReward} XP
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Lesson Details Modal */}
      {selectedLesson && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedLesson(null)}
          title={selectedLesson.title}
          description={`Lesson Duration: ${selectedLesson.durationMinutes} mins · Reward: +${selectedLesson.xpReward} XP`}
        >
          <div className="space-y-4">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
              {selectedLesson.description}
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                <span className="text-slate-500 font-bold block mb-1">Lesson Type</span>
                <span className="capitalize font-semibold text-purple-300">
                  {selectedLesson.type}
                </span>
              </div>
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                <span className="text-slate-500 font-bold block mb-1">Status</span>
                <span
                  className={`capitalize font-semibold ${
                    selectedLesson.status === 'completed'
                      ? 'text-emerald-400'
                      : selectedLesson.status === 'in_progress'
                      ? 'text-purple-300'
                      : 'text-slate-400'
                  }`}
                >
                  {selectedLesson.status.replace('_', ' ')}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-800">
              {selectedLesson.associatedChallengeId ? (
                <Button
                  variant="primary"
                  onClick={() => {
                    navigate(`/workspace/${selectedLesson.associatedChallengeId}`);
                  }}
                  leftIcon={<Code2 className="w-4 h-4" />}
                >
                  Open in Coding Workspace
                </Button>
              ) : selectedLesson.status !== 'completed' ? (
                <Button
                  variant="emerald"
                  onClick={handleCompleteLesson}
                  leftIcon={<CheckCircle2 className="w-4 h-4" />}
                >
                  Mark as Completed (+{selectedLesson.xpReward} XP)
                </Button>
              ) : (
                <Button variant="secondary" onClick={() => setSelectedLesson(null)}>
                  Close
                </Button>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
