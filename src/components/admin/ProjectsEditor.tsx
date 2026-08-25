import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Project } from '../../types';
import { saveProject, deleteProjectItem, uploadPortfolioAsset } from '../../lib/supabase';
import { Plus, Edit2, Trash2, Briefcase, X, Check, Upload, ExternalLink } from 'lucide-react';

export const ProjectsEditor: React.FC = () => {
  const { projects, refreshData, addToast } = useData();
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [techInput, setTechInput] = useState('');
  const [bulletsInput, setBulletsInput] = useState('');
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleOpenNew = () => {
    setEditingProject({
      title: '',
      subtitle: '',
      description: '',
      bullet_points: [],
      technologies: [],
      github_url: '',
      demo_url: '',
      featured: true,
      display_order: projects.length + 1
    });
    setTechInput('');
    setBulletsInput('');
  };

  const handleOpenEdit = (proj: Project) => {
    setEditingProject({ ...proj });
    setTechInput(proj.technologies.join(', '));
    setBulletsInput(proj.bullet_points.join('\n'));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingProject) return;

    setUploadingImage(true);
    const path = `projects/${Date.now()}_${file.name}`;
    const url = await uploadPortfolioAsset(file, path);
    setUploadingImage(false);

    if (url) {
      setEditingProject({ ...editingProject, image_url: url });
      addToast('Image Uploaded', 'Project image uploaded to Supabase Storage!', 'success');
    } else {
      addToast('Upload Info', 'Storage upload fallback active. Enter direct image URL below if needed.', 'info');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title || !editingProject?.description) return;

    const techArray = techInput.split(',').map(t => t.trim()).filter(Boolean);
    const bulletArray = bulletsInput.split('\n').map(b => b.trim()).filter(Boolean);

    const payload = {
      ...editingProject,
      technologies: techArray,
      bullet_points: bulletArray
    };

    try {
      await saveProject(payload);
      await refreshData();
      addToast('Project Saved', 'Project details updated successfully.', 'success');
      setEditingProject(null);
    } catch (err) {
      addToast('Error', 'Failed to save project.', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProjectItem(id);
      await refreshData();
      addToast('Project Deleted', 'Project removed.', 'info');
      setIsDeleting(null);
    } catch (err) {
      addToast('Error', 'Failed to delete project.', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-brand-purple" />
          Projects Management
        </h3>

        <button
          onClick={handleOpenNew}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-purple text-white text-xs font-semibold hover:opacity-95 transition-all shadow-glow-purple"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Project</span>
        </button>
      </div>

      {editingProject && (
        <form onSubmit={handleSave} className="glass-card rounded-3xl p-6 border border-brand-purple/40 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-white text-sm">
              {editingProject.id ? 'Edit Project' : 'New Project'}
            </h4>
            <button onClick={() => setEditingProject(null)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Project Title *</label>
              <input
                type="text"
                required
                value={editingProject.title || ''}
                onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Subtitle / Category</label>
              <input
                type="text"
                placeholder="Full-Stack Civic Platform"
                value={editingProject.subtitle || ''}
                onChange={(e) => setEditingProject({ ...editingProject, subtitle: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Description *</label>
            <textarea
              rows={3}
              required
              value={editingProject.description || ''}
              onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
              Bullet Points Highlights (One per line)
            </label>
            <textarea
              rows={3}
              placeholder="Developed a full-stack civic platform...&#10;Built responsive frontend and backend services..."
              value={bulletsInput}
              onChange={(e) => setBulletsInput(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm resize-none font-sans"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
              Technologies Used (Comma-separated)
            </label>
            <input
              type="text"
              placeholder="Next.js, React, Tailwind CSS, FastAPI, SQLite"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm font-mono"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1">GitHub URL</label>
              <input
                type="url"
                value={editingProject.github_url || ''}
                onChange={(e) => setEditingProject({ ...editingProject, github_url: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Live Demo URL</label>
              <input
                type="text"
                value={editingProject.demo_url || ''}
                onChange={(e) => setEditingProject({ ...editingProject, demo_url: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Project Image (Upload to Supabase or URL)</label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="https://..."
                value={editingProject.image_url || ''}
                onChange={(e) => setEditingProject({ ...editingProject, image_url: e.target.value })}
                className="flex-1 px-4 py-2.5 rounded-xl glass-input text-sm"
              />
              <label className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer flex items-center gap-1.5 shrink-0">
                <Upload className="w-3.5 h-3.5" />
                <span>{uploadingImage ? 'Uploading...' : 'Upload'}</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="projFeatured"
              checked={editingProject.featured ?? true}
              onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
              className="w-4 h-4 accent-brand-purple rounded"
            />
            <label htmlFor="projFeatured" className="text-xs font-semibold text-slate-200 cursor-pointer">
              Mark as Featured Project on Portfolio
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setEditingProject(null)}
              className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-xs font-semibold hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-brand-purple text-white text-xs font-semibold hover:opacity-90"
            >
              Save Project
            </button>
          </div>
        </form>
      )}

      {/* List of projects */}
      <div className="space-y-4">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="glass-card rounded-2xl p-5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-bold text-white text-base">{proj.title}</h4>
                {proj.featured && (
                  <span className="px-2 py-0.5 rounded-full bg-brand-purple/20 text-brand-purple text-[10px] font-mono">
                    Featured
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed max-w-xl">{proj.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {proj.technologies.map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-white/5 text-slate-400 text-[10px] font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleOpenEdit(proj)}
                className="p-2 rounded-xl bg-white/5 hover:bg-brand-purple/20 text-slate-300 hover:text-brand-purple"
                title="Edit Project"
              >
                <Edit2 className="w-4 h-4" />
              </button>

              {isDeleting === proj.id ? (
                <div className="flex items-center gap-1">
                  <button onClick={() => handleDelete(proj.id)} className="p-2 rounded-xl bg-rose-500 text-white">
                    <Check className="w-4 h-4" />
                  </button>
                  <button onClick={() => setIsDeleting(null)} className="p-2 rounded-xl bg-white/10 text-slate-300">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsDeleting(proj.id)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400"
                  title="Delete Project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
