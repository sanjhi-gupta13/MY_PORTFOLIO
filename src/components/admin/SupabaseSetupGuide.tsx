import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { isSupabaseConfigured } from '../../lib/supabase';
import { Database, CheckCircle2, Copy, AlertTriangle, Key, Terminal, ExternalLink } from 'lucide-react';

export const SupabaseSetupGuide: React.FC = () => {
  const { addToast } = useData();
  const [copied, setCopied] = useState(false);

  const sqlSnippet = `-- SANJHI GUPTA PORTFOLIO SCHEMA
-- Run this in your Supabase SQL Editor to create all 7 tables, RLS policies, and seed data.

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL, title TEXT NOT NULL, bio TEXT NOT NULL,
  email TEXT NOT NULL, phone TEXT, location TEXT, github_url TEXT,
  linkedin_url TEXT, resume_url TEXT, is_available BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS public.education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  degree TEXT NOT NULL, institution TEXT NOT NULL, duration TEXT NOT NULL,
  cgpa_percentage TEXT NOT NULL, details TEXT, display_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL, category TEXT NOT NULL, level INT DEFAULT 85, display_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL, subtitle TEXT, description TEXT NOT NULL,
  bullet_points JSONB DEFAULT '[]'::jsonb, technologies JSONB DEFAULT '[]'::jsonb,
  image_url TEXT, github_url TEXT, demo_url TEXT, featured BOOLEAN DEFAULT true, display_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL, issuer TEXT NOT NULL, issue_date TEXT, credential_url TEXT, display_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL, role TEXT NOT NULL, organizer TEXT, details TEXT, date_period TEXT, display_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL, email TEXT NOT NULL, subject TEXT, message TEXT NOT NULL, is_read BOOLEAN DEFAULT false, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS & Public Read Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public Read Education" ON public.education FOR SELECT USING (true);
CREATE POLICY "Public Read Skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Public Read Projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public Read Certifications" ON public.certifications FOR SELECT USING (true);
CREATE POLICY "Public Read Activities" ON public.activities FOR SELECT USING (true);
CREATE POLICY "Public Insert Contact" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin Full Control" ON public.profiles FOR ALL USING (auth.role() = 'authenticated');
`;

  const copySql = () => {
    navigator.clipboard.writeText(sqlSnippet);
    setCopied(true);
    addToast('Copied to Clipboard', 'Paste into your Supabase SQL Editor.', 'success');
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Database className="w-5 h-5 text-brand-purple" />
          Supabase Database & Security Settings
        </h3>

        <div className="flex items-center gap-2">
          <span className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 ${
            isSupabaseConfigured
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
              : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
          }`}>
            <span className={`w-2 h-2 rounded-full ${isSupabaseConfigured ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
            {isSupabaseConfigured ? 'Connected to Live Supabase' : 'Local Fallback Mode Active'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4">
          <h4 className="font-bold text-white text-base flex items-center gap-2">
            <Key className="w-4 h-4 text-brand-cyan" />
            1. Environment Configuration
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Create or edit your local <code className="text-brand-purple font-mono">.env</code> file at the project root with your project credentials:
          </p>
          <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-slate-200 overflow-x-auto">
            <p className="text-slate-500"># .env</p>
            <p>VITE_SUPABASE_URL=https://your-project.supabase.co</p>
            <p>VITE_SUPABASE_ANON_KEY=your-anon-key-here</p>
          </div>
          <p className="text-[11px] text-slate-400">
            Never commit your secret keys to public version control.
          </p>
        </div>

        <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4">
          <h4 className="font-bold text-white text-base flex items-center gap-2">
            <Terminal className="w-4 h-4 text-brand-pink" />
            2. Storage Bucket Setup
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Go to Supabase Dashboard &rarr; <strong>Storage</strong> &rarr; Create a public bucket named:
          </p>
          <div className="p-3 rounded-xl bg-brand-purple/10 border border-brand-purple/30 text-brand-purple text-xs font-mono font-bold">
            portfolio-assets
          </div>
          <p className="text-[11px] text-slate-400">
            This enables live image uploads for profile pictures and project thumbnails.
          </p>
        </div>

      </div>

      <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-white text-base flex items-center gap-2">
            <Database className="w-4 h-4 text-brand-purple" />
            3. SQL Schema & RLS Execution Script
          </h4>
          <button
            onClick={copySql}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-brand-purple text-white text-xs font-semibold transition-all"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copied ? 'Copied!' : 'Copy SQL Script'}</span>
          </button>
        </div>

        <div className="p-4 rounded-xl bg-black/70 border border-white/10 font-mono text-xs text-slate-300 max-h-60 overflow-y-auto whitespace-pre-wrap">
          {sqlSnippet}
        </div>
      </div>
    </div>
  );
};
