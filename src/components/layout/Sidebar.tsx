import React from 'react';
import { 
  LayoutDashboard, 
  User, 
  GraduationCap, 
  Code2, 
  Briefcase, 
  Award, 
  Activity, 
  Mail, 
  Lock,
  Sparkles,
  Github,
  Linkedin
} from 'lucide-react';
import { useData } from '../../context/DataContext';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isAdminView: boolean;
  setIsAdminView: (val: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  setActiveSection,
  isAdminView,
  setIsAdminView
}) => {
  const { profile } = useData();

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'about', label: 'About', icon: User },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Code2 },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'activities', label: 'Activities', icon: Activity },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const handleNavClick = (id: string) => {
    setIsAdminView(false);
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside className="hidden lg:flex flex-col fixed top-0 left-0 h-screen w-72 p-5 z-40">
      <div className="glass-panel rounded-3xl h-full flex flex-col justify-between p-5 border border-white/10 relative overflow-hidden">
        
        {/* Top Logo & Title */}
        <div>
          <div className="flex items-center gap-3 px-2 py-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-purple to-brand-cyan flex items-center justify-center shadow-glow-purple">
              <span className="font-bold text-white text-lg">SG</span>
            </div>
            <div>
              <h1 className="font-bold text-slate-100 text-lg tracking-tight flex items-center gap-1.5">
                {profile.name || 'Sanjhi Gupta'}
                <Sparkles className="w-4 h-4 text-brand-purple animate-pulse" />
              </h1>
              <p className="text-xs text-slate-400 font-mono">CSE Undergraduate</p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = !isAdminView && activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-brand-purple/30 to-brand-indigo/20 text-white border border-brand-purple/40 shadow-glass-purple font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-purple' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile Footer & Admin Link */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          <button
            onClick={() => setIsAdminView(true)}
            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              isAdminView
                ? 'bg-brand-purple text-white shadow-glow-purple'
                : 'bg-white/5 text-slate-300 hover:bg-brand-purple/20 hover:text-brand-purple border border-white/10'
            }`}
          >
            <span className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5" />
              Admin Portal
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/40 font-mono">/admin</span>
          </button>

          <div className="flex items-center justify-between px-2 pt-1">
            <div className="flex items-center gap-2">
              <a
                href={profile.github_url || 'https://github.com/sanjhi-gupta13'}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-white/5 hover:bg-brand-purple/20 hover:text-brand-purple text-slate-400 transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={profile.linkedin_url || 'https://linkedin.com/in/sanjhi-gupta-907b57382'}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-white/5 hover:bg-brand-purple/20 hover:text-brand-purple text-slate-400 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
            
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              Available
            </span>
          </div>
        </div>

      </div>
    </aside>
  );
};
