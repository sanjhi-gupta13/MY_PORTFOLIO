import React, { useState, useEffect } from 'react';
import { DataProvider, useData } from './context/DataContext';
import { HeaderNav } from './components/layout/HeaderNav';
import { HeroSection } from './components/portfolio/HeroSection';
import { AboutSection } from './components/portfolio/AboutSection';
import { EducationSection } from './components/portfolio/EducationSection';
import { SkillsSection } from './components/portfolio/SkillsSection';
import { ProjectsSection } from './components/portfolio/ProjectsSection';
import { CertificationsSection } from './components/portfolio/CertificationsSection';
import { ActivitiesSection } from './components/portfolio/ActivitiesSection';
import { ContactSection } from './components/portfolio/ContactSection';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ToastContainer } from './components/ui/Toast';

const MainLayout: React.FC = () => {
  const { isAuthenticated, profile } = useData();
  const [activeSection, setActiveSection] = useState('overview');
  const [isAdminView, setIsAdminView] = useState(() => {
    return window.location.pathname === '/admin' || window.location.hash === '#admin';
  });

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin' || window.location.pathname === '/admin') {
        setIsAdminView(true);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col lg:flex-row relative selection:bg-indigo-600 selection:text-white">
      
      {/* Desktop Fixed Vibrant Purple Left Sidebar / Mobile Header */}
      <HeaderNav
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isAdminView={isAdminView}
        setIsAdminView={setIsAdminView}
      />

      {/* Main Scrollable Content Area (Enforced Light Background #f8fafc) */}
      <div className="flex-1 w-full lg:pl-64 relative z-10 bg-[#f8fafc] min-h-screen">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
          
          {isAdminView ? (
            isAuthenticated ? (
              <AdminDashboard onBackToPortfolio={() => setIsAdminView(false)} />
            ) : (
              <AdminLogin onBackToPortfolio={() => setIsAdminView(false)} />
            )
          ) : (
            <>
              <HeroSection />
              <AboutSection />
              <EducationSection />
              <SkillsSection />
              <ProjectsSection />
              <CertificationsSection />
              <ActivitiesSection />
              <ContactSection />

              {/* Footer */}
              <footer className="mt-16 pt-8 border-t border-slate-200 text-center text-xs text-slate-600 pb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 font-mono">{profile.name || 'Sanjhi Gupta'}</span>
                  <span>— Developer Portfolio & Management Portal</span>
                </div>

                <div className="flex items-center gap-4 font-mono text-[11px]">
                  <button
                    onClick={() => setIsAdminView(true)}
                    className="hover:text-indigo-600 transition-colors font-bold text-slate-700"
                  >
                    Admin Portal (/admin)
                  </button>
                  <span>•</span>
                  <a href="#overview" className="hover:text-slate-900 transition-colors font-bold text-slate-700">
                    Back to Top ↑
                  </a>
                </div>
              </footer>
            </>
          )}

        </main>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <DataProvider>
      <MainLayout />
    </DataProvider>
  );
}

export default App;
