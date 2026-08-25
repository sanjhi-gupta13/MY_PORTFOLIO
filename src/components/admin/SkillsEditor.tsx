import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Skill } from '../../types';
import { saveSkill, deleteSkillItem } from '../../lib/supabase';
import { Plus, Edit2, Trash2, Code2, X, Check } from 'lucide-react';

export const SkillsEditor: React.FC = () => {
  const { skills, refreshData, addToast } = useData();
  const [editingSkill, setEditingSkill] = useState<Partial<Skill> | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const categories = [
    'Languages',
    'Web & Frameworks',
    'Databases',
    'Libraries',
    'Tools & Cloud',
    'Core CS'
  ];

  const handleOpenNew = () => {
    setEditingSkill({
      name: '',
      category: 'Languages',
      level: 85,
      display_order: skills.length + 1
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill?.name) return;

    try {
      await saveSkill(editingSkill);
      await refreshData();
      addToast('Skill Saved', 'Skill updated successfully.', 'success');
      setEditingSkill(null);
    } catch (err) {
      addToast('Error', 'Failed to save skill.', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSkillItem(id);
      await refreshData();
      addToast('Skill Deleted', 'Skill removed from portfolio.', 'info');
      setIsDeleting(null);
    } catch (err) {
      addToast('Error', 'Failed to delete skill.', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-brand-pink" />
          Technical Skills Management
        </h3>

        <button
          onClick={handleOpenNew}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-purple text-white text-xs font-semibold hover:opacity-95 transition-all shadow-glow-purple"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill Item</span>
        </button>
      </div>

      {editingSkill && (
        <form onSubmit={handleSave} className="glass-card rounded-3xl p-6 border border-brand-purple/40 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-white text-sm">
              {editingSkill.id ? 'Edit Skill Item' : 'New Skill Item'}
            </h4>
            <button onClick={() => setEditingSkill(null)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Skill Name *</label>
              <input
                type="text"
                required
                value={editingSkill.name || ''}
                onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Category *</label>
              <select
                value={editingSkill.category || 'Languages'}
                onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm bg-dark-900 text-white"
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Proficiency Level ({editingSkill.level}%)</label>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={editingSkill.level || 85}
                onChange={(e) => setEditingSkill({ ...editingSkill, level: parseInt(e.target.value) })}
                className="w-full mt-2 accent-brand-purple"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setEditingSkill(null)}
              className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-xs font-semibold hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-brand-purple text-white text-xs font-semibold hover:opacity-90"
            >
              Save Skill
            </button>
          </div>
        </form>
      )}

      {/* Grid of skills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="glass-card rounded-2xl p-4 border border-white/10 flex items-center justify-between gap-3"
          >
            <div>
              <h4 className="font-bold text-white text-sm">{skill.name}</h4>
              <span className="text-[10px] text-brand-purple font-mono">{skill.category} ({skill.level}%)</span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setEditingSkill(skill)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-brand-purple/20 text-slate-300 hover:text-brand-purple"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>

              {isDeleting === skill.id ? (
                <div className="flex items-center gap-1">
                  <button onClick={() => handleDelete(skill.id)} className="p-1.5 rounded-lg bg-rose-500 text-white">
                    <Check className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => setIsDeleting(null)} className="p-1.5 rounded-lg bg-white/10 text-slate-300">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsDeleting(skill.id)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
