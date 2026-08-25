import React from 'react';
import { useData } from '../../context/DataContext';
import { Trophy, Calendar, MapPin } from 'lucide-react';

export const ActivitiesSection: React.FC = () => {
  const { activities } = useData();

  return (
    <section id="activities" className="mb-16 scroll-mt-24">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold font-mono mb-2">
          <Trophy className="w-3.5 h-3.5 text-amber-600" />
          <span>EVENTS & HACKATHONS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Hackathons & Activities</h2>
        <p className="text-slate-700 font-semibold text-xs sm:text-sm mt-1">Hackathons, challenges & developer events</p>
      </div>

      <div className="space-y-4">
        {activities.map((act) => (
          <div
            key={act.id}
            className="p-6 rounded-[28px] kan3an-card flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 shrink-0">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold">
                    {act.role}
                  </span>
                  {act.organizer && (
                    <span className="text-xs font-mono font-bold text-slate-700 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-indigo-600" />
                      {act.organizer}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900">{act.title}</h3>
                {act.details && (
                  <p className="text-slate-700 text-xs sm:text-sm mt-1 leading-relaxed max-w-2xl font-normal">
                    {act.details}
                  </p>
                )}
              </div>
            </div>

            {act.date_period && (
              <div className="shrink-0 font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-4 py-2 rounded-full border border-indigo-200 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                <span>{act.date_period}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
