import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Project } from '../../types';
import { ProjectModal } from './ProjectModal';
import { ArrowUpRight, Github, ExternalLink, Code2, Cpu, Sparkles, ArrowRight } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const { projects } = useData();
  const [selectedTech, setSelectedTech] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const filters = ['All', 'Full-Stack', 'Python', 'React', 'AI / ML', 'Flask'];

  const filteredProjects = selectedTech === 'All'
    ? projects
    : projects.filter(p => {
        const lower = selectedTech.toLowerCase();
        if (lower === 'full-stack') return p.technologies.some(t => ['Next.js', 'React', 'FastAPI', 'Flask'].includes(t));
        if (lower === 'ai / ml') return p.technologies.some(t => ['Python', 'SpeechRecognition', 'Whisper', 'Groq API'].includes(t));
        return p.technologies.some(t => t.toLowerCase().includes(lower));
      });

  return (
    <section id="projects" className="mb-16 scroll-mt-24">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Featured Projects</h2>
          <p className="text-slate-600 font-medium text-xs sm:text-sm mt-1">Full-stack web applications & AI voice evaluation platforms</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-1.5">
          {filters.map((tech) => (
            <button
              key={tech}
              onClick={() => setSelectedTech(tech)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                selectedTech === tech
                  ? 'bg-indigo-600 text-white font-extrabold shadow-kan3an-pill'
                  : 'bg-white border border-slate-200 text-slate-900 hover:text-indigo-600 hover:bg-slate-50'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project, index) => {
          const isAI = project.technologies.some(t => ['SpeechRecognition', 'Whisper', 'Groq API'].includes(t));
          const gradientClass = index % 2 === 0 ? 'kan3an-project-gradient-1' : 'kan3an-project-gradient-2';

          return (
            <div
              key={project.id}
              onClick={() => setActiveModalProject(project)}
              className={`${gradientClass} rounded-[28px] p-6 sm:p-8 relative overflow-hidden group cursor-pointer flex flex-col justify-between shadow-lg`}
            >
              <div>
                {/* Header Icon & Action Arrow */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                    {isAI ? <Cpu className="w-6 h-6" /> : <Code2 className="w-6 h-6" />}
                  </div>

                  <div className="w-10 h-10 rounded-full bg-white text-indigo-700 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-2xl font-extrabold text-white mb-1">
                  {project.title}
                </h3>
                {project.subtitle && (
                  <p className="text-xs font-mono text-indigo-100 font-bold mb-3">{project.subtitle}</p>
                )}

                {/* Description */}
                <p className="text-white text-xs sm:text-sm leading-relaxed line-clamp-3 mb-6 font-medium">
                  {project.description}
                </p>
              </div>

              <div>
                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-5 pt-4 border-t border-white/25">
                  {project.technologies.slice(0, 5).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-xl bg-white/20 backdrop-blur-md text-white text-[11px] font-mono font-bold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between text-xs text-white font-bold">
                  <span className="flex items-center gap-1 text-[11px]">
                    <Sparkles className="w-3.5 h-3.5" />
                    Click to view full architecture
                  </span>

                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-full bg-white/20 hover:bg-white text-white hover:text-indigo-700 transition-colors"
                        title="GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.demo_url && project.demo_url !== '#' && (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-full bg-white/20 hover:bg-white text-white hover:text-indigo-700 transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

              </div>

            </div>
          );
        })}
      </div>

      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
