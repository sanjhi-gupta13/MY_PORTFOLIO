import { createClient } from '@supabase/supabase-js';
import { Profile, Education, Skill, Project, Certification, Activity, ContactMessage } from '../types';
import { 
  initialProfile, 
  initialEducation, 
  initialSkills, 
  initialProjects, 
  initialCertifications, 
  initialActivities 
} from '../data/resumeData';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project.supabase.co' &&
  !supabaseUrl.includes('your-project')
);

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
);

// Local memory fallback state for smooth demonstration when Supabase env keys are pending
let localState = {
  profile: { ...initialProfile },
  education: [...initialEducation],
  skills: [...initialSkills],
  projects: [...initialProjects],
  certifications: [...initialCertifications],
  activities: [...initialActivities],
  messages: [] as ContactMessage[]
};

// ---------------------------------------------------------
// PROFILE API
// ---------------------------------------------------------
export async function getProfile(): Promise<Profile> {
  if (!isSupabaseConfigured) return localState.profile;
  try {
    const { data, error } = await supabase.from('profiles').select('*').limit(1).maybeSingle();
    if (error || !data) {
      console.warn('Supabase fetch profile warning:', error?.message);
      return localState.profile;
    }
    return data as Profile;
  } catch {
    return localState.profile;
  }
}

export async function updateProfile(updated: Partial<Profile>): Promise<Profile> {
  localState.profile = { ...localState.profile, ...updated, updated_at: new Date().toISOString() };
  if (!isSupabaseConfigured) return localState.profile;
  try {
    if (localState.profile.id && localState.profile.id.includes('-')) {
      const { data, error } = await supabase.from('profiles').upsert([updated]).select().single();
      if (error) throw error;
      return data as Profile;
    }
  } catch (err) {
    console.error('Error updating profile in Supabase:', err);
  }
  return localState.profile;
}

// ---------------------------------------------------------
// EDUCATION API
// ---------------------------------------------------------
export async function getEducationList(): Promise<Education[]> {
  if (!isSupabaseConfigured) return localState.education;
  try {
    const { data, error } = await supabase.from('education').select('*').order('display_order', { ascending: true });
    if (error || !data || data.length === 0) return localState.education;
    return data as Education[];
  } catch {
    return localState.education;
  }
}

export async function saveEducation(item: Partial<Education>): Promise<Education> {
  if (item.id && !item.id.startsWith('edu-')) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('education').update(item).eq('id', item.id).select().single();
      if (!error && data) return data as Education;
    }
    localState.education = localState.education.map(e => e.id === item.id ? { ...e, ...item } as Education : e);
    return item as Education;
  } else {
    const newItem: Education = {
      id: isSupabaseConfigured ? crypto.randomUUID() : `edu-${Date.now()}`,
      degree: item.degree || 'Degree',
      institution: item.institution || 'University',
      duration: item.duration || '2025 - 2029',
      cgpa_percentage: item.cgpa_percentage || '8.0/10',
      details: item.details || '',
      display_order: item.display_order || localState.education.length + 1
    };
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('education').insert([newItem]).select().single();
      if (!error && data) return data as Education;
    }
    localState.education.push(newItem);
    return newItem;
  }
}

export async function deleteEducationItem(id: string): Promise<boolean> {
  localState.education = localState.education.filter(e => e.id !== id);
  if (isSupabaseConfigured && !id.startsWith('edu-')) {
    await supabase.from('education').delete().eq('id', id);
  }
  return true;
}

// ---------------------------------------------------------
// SKILLS API
// ---------------------------------------------------------
export async function getSkillsList(): Promise<Skill[]> {
  if (!isSupabaseConfigured) return localState.skills;
  try {
    const { data, error } = await supabase.from('skills').select('*').order('display_order', { ascending: true });
    if (error || !data || data.length === 0) return localState.skills;
    return data as Skill[];
  } catch {
    return localState.skills;
  }
}

export async function saveSkill(item: Partial<Skill>): Promise<Skill> {
  if (item.id && !item.id.startsWith('skill-')) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('skills').update(item).eq('id', item.id).select().single();
      if (!error && data) return data as Skill;
    }
    localState.skills = localState.skills.map(s => s.id === item.id ? { ...s, ...item } as Skill : s);
    return item as Skill;
  } else {
    const newItem: Skill = {
      id: isSupabaseConfigured ? crypto.randomUUID() : `skill-${Date.now()}`,
      name: item.name || 'New Skill',
      category: item.category || 'Languages',
      level: item.level || 85,
      display_order: item.display_order || localState.skills.length + 1
    };
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('skills').insert([newItem]).select().single();
      if (!error && data) return data as Skill;
    }
    localState.skills.push(newItem);
    return newItem;
  }
}

export async function deleteSkillItem(id: string): Promise<boolean> {
  localState.skills = localState.skills.filter(s => s.id !== id);
  if (isSupabaseConfigured && !id.startsWith('skill-')) {
    await supabase.from('skills').delete().eq('id', id);
  }
  return true;
}

// ---------------------------------------------------------
// PROJECTS API
// ---------------------------------------------------------
export async function getProjectsList(): Promise<Project[]> {
  if (!isSupabaseConfigured) return localState.projects;
  try {
    const { data, error } = await supabase.from('projects').select('*').order('display_order', { ascending: true });
    if (error || !data || data.length === 0) return localState.projects;
    return data.map(p => ({
      ...p,
      bullet_points: Array.isArray(p.bullet_points) ? p.bullet_points : [],
      technologies: Array.isArray(p.technologies) ? p.technologies : []
    })) as Project[];
  } catch {
    return localState.projects;
  }
}

export async function saveProject(item: Partial<Project>): Promise<Project> {
  const payload = {
    ...item,
    bullet_points: item.bullet_points || [],
    technologies: item.technologies || []
  };

  if (item.id && !item.id.startsWith('proj-')) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('projects').update(payload).eq('id', item.id).select().single();
      if (!error && data) return data as Project;
    }
    localState.projects = localState.projects.map(p => p.id === item.id ? { ...p, ...payload } as Project : p);
    return item as Project;
  } else {
    const newItem: Project = {
      id: isSupabaseConfigured ? crypto.randomUUID() : `proj-${Date.now()}`,
      title: item.title || 'New Project',
      subtitle: item.subtitle || '',
      description: item.description || '',
      bullet_points: item.bullet_points || [],
      technologies: item.technologies || [],
      image_url: item.image_url || '',
      github_url: item.github_url || '',
      demo_url: item.demo_url || '',
      featured: item.featured ?? true,
      display_order: item.display_order || localState.projects.length + 1
    };
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('projects').insert([newItem]).select().single();
      if (!error && data) return data as Project;
    }
    localState.projects.push(newItem);
    return newItem;
  }
}

export async function deleteProjectItem(id: string): Promise<boolean> {
  localState.projects = localState.projects.filter(p => p.id !== id);
  if (isSupabaseConfigured && !id.startsWith('proj-')) {
    await supabase.from('projects').delete().eq('id', id);
  }
  return true;
}

// ---------------------------------------------------------
// CERTIFICATIONS API
// ---------------------------------------------------------
export async function getCertificationsList(): Promise<Certification[]> {
  if (!isSupabaseConfigured) return localState.certifications;
  try {
    const { data, error } = await supabase.from('certifications').select('*').order('display_order', { ascending: true });
    if (error || !data || data.length === 0) return localState.certifications;
    return data as Certification[];
  } catch {
    return localState.certifications;
  }
}

export async function saveCertification(item: Partial<Certification>): Promise<Certification> {
  if (item.id && !item.id.startsWith('cert-')) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('certifications').update(item).eq('id', item.id).select().single();
      if (!error && data) return data as Certification;
    }
    localState.certifications = localState.certifications.map(c => c.id === item.id ? { ...c, ...item } as Certification : c);
    return item as Certification;
  } else {
    const newItem: Certification = {
      id: isSupabaseConfigured ? crypto.randomUUID() : `cert-${Date.now()}`,
      title: item.title || 'New Certification',
      issuer: item.issuer || 'Organization',
      issue_date: item.issue_date || 'Verified',
      display_order: item.display_order || localState.certifications.length + 1
    };
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('certifications').insert([newItem]).select().single();
      if (!error && data) return data as Certification;
    }
    localState.certifications.push(newItem);
    return newItem;
  }
}

export async function deleteCertificationItem(id: string): Promise<boolean> {
  localState.certifications = localState.certifications.filter(c => c.id !== id);
  if (isSupabaseConfigured && !id.startsWith('cert-')) {
    await supabase.from('certifications').delete().eq('id', id);
  }
  return true;
}

// ---------------------------------------------------------
// ACTIVITIES API
// ---------------------------------------------------------
export async function getActivitiesList(): Promise<Activity[]> {
  if (!isSupabaseConfigured) return localState.activities;
  try {
    const { data, error } = await supabase.from('activities').select('*').order('display_order', { ascending: true });
    if (error || !data || data.length === 0) return localState.activities;
    return data as Activity[];
  } catch {
    return localState.activities;
  }
}

export async function saveActivity(item: Partial<Activity>): Promise<Activity> {
  if (item.id && !item.id.startsWith('act-')) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('activities').update(item).eq('id', item.id).select().single();
      if (!error && data) return data as Activity;
    }
    localState.activities = localState.activities.map(a => a.id === item.id ? { ...a, ...item } as Activity : a);
    return item as Activity;
  } else {
    const newItem: Activity = {
      id: isSupabaseConfigured ? crypto.randomUUID() : `act-${Date.now()}`,
      title: item.title || 'New Hackathon / Event',
      role: item.role || 'Participant',
      organizer: item.organizer || '',
      details: item.details || '',
      date_period: item.date_period || '2026',
      display_order: item.display_order || localState.activities.length + 1
    };
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('activities').insert([newItem]).select().single();
      if (!error && data) return data as Activity;
    }
    localState.activities.push(newItem);
    return newItem;
  }
}

export async function deleteActivityItem(id: string): Promise<boolean> {
  localState.activities = localState.activities.filter(a => a.id !== id);
  if (isSupabaseConfigured && !id.startsWith('act-')) {
    await supabase.from('activities').delete().eq('id', id);
  }
  return true;
}

// ---------------------------------------------------------
// CONTACT MESSAGES API
// ---------------------------------------------------------
export async function getContactMessages(): Promise<ContactMessage[]> {
  if (!isSupabaseConfigured) return localState.messages;
  try {
    const { data, error } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data as ContactMessage[];
  } catch {
    return localState.messages;
  }
}

export async function sendContactMessage(msg: { name: string; email: string; subject?: string; message: string }): Promise<boolean> {
  const newMsg: ContactMessage = {
    id: isSupabaseConfigured ? crypto.randomUUID() : `msg-${Date.now()}`,
    name: msg.name,
    email: msg.email,
    subject: msg.subject || 'Portfolio Contact',
    message: msg.message,
    is_read: false,
    created_at: new Date().toISOString()
  };

  if (isSupabaseConfigured) {
    const { error } = await supabase.from('contact_messages').insert([newMsg]);
    if (error) {
      console.error('Supabase contact message error:', error.message);
      localState.messages.unshift(newMsg);
      return false;
    }
    return true;
  }

  localState.messages.unshift(newMsg);
  return true;
}

export async function toggleMessageReadStatus(id: string, currentReadState: boolean): Promise<boolean> {
  localState.messages = localState.messages.map(m => m.id === id ? { ...m, is_read: !currentReadState } : m);
  if (isSupabaseConfigured && !id.startsWith('msg-')) {
    await supabase.from('contact_messages').update({ is_read: !currentReadState }).eq('id', id);
  }
  return true;
}

export async function deleteMessage(id: string): Promise<boolean> {
  localState.messages = localState.messages.filter(m => m.id !== id);
  if (isSupabaseConfigured && !id.startsWith('msg-')) {
    await supabase.from('contact_messages').delete().eq('id', id);
  }
  return true;
}

// ---------------------------------------------------------
// SUPABASE STORAGE HELPER
// ---------------------------------------------------------
export async function uploadPortfolioAsset(file: File, path: string): Promise<string | null> {
  if (!isSupabaseConfigured) return null;
  try {
    const { data, error } = await supabase.storage.from('portfolio-assets').upload(path, file, { upsert: true });
    if (error) throw error;
    const { data: publicUrlData } = supabase.storage.from('portfolio-assets').getPublicUrl(data.path);
    return publicUrlData.publicUrl;
  } catch (err) {
    console.error('Error uploading to Supabase Storage:', err);
    return null;
  }
}
