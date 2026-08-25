import React from 'react';
import { useData } from '../../context/DataContext';
import { GraduationCap, Calendar, ShieldCheck, Award, BookOpen } from 'lucide-react';

export const EducationSection: React.FC = () => {
  const { education } = useData();

  return (
    <section id="education" className="mb-16 scroll-mt-24">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold font-mono mb-2">
          <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
          <span>ACADEMIC BACKGROUND</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Education Record</h2>
        <p className="text-slate-700 font-semibold text-xs sm:text-sm mt-1">Academic credentials and performance metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {education.map((edu) => (
          <div
            key={edu.id}
            className="kan3an-card rounded-[28px] p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-mono font-bold">
                  <Calendar className="w-3.5 h-3.5" />
                  {edu.duration}
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold font-mono">
                  <Award className="w-3.5 h-3.5" />
                  {edu.cgpa_percentage}
                </span>
              </div>

              <div className="flex items-start gap-3.5 mb-3">
                <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg leading-snug">{edu.degree}</h3>
                  <p className="text-indigo-600 font-bold text-xs mt-0.5">{edu.institution}</p>
                </div>
              </div>

              {edu.details && (
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mt-3 pt-3 border-t border-slate-200 font-normal">
                  {edu.details}
                </p>
              )}
            </div>

            <div className="mt-4 pt-3 flex items-center gap-1.5 text-[11px] text-slate-600 font-mono font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Official Academic Record Verified</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
