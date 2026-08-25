import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { 
  Menu, 
  X, 
  Lock, 
  Mail,
  LayoutDashboard,
  User,
  GraduationCap,
  Code2,
  Briefcase,
  Award,
  Activity
} from 'lucide-react';

interface HeaderNavProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isAdminView: boolean;
  setIsAdminView: (val: boolean) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  activeSection,
  setActiveSection,
  isAdminView,
  setIsAdminView
}) => {
  const { profile } = useData();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
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
    setMobileOpen(false);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* DESKTOP FIXED VIBRANT PURPLE LEFT SIDEBAR (Matching Kan3an .Dev Reference) */}
      <aside className="hidden lg:flex flex-col justify-between w-64 fixed top-0 bottom-0 left-0 z-40 kan3an-sidebar-bg p-6 text-white overflow-y-auto">
        
        <div className="space-y-8">
          {/* Top Brand Logo matching Kan3an .Dev */}
          <button
            onClick={() => handleNavClick('overview')}
            className="flex items-center gap-3 text-left w-full group"
          >
            <div className="w-10 h-10 rounded-2xl bg-white text-indigo-700 font-black flex items-center justify-center text-lg shadow-md group-hover:scale-105 transition-transform">
              SG
            </div>
            <div>
              <span className="font-extrabold text-white text-base tracking-tight block">
                Sanjhi <span className="text-indigo-200">.Dev</span>
              </span>
              <span className="text-[11px] text-indigo-100 font-mono block">CSE Undergraduate</span>
            </div>
          </button>

          {/* Navigation Links with Active White Pill Card */}
          <nav className="space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = !isAdminView && activeSection === link.id;

              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-white text-indigo-700 font-extrabold shadow-kan3an-active-nav scale-[1.02]'
                      : 'text-white hover:bg-white/15'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-700' : 'text-white'}`} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile User Card matching Kan3an .Dev */}
        <div className="pt-6 border-t border-white/20 space-y-4">
          
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 border border-white/40 text-white font-bold flex items-center justify-center text-xs">
                SG
              </div>
              <div className="text-left">
                <p className="font-bold text-white text-xs leading-tight">{profile.name || 'Sanjhi Gupta'}</p>
                <p className="text-[11px] text-indigo-100 font-semibold leading-tight">Full Stack Developer</p>
              </div>
            </div>

            <button
              onClick={() => setIsAdminView(true)}
              className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors"
              title="Admin Portal"
            >
              <Lock className="w-4 h-4" />
            </button>
          </div>

        </div>

      </aside>

      {/* MOBILE FLOATING HEADER */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 p-4">
        <div className="kan3an-sidebar-bg rounded-2xl py-3 px-4 flex items-center justify-between text-white shadow-xl">
          
          <button
            onClick={() => handleNavClick('overview')}
            className="flex items-center gap-2.5"
          >
            <div className="w-9 h-9 rounded-xl bg-white text-indigo-700 font-extrabold flex items-center justify-center text-xs">
              SG
            </div>
            <span className="font-extrabold text-white text-sm">Sanjhi .Dev</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAdminView(true)}
              className="p-2 rounded-xl bg-white/20 text-white"
              title="Admin Portal"
            >
              <Lock className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl bg-white/20 text-white"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Slide Menu */}
        {mobileOpen && (
          <div className="mt-2 p-3 rounded-2xl bg-white border border-slate-200 shadow-2xl space-y-1 animate-in fade-in duration-200">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = !isAdminView && activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </header>
    </>
  );
};
