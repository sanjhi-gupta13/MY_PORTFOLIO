-- =========================================================
-- SANJHI GUPTA PORTFOLIO — SUPABASE DATABASE SCHEMA & SEED
-- =========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ---------------------------------------------------------
-- 1. PROFILES TABLE
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    bio TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    location TEXT,
    github_url TEXT,
    linkedin_url TEXT,
    resume_url TEXT,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ---------------------------------------------------------
-- 2. EDUCATION TABLE
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.education (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    degree TEXT NOT NULL,
    institution TEXT NOT NULL,
    duration TEXT NOT NULL,
    cgpa_percentage TEXT NOT NULL,
    details TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ---------------------------------------------------------
-- 3. SKILLS TABLE
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    category TEXT NOT NULL, -- 'Languages', 'Web & Frameworks', 'Databases', 'Libraries', 'Tools & Cloud', 'Core CS'
    level INT DEFAULT 85,
    icon TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ---------------------------------------------------------
-- 4. PROJECTS TABLE
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    subtitle TEXT,
    description TEXT NOT NULL,
    bullet_points JSONB DEFAULT '[]'::jsonb,
    technologies JSONB DEFAULT '[]'::jsonb,
    image_url TEXT,
    github_url TEXT,
    demo_url TEXT,
    featured BOOLEAN DEFAULT true,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ---------------------------------------------------------
-- 5. CERTIFICATIONS TABLE
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.certifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    issuer TEXT NOT NULL,
    issue_date TEXT,
    credential_url TEXT,
    badge_image_url TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ---------------------------------------------------------
-- 6. ACTIVITIES TABLE
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    role TEXT NOT NULL,
    organizer TEXT,
    details TEXT,
    date_period TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ---------------------------------------------------------
-- 7. CONTACT MESSAGES TABLE
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ POLICIES
CREATE POLICY "Public Read Profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public Read Education" ON public.education FOR SELECT USING (true);
CREATE POLICY "Public Read Skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Public Read Projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public Read Certifications" ON public.certifications FOR SELECT USING (true);
CREATE POLICY "Public Read Activities" ON public.activities FOR SELECT USING (true);

-- PUBLIC INSERT FOR CONTACT MESSAGES
CREATE POLICY "Public Insert Contact Messages" ON public.contact_messages FOR INSERT WITH CHECK (true);

-- AUTHENTICATED ADMIN FULL ACCESS POLICIES
CREATE POLICY "Admin Full Access Profiles" ON public.profiles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Education" ON public.education FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Skills" ON public.skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Projects" ON public.projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Certifications" ON public.certifications FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Activities" ON public.activities FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Contact Messages" ON public.contact_messages FOR ALL USING (auth.role() = 'authenticated');

-- =========================================================
-- INITIAL SEED DATA (FROM SANJHI GUPTA RESUME)
-- =========================================================

-- PROFILE
INSERT INTO public.profiles (name, title, bio, email, phone, location, github_url, linkedin_url, resume_url, is_available)
VALUES (
    'Sanjhi Gupta',
    'CSE Undergraduate | Full-Stack & AI Developer',
    'CSE undergraduate with a strong foundation in programming, software development, databases, and core computer science concepts.',
    'sanjhigupta2023@gmail.com',
    '8077039022',
    'Mathura, Uttar Pradesh, India',
    'https://github.com/sanjhi-gupta13',
    'https://linkedin.com/in/sanjhi-gupta-907b57382',
    '#',
    true
) ON CONFLICT DO NOTHING;

-- EDUCATION
INSERT INTO public.education (degree, institution, duration, cgpa_percentage, details, display_order)
VALUES 
    ('B.Tech in Computer Science and Engineering (Honors)', 'GLA University, Mathura', '2025 – 2029', 'CGPA: 8.35/10', 'Specialization in Software Development and Computer Science core fundamentals.', 1),
    ('Class XII (ISC)', 'Senior Secondary Education', 'Completed', '90% (ISC)', 'Strong academic foundation in Mathematics, Computer Science, and Science.', 2);

-- SKILLS
INSERT INTO public.skills (name, category, level, display_order) VALUES
    ('Python', 'Languages', 90, 1),
    ('Java', 'Languages', 85, 2),
    ('JavaScript', 'Languages', 85, 3),
    ('HTML', 'Web & Frameworks', 95, 4),
    ('CSS', 'Web & Frameworks', 90, 5),
    ('React', 'Web & Frameworks', 88, 6),
    ('Bootstrap', 'Web & Frameworks', 80, 7),
    ('Flask', 'Web & Frameworks', 85, 8),
    ('Streamlit', 'Web & Frameworks', 82, 9),
    ('MySQL', 'Databases', 85, 10),
    ('SQLite', 'Databases', 90, 11),
    ('SQL', 'Databases', 88, 12),
    ('NumPy', 'Libraries', 85, 13),
    ('Pandas', 'Libraries', 85, 14),
    ('Matplotlib', 'Libraries', 80, 15),
    ('SpeechRecognition', 'Libraries', 82, 16),
    ('Whisper', 'Libraries', 80, 17),
    ('Git', 'Tools & Cloud', 90, 18),
    ('GitHub', 'Tools & Cloud', 90, 19),
    ('Microsoft Azure', 'Tools & Cloud', 78, 20),
    ('Vercel', 'Tools & Cloud', 85, 21),
    ('Postman', 'Tools & Cloud', 82, 22),
    ('OOP', 'Core CS', 90, 23),
    ('DBMS', 'Core CS', 88, 24),
    ('Operating Systems', 'Core CS', 85, 25),
    ('Cloud Computing', 'Core CS', 80, 26);

-- PROJECTS
INSERT INTO public.projects (title, subtitle, description, bullet_points, technologies, github_url, demo_url, featured, display_order)
VALUES 
    (
        'Smart Bharat',
        'Full-Stack Civic Platform',
        'Developed a full-stack civic platform for government information, service eligibility, and grievance tracking. Built responsive frontend and backend services.',
        '["Developed a full-stack civic platform for government information, service eligibility, and grievance tracking.", "Built responsive frontend and backend services using Next.js, React, Tailwind CSS, FastAPI, and SQLAlchemy."]'::jsonb,
        '["Next.js", "React", "Tailwind CSS", "FastAPI", "SQLAlchemy", "SQLite"]'::jsonb,
        'https://github.com/sanjhi-gupta13',
        '#',
        true,
        1
    ),
    (
        'AI-Powered Interview Bot',
        'Voice & Text Automated Interviewing System',
        'Developed an interview platform supporting voice/text interviews, automated scoring, and personalized feedback with plagiarism-detection capabilities.',
        '["Developed an interview platform supporting voice/text interviews, automated scoring, and personalized feedback.", "Implemented authentication, protected routes, and database management using Flask and SQLite.", "Added speech-processing and plagiarism-detection capabilities for automated evaluation."]'::jsonb,
        '["Python", "Flask", "SQLite", "HTML/CSS", "SpeechRecognition", "Whisper", "Groq API"]'::jsonb,
        'https://github.com/sanjhi-gupta13',
        '#',
        true,
        2
    );

-- CERTIFICATIONS
INSERT INTO public.certifications (title, issuer, issue_date, display_order)
VALUES
    ('Microsoft Azure Fundamentals (AZ-900)', 'Microsoft', 'Verified', 1),
    ('AI & Machine Learning Workshop', 'IIT Roorkee', 'Verified', 2),
    ('Intel Unnati – Data-Centric Labs in Emerging Technologies', 'Intel', 'Verified', 3),
    ('AI Mastery: Unlocking Artificial Intelligence', 'NEC Corporation', 'Verified', 4),
    ('Python (Basic)', 'HackerRank', 'Verified', 5);

-- ACTIVITIES
INSERT INTO public.activities (title, role, organizer, details, date_period, display_order)
VALUES
    ('TECHNEX26 – Hack It Out', 'Participant', 'IIT BHU', 'Participated in competitive hackathon focusing on rapid prototyping and algorithm implementation.', 'TECHNEX26', 1),
    ('PromptWars × Devengers – Build with AI Challenge', 'Participant', 'Devengers', 'Developed Smart Bharat platform during the hackathon, creating full-stack civic tools powered by modern APIs.', 'Build with AI Challenge', 2);
