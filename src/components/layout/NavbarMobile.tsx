import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Sparkles, 
  LayoutDashboard, 
  User, 
  GraduationCap, 
  Code2, 
  Briefcase, 
  Award, 
  Activity, 
  Mail, 
  Lock 
} from 'lucide-react';
import { useData } from '../../context/DataContext';

interface NavbarMobileProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isAdminView: boolean;
  setIsAdminView: (val: boolean) => void;
}

export const NavbarMobile: React.FC<NavbarMobileProps> = ({
  activeSection,
  setActiveSection,
  isAdminView,
  setIsAdminView
}) => {
  const { profile } = useData();
  const [isOpen, setIsOpen] = useState(false);

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
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 z-50 p-4">
      <div className="glass-panel rounded-2xl px-4 py-3 flex items-center justify-between border border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-purple to-brand-cyan flex items-center justify-center font-bold text-white text-xs">
            SG
          </div>
          <div>
            <h2 className="font-bold text-white text-sm flex items-center gap-1">
              {profile.name || 'Sanjhi Gupta'}
              <Sparkles className="w-3 h-3 text-brand-purple" />
            </h2>
            <p className="text-[10px] text-slate-400 font-mono">CSE Undergraduate</p>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-200 hover:text-white"
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Slide-Down Mobile Drawer */}
      {isOpen && (
        <div className="mt-2 glass-panel rounded-2xl p-4 border border-white/10 shadow-2xl animate-in slide-in-from-top duration-200">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = !isAdminView && activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-brand-purple/30 text-white border border-brand-purple/40 font-semibold'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-purple' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <div className="pt-2 border-t border-white/10 mt-2">
              <button
                onClick={() => {
                  setIsAdminView(true);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold ${
                  isAdminView
                    ? 'bg-brand-purple text-white'
                    : 'bg-white/5 text-slate-300 hover:bg-brand-purple/20'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-brand-purple" />
                  Admin Portal
                </span>
                <span className="font-mono text-[10px] opacity-70">/admin</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
