import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ProfileEditor } from './ProfileEditor';
import { EducationEditor } from './EducationEditor';
import { SkillsEditor } from './SkillsEditor';
import { ProjectsEditor } from './ProjectsEditor';
import { CertificationsEditor } from './CertificationsEditor';
import { ActivitiesEditor } from './ActivitiesEditor';
import { ContactMessagesViewer } from './ContactMessagesViewer';
import { SupabaseSetupGuide } from './SupabaseSetupGuide';
import { 
  LayoutDashboard, 
  User, 
  GraduationCap, 
  Code2, 
  Briefcase, 
  Award, 
  Activity, 
  Mail, 
  Database, 
  LogOut, 
  ArrowLeft,
  Sparkles
} from 'lucide-react';

interface AdminDashboardProps {
  onBackToPortfolio: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToPortfolio }) => {
  const { 
    logoutAdmin, 
    userEmail, 
    projects, 
    skills, 
    certifications, 
    activities, 
    messages 
  } = useData();

  const [activeTab, setActiveTab] = useState<string>('overview');

  const unreadCount = messages.filter(m => !m.is_read).length;

  const tabs = [
    { id: 'overview', label: 'Dashboard Stats', icon: LayoutDashboard },
    { id: 'profile', label: 'Profile & Resume', icon: User },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Code2 },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'activities', label: 'Activities', icon: Activity },
    { id: 'messages', label: 'Messages', icon: Mail, badge: unreadCount },
    { id: 'supabase', label: 'Supabase & RLS', icon: Database },
  ];

  return (
    <div className="pt-20 lg:pt-0 pb-16">
      
      {/* Header Bar */}
      <div className="kan3an-card rounded-[28px] p-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-200 shadow-kan3an-card">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToPortfolio}
            className="p-2.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 hover:bg-indigo-100 transition-all"
            title="Return to Public Portfolio"
          >
            <ArrowLeft className="w-5 h-5 text-indigo-600" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              Admin Developer Portal
              <Sparkles className="w-4 h-4 text-indigo-600" />
            </h2>
            <p className="text-xs text-slate-600 font-mono font-medium">
              Authenticated as: <span className="text-indigo-600 font-bold">{userEmail || 'admin@sanjhi.dev'}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBackToPortfolio}
            className="px-4 py-2 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 hover:text-slate-900 text-xs font-bold transition-all"
          >
            View Live Site
          </button>
          <button
            onClick={logoutAdmin}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 text-xs font-bold transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Nav */}
        <div className="lg:col-span-1">
          <div className="kan3an-card rounded-[28px] p-3 space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white font-extrabold shadow-kan3an-pill'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-indigo-50'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </span>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white font-bold text-[10px]">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Active View */}
        <div className="lg:col-span-3">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                
                <div className="kan3an-card rounded-[24px] p-5">
                  <p className="text-xs font-mono font-bold text-slate-600 mb-1">Total Projects</p>
                  <p className="text-3xl font-extrabold text-slate-900">{projects.length}</p>
                  <span className="text-[11px] text-indigo-600 mt-2 block font-bold">Dynamic Supabase Data</span>
                </div>

                <div className="kan3an-card rounded-[24px] p-5">
                  <p className="text-xs font-mono font-bold text-slate-600 mb-1">Total Skills</p>
                  <p className="text-3xl font-extrabold text-slate-900">{skills.length}</p>
                  <span className="text-[11px] text-indigo-600 mt-2 block font-bold">6 Categories</span>
                </div>

                <div className="kan3an-card rounded-[24px] p-5">
                  <p className="text-xs font-mono font-bold text-slate-600 mb-1">Certifications</p>
                  <p className="text-3xl font-extrabold text-slate-900">{certifications.length}</p>
                  <span className="text-[11px] text-emerald-600 mt-2 block font-bold">Verified Credentials</span>
                </div>

                <div className="kan3an-card rounded-[24px] p-5">
                  <p className="text-xs font-mono font-bold text-slate-600 mb-1">Hackathons & Events</p>
                  <p className="text-3xl font-extrabold text-slate-900">{activities.length}</p>
                  <span className="text-[11px] text-amber-600 mt-2 block font-bold">Active Records</span>
                </div>

                <div className="kan3an-card rounded-[24px] p-5">
                  <p className="text-xs font-mono font-bold text-slate-600 mb-1">Unread Messages</p>
                  <p className="text-3xl font-extrabold text-indigo-600">{unreadCount}</p>
                  <span className="text-[11px] text-slate-600 mt-2 block font-semibold">Total: {messages.length}</span>
                </div>

              </div>

              <div className="kan3an-card rounded-[28px] p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Admin Developer Portal Overview</h3>
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-4 font-medium">
                  Manage your personal portfolio content dynamically. Any changes submitted through the CRUD tabs immediately update the public portfolio website and persist in Supabase.
                </p>
                <div className="flex flex-wrap gap-2.5">
                  <button
                    onClick={() => setActiveTab('projects')}
                    className="kan3an-pill-btn text-xs py-2 px-4 shadow-sm"
                  >
                    Manage Projects
                  </button>
                  <button
                    onClick={() => setActiveTab('skills')}
                    className="px-4 py-2 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold hover:bg-indigo-100 transition-all"
                  >
                    Manage Skills
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && <ProfileEditor />}
          {activeTab === 'education' && <EducationEditor />}
          {activeTab === 'skills' && <SkillsEditor />}
          {activeTab === 'projects' && <ProjectsEditor />}
          {activeTab === 'certifications' && <CertificationsEditor />}
          {activeTab === 'activities' && <ActivitiesEditor />}
          {activeTab === 'messages' && <ContactMessagesViewer />}
          {activeTab === 'supabase' && <SupabaseSetupGuide />}
        </div>

      </div>

    </div>
  );
};
