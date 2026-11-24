import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Code2, Lock, Mail } from 'lucide-react';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await login(email, password);
      navigate('/', { replace: true });
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1020] px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#151b2e] p-8 shadow-2xl">

        <div className="flex flex-col items-center mb-8">
          <div className="rounded-xl bg-violet-600 p-3 mb-4">
            <Code2 size={32} className="text-white" />
          </div>

          <h1 className="text-3xl font-bold text-white">
            CodeQuest
          </h1>

          <p className="text-gray-400 mt-2 text-center">
            Level up your coding skills
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-sm text-gray-300 mb-2 block">
              Email
            </label>

            <div className="flex items-center rounded-lg border border-white/10 bg-[#0b1020] px-3">
              <Mail size={18} className="text-gray-400" />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full bg-transparent p-3 text-white outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-300 mb-2 block">
              Password
            </label>

            <div className="flex items-center rounded-lg border border-white/10 bg-[#0b1020] px-3">
              <Lock size={18} className="text-gray-400" />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full bg-transparent p-3 text-white outline-none"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-violet-600 py-3 font-semibold text-white transition hover:bg-violet-500 disabled:opacity-50"
          >
            {submitting ? 'Logging in...' : 'Login to CodeQuest'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-500">
          Demo access only · Authorized accounts
        </p>
      </div>
    </div>
  );
};