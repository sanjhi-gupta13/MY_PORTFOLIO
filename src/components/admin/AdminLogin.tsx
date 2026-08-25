import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Lock, Mail, KeyRound, ArrowLeft, Database } from 'lucide-react';
import { isSupabaseConfigured } from '../../lib/supabase';

interface AdminLoginProps {
  onBackToPortfolio: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onBackToPortfolio }) => {
  const { loginAdmin, addToast } = useData();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      addToast('Input Required', 'Please enter email and password.', 'warning');
      return;
    }

    setIsSubmitting(true);
    const res = await loginAdmin(email, password);
    setIsSubmitting(false);

    if (res.success) {
      addToast('Authenticated', 'Welcome to Admin Developer Portal.', 'success');
    } else {
      addToast('Login Error', res.error || 'Invalid credentials.', 'error');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="kan3an-card w-full max-w-md rounded-[32px] p-8 border border-slate-200 shadow-kan3an-card relative overflow-hidden">
        
        {/* Back Button */}
        <button
          onClick={onBackToPortfolio}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-700 hover:text-slate-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4 text-indigo-600" />
          <span>Back to Portfolio</span>
        </button>

        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto mb-4 text-indigo-600 shadow-sm">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Admin Authentication
          </h2>
          <p className="text-xs text-slate-600 font-medium mt-1">
            Protected Developer Management Portal
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase text-slate-900 font-bold mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl glass-input text-sm font-semibold"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-900 font-bold mb-1.5">
              Password
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl glass-input text-sm font-semibold"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="kan3an-pill-btn w-full justify-center text-sm py-3.5 shadow-kan3an-pill disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Authenticating...
              </span>
            ) : (
              <span>Sign In to Admin Portal</span>
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-200 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-[11px] font-mono text-indigo-700 font-bold">
            <Database className="w-3.5 h-3.5 text-indigo-600" />
            <span>
              {isSupabaseConfigured ? 'Supabase Database Connected' : 'Supabase Client Ready (Demo Mode)'}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
