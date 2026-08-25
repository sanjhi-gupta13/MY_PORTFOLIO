import React from 'react';
import { useData } from '../../context/DataContext';
import { ArrowUpRight, Code2, Cpu, Database, Cloud } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { profile } = useData();

  const pillars = [
    {
      title: 'Full-Stack Web Engineering',
      desc: 'React, Next.js, FastAPI, Flask, REST APIs.',
      icon: Code2
    },
    {
      title: 'AI Systems & Speech Processing',
      desc: 'SpeechRecognition, Whisper, Groq API.',
      icon: Cpu
    },
    {
      title: 'Database Architecture',
      desc: 'MySQL, SQLite, SQLAlchemy ORM schemas.',
      icon: Database
    },
    {
      title: 'Cloud & Fundamental CS',
      desc: 'Microsoft Azure AZ-900, Git, Operating Systems.',
      icon: Cloud
    }
  ];

  return (
    <section id="about" className="mb-16 scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Card: Achievements & Academic Journey */}
        <div className="lg:col-span-6 kan3an-card rounded-[28px] p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
              Achievements & Academic Journey.
            </h2>

            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
              Currently pursuing B.Tech in Computer Science and Engineering (Honors) at GLA University, Mathura with a strong CGPA of 8.35/10. Experienced in building production-ready full-stack applications like Smart Bharat and AI-powered evaluation systems.
            </p>

            <p className="text-slate-600 text-xs leading-relaxed mb-8 font-normal">
              Focused on object-oriented programming, database management systems, web development, and cloud computing principles.
            </p>
          </div>

          <div>
            <a
              href="#contact"
              className="kan3an-pill-btn text-xs"
            >
              <span>Contact Me</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Right Card: Specializations / Core Focus */}
        <div className="lg:col-span-6 kan3an-card rounded-[28px] p-8 flex flex-col justify-between bg-gradient-to-br from-white via-slate-50 to-indigo-50/40">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold mb-4">
              Core Engineering Focus
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Full-Stack Architecture & AI Integration
            </h3>

            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
              Combining modern frontend design systems with robust Python backends, SQLAlchemy relational databases, and Azure cloud infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-200">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-start gap-2.5 shadow-sm">
                  <div className="p-2 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs mb-0.5">{item.title}</h4>
                    <p className="text-[11px] text-slate-600 leading-tight font-medium">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
