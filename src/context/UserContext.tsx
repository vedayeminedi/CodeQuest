import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserProfile } from '../types';
import { userService } from '../services/userService';
import { useToast } from './ToastContext';
import confetti from 'canvas-confetti';

interface UserContextType {
  user: UserProfile | null;
  loading: boolean;
  addXP: (amount: number, reason?: string) => Promise<void>;
  toggleDailyGoal: (goalId: string) => Promise<void>;
  solveChallenge: (challengeId: string, xpReward: number, title?: string) => Promise<void>;
  updateProfileBio: (bio: string, githubUrl?: string, linkedinUrl?: string) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { showXPToast, addToast } = useToast();

  const fetchUser = useCallback(async () => {
    try {
      const response = await userService.getUserProfile();
      if (response.success) {
        setUser(response.data);
      }
    } catch (error) {
      console.error('Failed to load user profile:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const addXP = useCallback(
    async (amount: number, reason?: string) => {
      if (!user) return;
      const prevLevel = user.level;
      const res = await userService.addXP(amount);

      if (res.success) {
        setUser((prev) => (prev ? { ...prev, currentXp: res.data.currentXp, level: res.data.level } : null));
        showXPToast(amount, reason);

        if (res.data.leveledUp && res.data.level > prevLevel) {
          // Trigger celebratory confetti for level up!
          try {
            confetti({
              particleCount: 120,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#a855f7', '#38bdf8', '#34d399', '#f43f5e'],
            });
          } catch (e) {
            // safely ignore if canvas-confetti is not loaded
          }

          addToast({
            type: 'success',
            title: `🎉 Level Up! You are now Level ${res.data.level}!`,
            message: 'New ranking unlocked and titles available.',
            duration: 6000,
          });
        }
      }
    },
    [user, showXPToast, addToast]
  );

  const toggleDailyGoal = useCallback(
    async (goalId: string) => {
      const res = await userService.toggleGoal(goalId);
      if (res.success && res.data) {
        setUser((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            dailyGoals: prev.dailyGoals.map((g) => (g.id === goalId ? res.data! : g)),
          };
        });

        if (res.data.completed) {
          showXPToast(res.data.xpReward, `Completed goal: ${res.data.title}`);
        }
      }
    },
    [showXPToast]
  );

  const solveChallenge = useCallback(
    async (challengeId: string, xpReward: number, title?: string) => {
      if (!user) return;
      // Trigger confetti
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#a855f7', '#06b6d4', '#10b981'],
        });
      } catch (e) {}

      await addXP(xpReward, `Solved: ${title || 'Coding Challenge'}`);

      setUser((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          totalSolved: prev.totalSolved + 1,
          solvedByDifficulty: {
            ...prev.solvedByDifficulty,
            medium: prev.solvedByDifficulty.medium + 1, // increment
          },
          recentActivities: [
            {
              id: `act_${Date.now()}`,
              type: 'challenge_solved',
              title: `Solved "${title || 'Algorithmic Problem'}"`,
              description: 'Passed all test cases with optimal time and space complexity.',
              timestamp: 'Just now',
              xpEarned: xpReward,
            },
            ...prev.recentActivities.slice(0, 4),
          ],
        };
      });
    },
    [user, addXP]
  );

  const updateProfileBio = useCallback(
    async (bio: string, githubUrl?: string, linkedinUrl?: string) => {
      const res = await userService.updateProfile({ bio, githubUrl, linkedinUrl });
      if (res.success) {
        setUser(res.data);
        addToast({
          type: 'success',
          title: 'Profile Updated',
          message: 'Your developer bio and links have been saved.',
        });
      }
    },
    [addToast]
  );

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        addXP,
        toggleDailyGoal,
        solveChallenge,
        updateProfileBio,
        refreshUser: fetchUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
