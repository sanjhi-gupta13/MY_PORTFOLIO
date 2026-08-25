export interface Profile {
  id?: string;
  name: string;
  title: string;
  bio: string;
  email: string;
  phone?: string;
  location?: string;
  github_url?: string;
  linkedin_url?: string;
  resume_url?: string;
  is_available: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  duration: string;
  cgpa_percentage: string;
  details?: string;
  display_order: number;
  created_at?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Languages' | 'Web & Frameworks' | 'Databases' | 'Libraries' | 'Tools & Cloud' | 'Core CS' | string;
  level: number; // 0 - 100
  icon?: string;
  display_order: number;
  created_at?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  bullet_points: string[];
  technologies: string[];
  image_url?: string;
  github_url?: string;
  demo_url?: string;
  featured: boolean;
  display_order: number;
  created_at?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issue_date?: string;
  credential_url?: string;
  badge_image_url?: string;
  display_order: number;
  created_at?: string;
}

export interface Activity {
  id: string;
  title: string;
  role: string;
  organizer?: string;
  details?: string;
  date_period?: string;
  display_order: number;
  created_at?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
}
