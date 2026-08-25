import React from 'react';
import { Project } from '../../types';
import { X, ExternalLink, Github, CheckCircle2, Layers, Tag } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="kan3an-card w-full max-w-2xl rounded-[32px] p-6 sm:p-8 border border-slate-200 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition-all"
        >
          <X className="w-5 h-5 text-indigo-600" />
        </button>

        {/* Header */}
        <div className="pr-12 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            Project Architecture
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{project.title}</h3>
          {project.subtitle && (
            <p className="text-indigo-600 text-xs font-mono font-bold mt-1">{project.subtitle}</p>
          )}
        </div>

        {/* Description */}
        <div className="mb-6">
          <h4 className="text-[11px] font-mono uppercase text-slate-700 font-bold mb-2">Overview</h4>
          <p className="text-slate-800 text-sm leading-relaxed font-normal">{project.description}</p>
        </div>

        {/* Key Bullet Points */}
        {project.bullet_points && project.bullet_points.length > 0 && (
          <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
            <h4 className="text-[11px] font-mono uppercase text-slate-700 font-bold mb-2">Key Accomplishments</h4>
            {project.bullet_points.map((pt, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{pt}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tech Badges */}
        <div className="mb-8">
          <h4 className="text-[11px] font-mono uppercase text-slate-700 font-bold mb-3 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-indigo-600" />
            Technologies Implemented
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-mono font-bold"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center gap-4 pt-4 border-t border-slate-200">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold transition-all shadow-sm"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Repository</span>
            </a>
          )}

          {project.demo_url && project.demo_url !== '#' && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noreferrer"
              className="kan3an-pill-btn text-xs py-2 px-5"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demo</span>
            </a>
          )}
        </div>

      </div>
    </div>
  );
};
