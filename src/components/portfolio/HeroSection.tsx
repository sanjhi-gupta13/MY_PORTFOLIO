import React from 'react';
import { useData } from '../../context/DataContext';
import { 
  ArrowUpRight, 
  Download, 
  Code2, 
  Briefcase, 
  User, 
  Award, 
  CheckCircle2, 
  ArrowRight,
  Zap,
  Layers,
  Terminal
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { profile, projects, certifications, activities } = useData();

  const techStack = [
    { name: 'Python', icon: Terminal },
    { name: 'React', icon: Code2 },
    { name: 'Next.js', icon: Layers },
    { name: 'FastAPI', icon: Zap },
    { name: 'Flask', icon: Code2 },
    { name: 'SQLite', icon: Layers },
    { name: 'PostgreSQL', icon: Layers },
    { name: 'Azure', icon: Zap },
    { name: 'Git', icon: Terminal },
  ];

  return (
    <section id="overview" className="pt-20 lg:pt-0 pb-12 space-y-6">
      
      {/* 1. TOP HERO BENTO CARD */}
      <div className="kan3an-card rounded-[32px] p-8 lg:p-12 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column Text & CTAs */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Status Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-ping"></span>
              <span>Available for Work</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Designing the <br />
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-800 bg-clip-text text-transparent">
                Digital Future.
              </span>
            </h1>

            {/* Subtitle Bio */}
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
              Full Stack Developer & CSE Undergraduate at GLA University. Building scalable web applications and AI voice platforms with cutting-edge technologies and clean design principles.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#contact"
                className="kan3an-pill-btn text-xs sm:text-sm"
              >
                <span>Let's Talk</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              {profile.resume_url && profile.resume_url !== '#' && (
                <a
                  href={profile.resume_url}
                  target="_blank"
                  rel="noreferrer"
                  className="kan3an-outline-btn text-xs sm:text-sm"
                >
                  <span>Download Resume</span>
                  <Download className="w-4 h-4" />
                </a>
              )}
            </div>

          </div>

          {/* Right Column 3D Neumorphic Developer Graphic */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full max-w-sm rounded-3xl bg-gradient-to-tr from-slate-50 via-white to-indigo-50 p-6 border border-slate-200 shadow-xl relative">
              
              {/* Window Bar */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                </div>
                <span className="text-[11px] font-mono text-slate-700 font-bold">sanjhi.dev/system</span>
              </div>

              {/* Graphic Elements */}
              <div className="space-y-3">
                <div className="h-24 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-800 p-4 text-white flex flex-col justify-between shadow-md">
                  <span className="text-xs font-mono font-extrabold text-white">Full-Stack & AI Engineering</span>
                  <span className="text-[11px] font-mono font-semibold text-indigo-100">GLA University Mathura • 8.35 CGPA</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm text-center">
                    <span className="text-xs font-mono font-bold text-indigo-700">Smart Bharat</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm text-center">
                    <span className="text-xs font-mono font-bold text-violet-700">AI Speech Bot</span>
                  </div>
                </div>
              </div>

              {/* Floating Code Chips */}
              <div className="absolute -top-3 -right-3 p-3 rounded-2xl bg-indigo-600 text-white shadow-lg font-mono text-xs font-bold">
                &lt;/&gt;
              </div>
              <div className="absolute -bottom-3 -left-3 p-3 rounded-2xl bg-violet-700 text-white shadow-lg font-mono text-xs font-bold">
                &#123;&#125;
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* 2. FEATURED PROJECTS ROW (2 Gradient Purple Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Project Card (Smart Bharat) */}
        {projects[0] && (
          <div className="kan3an-project-gradient-1 rounded-[28px] p-6 lg:p-8 flex flex-col justify-between relative overflow-hidden group shadow-lg cursor-pointer">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-6">
                <Zap className="w-5 h-5" />
              </div>

              <h3 className="text-2xl font-extrabold text-white mb-2">{projects[0].title}</h3>
              <p className="text-indigo-100 text-xs sm:text-sm font-mono font-semibold mb-4">{projects[0].subtitle || 'Next.js 14, React, FastAPI, SQLAlchemy, SQLite'}</p>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-white/25">
              <span className="text-xs font-bold text-white">View Project Details</span>
              <div className="w-10 h-10 rounded-full bg-white text-indigo-700 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        )}

        {/* Right Project Card (AI Interview Bot) */}
        {projects[1] && (
          <div className="kan3an-project-gradient-2 rounded-[28px] p-6 lg:p-8 flex flex-col justify-between relative overflow-hidden group shadow-lg cursor-pointer">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-6">
                <Code2 className="w-5 h-5" />
              </div>

              <h3 className="text-2xl font-extrabold text-white mb-2">{projects[1].title}</h3>
              <p className="text-violet-100 text-xs sm:text-sm font-mono font-semibold mb-4">{projects[1].subtitle || 'Python, Flask, SpeechRecognition, Whisper, Groq API'}</p>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-white/25">
              <span className="text-xs font-bold text-white">View Project Details</span>
              <div className="w-10 h-10 rounded-full bg-white text-indigo-700 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        )}

      </div>

      {/* 3. 4-COLUMN STAT COUNTER ROW */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="kan3an-card rounded-2xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900">8.35<span className="text-xs text-slate-600 font-normal">/10</span></p>
            <p className="text-[11px] font-bold text-slate-700">GLA University CGPA</p>
          </div>
        </div>

        <div className="kan3an-card rounded-2xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <User className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900">{projects.length || 2}+</p>
            <p className="text-[11px] font-bold text-slate-700">Featured Projects</p>
          </div>
        </div>

        <div className="kan3an-card rounded-2xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900">{certifications.length || 5}+</p>
            <p className="text-[11px] font-bold text-slate-700">Certifications</p>
          </div>
        </div>

        <div className="kan3an-card rounded-2xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900">{activities.length || 2}</p>
            <p className="text-[11px] font-bold text-slate-700">Hackathons Participated</p>
          </div>
        </div>

      </div>

      {/* 4. TECH STACK ROW */}
      <div className="kan3an-card rounded-2xl p-5">
        <h4 className="text-xs font-mono font-bold uppercase text-slate-700 mb-3.5">Tech Stack</h4>
        <div className="flex flex-wrap items-center gap-2.5">
          {techStack.map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <div
                key={idx}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 shadow-sm text-xs font-bold text-slate-900 hover:border-indigo-600 transition-all"
              >
                <Icon className="w-3.5 h-3.5 text-indigo-600" />
                <span>{tech.name}</span>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
};
