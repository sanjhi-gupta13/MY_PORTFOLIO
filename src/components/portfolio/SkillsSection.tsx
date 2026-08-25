import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { 
  Terminal, 
  Code2, 
  Database, 
  BookOpen, 
  Wrench, 
  Cpu, 
  Sparkles, 
  CheckCircle2,
  Tag
} from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const { skills } = useData();
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = [
    { id: 'All', label: 'All Domains' },
    { id: 'Languages', label: 'Languages', icon: Terminal, color: 'from-indigo-600 to-purple-600' },
    { id: 'Web & Frameworks', label: 'Web & Frameworks', icon: Code2, color: 'from-violet-600 to-indigo-600' },
    { id: 'Databases', label: 'Databases', icon: Database, color: 'from-blue-600 to-indigo-600' },
    { id: 'Libraries & AI', label: 'Libraries & AI', icon: BookOpen, color: 'from-purple-600 to-pink-600' },
    { id: 'Tools & Cloud', label: 'Tools & Cloud', icon: Wrench, color: 'from-emerald-600 to-teal-600' },
    { id: 'Core CS', label: 'Core CS', icon: Cpu, color: 'from-amber-600 to-orange-600' }
  ];

  // Helper to map skill categories into normalized group names
  const getGroupCategory = (cat: string) => {
    const lower = cat.toLowerCase();
    if (lower.includes('language')) return 'Languages';
    if (lower.includes('web') || lower.includes('framework')) return 'Web & Frameworks';
    if (lower.includes('database')) return 'Databases';
    if (lower.includes('library') || lower.includes('ai') || lower.includes('ml')) return 'Libraries & AI';
    if (lower.includes('tool') || lower.includes('cloud')) return 'Tools & Cloud';
    return 'Core CS';
  };

  // Group skills by domain category
  const groupedCategories = categories.filter(c => c.id !== 'All').map(catDef => {
    const items = skills.filter(s => getGroupCategory(s.category) === catDef.id);
    return {
      ...catDef,
      items
    };
  }).filter(group => group.items.length > 0);

  const displayedGroups = activeFilter === 'All'
    ? groupedCategories
    : groupedCategories.filter(g => g.id === activeFilter);

  return (
    <section id="skills" className="mb-16 scroll-mt-24">
      
      {/* Compact Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold font-mono mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>TECHNICAL MATRIX</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Skills & Technical Stack
          </h2>
        </div>

        {/* Domain Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => {
            const isSelected = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 ${
                  isSelected
                    ? 'bg-indigo-600 text-white font-extrabold shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/50'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* COMPACT BENTO GRID OF CATEGORY SKILL CHIPS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedGroups.map((group) => {
          const CategoryIcon = group.icon || Tag;

          return (
            <div
              key={group.id}
              className="kan3an-card rounded-2xl p-5 border border-slate-200 hover:border-indigo-300 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${group.color} text-white flex items-center justify-center shadow-sm`}>
                      <CategoryIcon className="w-4 h-4" />
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm tracking-wider uppercase">
                      {group.id}
                    </h3>
                  </div>

                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {group.items.length} Skills
                  </span>
                </div>

                {/* Compact Interactive Skill Chips */}
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <div
                      key={skill.id}
                      className="group/chip inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-indigo-400 text-slate-900 text-xs font-bold transition-all duration-200 shadow-sm hover:shadow-md cursor-default hover:-translate-y-0.5"
                      title={`${skill.name}: ${skill.level}% Proficiency`}
                    >
                      <span className="group-hover/chip:text-indigo-600 transition-colors">
                        {skill.name}
                      </span>

                      <span className="px-1.5 py-0.2 rounded-md text-[10px] font-mono font-black bg-indigo-50 group-hover/chip:bg-indigo-600 text-indigo-700 group-hover/chip:text-white transition-colors">
                        {skill.level}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Subtle Indicator */}
              <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Verified Skill Data
                </span>
                <span>Resume Verified</span>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
};
