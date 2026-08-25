import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Profile, 
  Education, 
  Skill, 
  Project, 
  Certification, 
  Activity, 
  ContactMessage, 
  ToastMessage, 
  ToastType 
} from '../types';
import { 
  getProfile, 
  getEducationList, 
  getSkillsList, 
  getProjectsList, 
  getCertificationsList, 
  getActivitiesList, 
  getContactMessages,
  supabase,
  isSupabaseConfigured
} from '../lib/supabase';

interface DataContextType {
  profile: Profile;
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  activities: Activity[];
  messages: ContactMessage[];
  loading: boolean;
  toasts: ToastMessage[];
  isAuthenticated: boolean;
  userEmail: string | null;
  refreshData: () => Promise<void>;
  addToast: (title: string, description?: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
  loginAdmin: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logoutAdmin: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<Profile>({} as Profile);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('sanjhi_admin_authed') === 'true';
  });
  const [userEmail, setUserEmail] = useState<string | null>(() => {
    return localStorage.getItem('sanjhi_admin_email') || null;
  });

  const addToast = (title: string, description?: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const refreshData = async () => {
    setLoading(true);
    try {
      const [profData, eduData, skillsData, projData, certData, actData, msgData] = await Promise.all([
        getProfile(),
        getEducationList(),
        getSkillsList(),
        getProjectsList(),
        getCertificationsList(),
        getActivitiesList(),
        getContactMessages()
      ]);

      setProfile(profData);
      setEducation(eduData);
      setSkills(skillsData);
      setProjects(projData);
      setCertifications(certData);
      setActivities(actData);
      setMessages(msgData);
    } catch (err) {
      console.error('Error refreshing portfolio data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();

    // Supabase auth state listener if configured
    if (isSupabaseConfigured) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          setIsAuthenticated(true);
          setUserEmail(session.user.email || 'admin@sanjhi.dev');
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session) {
          setIsAuthenticated(true);
          setUserEmail(session.user.email || 'admin@sanjhi.dev');
          localStorage.setItem('sanjhi_admin_authed', 'true');
          localStorage.setItem('sanjhi_admin_email', session.user.email || '');
        } else {
          setIsAuthenticated(false);
          setUserEmail(null);
          localStorage.removeItem('sanjhi_admin_authed');
          localStorage.removeItem('sanjhi_admin_email');
        }
      });

      return () => subscription.unsubscribe();
    }
  }, []);

  const loginAdmin = async (email: string, pass: string) => {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password: pass
        });
        if (error) {
          return { success: false, error: error.message };
        }
        setIsAuthenticated(true);
        setUserEmail(data.user.email || email);
        localStorage.setItem('sanjhi_admin_authed', 'true');
        localStorage.setItem('sanjhi_admin_email', data.user.email || email);
        return { success: true };
      } catch (err: any) {
        return { success: false, error: err.message || 'Login failed' };
      }
    } else {
      // Demo authentication mode when Supabase credentials are pending setup
      if (email && pass.length >= 6) {
        setIsAuthenticated(true);
        setUserEmail(email);
        localStorage.setItem('sanjhi_admin_authed', 'true');
        localStorage.setItem('sanjhi_admin_email', email);
        return { success: true };
      } else {
        return { success: false, error: 'Password must be at least 6 characters.' };
      }
    }
  };

  const logoutAdmin = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setIsAuthenticated(false);
    setUserEmail(null);
    localStorage.removeItem('sanjhi_admin_authed');
    localStorage.removeItem('sanjhi_admin_email');
    addToast('Logged out', 'You have been signed out of the admin panel.', 'info');
  };

  return (
    <DataContext.Provider
      value={{
        profile,
        education,
        skills,
        projects,
        certifications,
        activities,
        messages,
        loading,
        toasts,
        isAuthenticated,
        userEmail,
        refreshData,
        addToast,
        removeToast,
        loginAdmin,
        logoutAdmin
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};
