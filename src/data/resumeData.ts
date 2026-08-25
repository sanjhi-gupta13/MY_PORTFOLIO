import { Profile, Education, Skill, Project, Certification, Activity } from '../types';

export const initialProfile: Profile = {
  id: 'profile-1',
  name: 'Sanjhi Gupta',
  title: 'CSE Undergraduate | Full-Stack & AI Developer',
  bio: 'CSE undergraduate with a strong foundation in programming, software development, databases, and core computer science concepts.',
  email: 'sanjhigupta2023@gmail.com',
  phone: '8077039022',
  location: 'Mathura, Uttar Pradesh, India',
  github_url: 'https://github.com/sanjhi-gupta13',
  linkedin_url: 'https://linkedin.com/in/sanjhi-gupta-907b57382',
  resume_url: '#',
  is_available: true
};

export const initialEducation: Education[] = [
  {
    id: 'edu-1',
    degree: 'B.Tech in Computer Science and Engineering (Honors)',
    institution: 'GLA University, Mathura',
    duration: '2025 – 2029',
    cgpa_percentage: 'CGPA: 8.35/10',
    details: 'Specialization in Software Development, Database Management, and AI system design.',
    display_order: 1
  },
  {
    id: 'edu-2',
    degree: 'Class XII (ISC)',
    institution: 'Senior Secondary School',
    duration: 'Completed',
    cgpa_percentage: '90% (ISC)',
    details: 'Mathematics, Science, and Computer Fundamentals.',
    display_order: 2
  }
];

export const initialSkills: Skill[] = [
  // Languages
  { id: 'skill-1', name: 'Python', category: 'Languages', level: 90, display_order: 1 },
  { id: 'skill-2', name: 'Java', category: 'Languages', level: 85, display_order: 2 },
  { id: 'skill-3', name: 'JavaScript', category: 'Languages', level: 88, display_order: 3 },
  
  // Web & Frameworks
  { id: 'skill-4', name: 'HTML', category: 'Web & Frameworks', level: 95, display_order: 4 },
  { id: 'skill-5', name: 'CSS', category: 'Web & Frameworks', level: 92, display_order: 5 },
  { id: 'skill-6', name: 'React', category: 'Web & Frameworks', level: 88, display_order: 6 },
  { id: 'skill-7', name: 'Bootstrap', category: 'Web & Frameworks', level: 85, display_order: 7 },
  { id: 'skill-8', name: 'Flask', category: 'Web & Frameworks', level: 85, display_order: 8 },
  { id: 'skill-9', name: 'Streamlit', category: 'Web & Frameworks', level: 82, display_order: 9 },

  // Databases
  { id: 'skill-10', name: 'MySQL', category: 'Databases', level: 85, display_order: 10 },
  { id: 'skill-11', name: 'SQLite', category: 'Databases', level: 90, display_order: 11 },
  { id: 'skill-12', name: 'SQL', category: 'Databases', level: 88, display_order: 12 },

  // Libraries
  { id: 'skill-13', name: 'NumPy', category: 'Libraries', level: 85, display_order: 13 },
  { id: 'skill-14', name: 'Pandas', category: 'Libraries', level: 85, display_order: 14 },
  { id: 'skill-15', name: 'Matplotlib', category: 'Libraries', level: 80, display_order: 15 },
  { id: 'skill-16', name: 'SpeechRecognition', category: 'Libraries', level: 82, display_order: 16 },
  { id: 'skill-17', name: 'Whisper', category: 'Libraries', level: 80, display_order: 17 },

  // Tools & Cloud
  { id: 'skill-18', name: 'Git', category: 'Tools & Cloud', level: 90, display_order: 18 },
  { id: 'skill-19', name: 'GitHub', category: 'Tools & Cloud', level: 92, display_order: 19 },
  { id: 'skill-20', name: 'Microsoft Azure', category: 'Tools & Cloud', level: 78, display_order: 20 },
  { id: 'skill-21', name: 'Vercel', category: 'Tools & Cloud', level: 85, display_order: 21 },
  { id: 'skill-22', name: 'Postman', category: 'Tools & Cloud', level: 84, display_order: 22 },

  // Core CS
  { id: 'skill-23', name: 'OOP', category: 'Core CS', level: 90, display_order: 23 }
];

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'Smart Bharat',
    subtitle: 'Full-Stack Civic Platform',
    description: 'Developed a full-stack civic platform for government information, service eligibility, and grievance tracking.',
    bullet_points: [
      'Developed a full-stack civic platform for government information, service eligibility, and grievance tracking.',
      'Built responsive frontend and backend services using Next.js, React, Tailwind CSS, FastAPI, and SQLAlchemy.'
    ],
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'FastAPI', 'SQLAlchemy', 'SQLite'],
    github_url: 'https://github.com/sanjhi-gupta13',
    demo_url: 'https://github.com/sanjhi-gupta13',
    featured: true,
    display_order: 1
  },
  {
    id: 'proj-2',
    title: 'AI-Powered Interview Bot',
    subtitle: 'Voice & Text Automated Evaluation System',
    description: 'Developed an interview platform supporting voice/text interviews, automated scoring, and personalized feedback.',
    bullet_points: [
      'Developed an interview platform supporting voice/text interviews, automated scoring, and personalized feedback.',
      'Utilized Python, Flask, SpeechRecognition, Whisper, and Groq API for AI evaluation.'
    ],
    technologies: ['Python', 'Flask', 'SpeechRecognition', 'Whisper', 'Groq API', 'SQLite'],
    github_url: 'https://github.com/sanjhi-gupta13',
    demo_url: 'https://github.com/sanjhi-gupta13',
    featured: true,
    display_order: 2
  }
];

export const initialCertifications: Certification[] = [
  {
    id: 'cert-1',
    title: 'Microsoft Azure Fundamentals (AZ-900)',
    issuer: 'Microsoft',
    issue_date: 'Verified',
    credential_url: '',
    display_order: 1
  },
  {
    id: 'cert-2',
    title: 'AI & Machine Learning Workshop',
    issuer: 'IIT Roorkee',
    issue_date: 'Verified',
    credential_url: '',
    display_order: 2
  },
  {
    id: 'cert-3',
    title: 'Intel Unnati – Data-Centric Labs in Emerging Technologies',
    issuer: 'Intel',
    issue_date: 'Verified',
    credential_url: '',
    display_order: 3
  },
  {
    id: 'cert-4',
    title: 'AI Mastery: Unlocking Artificial Intelligence',
    issuer: 'NEC Corporation',
    issue_date: 'Verified',
    credential_url: '',
    display_order: 4
  },
  {
    id: 'cert-5',
    title: 'Python (Basic)',
    issuer: 'HackerRank',
    issue_date: 'Verified',
    credential_url: '',
    display_order: 5
  }
];

export const initialActivities: Activity[] = [
  {
    id: 'act-1',
    title: 'TECHNEX26 – Hack It Out',
    role: 'Participant',
    organizer: 'IIT BHU',
    date_period: '2026',
    details: 'Participated in a competitive hackathon developing tech solutions under tight deadlines.',
    display_order: 1
  },
  {
    id: 'act-2',
    title: 'PromptWars × Devengers – Build with AI Challenge',
    role: 'Participant',
    organizer: 'Devengers Community',
    date_period: '2026',
    details: 'Developed the Smart Bharat platform as part of the AI challenge.',
    display_order: 2
  }
];
