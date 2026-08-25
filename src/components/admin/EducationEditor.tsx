import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Education } from '../../types';
import { saveEducation, deleteEducationItem } from '../../lib/supabase';
import { Plus, Edit2, Trash2, GraduationCap, X, Check } from 'lucide-react';

export const EducationEditor: React.FC = () => {
  const { education, refreshData, addToast } = useData();
  const [editingItem, setEditingItem] = useState<Partial<Education> | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleOpenNew = () => {
    setEditingItem({
      degree: '',
      institution: '',
      duration: '',
      cgpa_percentage: '',
      details: '',
      display_order: education.length + 1
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.degree || !editingItem?.institution) return;

    try {
      await saveEducation(editingItem);
      await refreshData();
      addToast('Education Saved', 'Education item updated successfully.', 'success');
      setEditingItem(null);
    } catch (err) {
      addToast('Error', 'Failed to save education record.', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteEducationItem(id);
      await refreshData();
      addToast('Deleted', 'Education record deleted.', 'info');
      setIsDeleting(null);
    } catch (err) {
      addToast('Error', 'Failed to delete record.', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-brand-cyan" />
          Education Records
        </h3>

        <button
          onClick={handleOpenNew}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-purple text-white text-xs font-semibold hover:opacity-95 transition-all shadow-glow-purple"
        >
          <Plus className="w-4 h-4" />
          <span>Add Education Record</span>
        </button>
      </div>

      {/* Editor Modal / Form */}
      {editingItem && (
        <form onSubmit={handleSave} className="glass-card rounded-3xl p-6 border border-brand-purple/40 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-white text-sm">
              {editingItem.id ? 'Edit Education Record' : 'New Education Record'}
            </h4>
            <button onClick={() => setEditingItem(null)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Degree / Qualification *</label>
              <input
                type="text"
                required
                value={editingItem.degree || ''}
                onChange={(e) => setEditingItem({ ...editingItem, degree: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Institution *</label>
              <input
                type="text"
                required
                value={editingItem.institution || ''}
                onChange={(e) => setEditingItem({ ...editingItem, institution: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Duration</label>
              <input
                type="text"
                placeholder="2025 – 2029"
                value={editingItem.duration || ''}
                onChange={(e) => setEditingItem({ ...editingItem, duration: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1">CGPA / Percentage</label>
              <input
                type="text"
                placeholder="CGPA: 8.35/10"
                value={editingItem.cgpa_percentage || ''}
                onChange={(e) => setEditingItem({ ...editingItem, cgpa_percentage: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Details / Highlights</label>
            <textarea
              rows={2}
              value={editingItem.details || ''}
              onChange={(e) => setEditingItem({ ...editingItem, details: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-xs font-semibold hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-brand-purple text-white text-xs font-semibold hover:opacity-90"
            >
              Save Record
            </button>
          </div>
        </form>
      )}

      {/* List */}
      <div className="space-y-3">
        {education.map((edu) => (
          <div
            key={edu.id}
            className="glass-card rounded-2xl p-5 border border-white/10 flex items-center justify-between gap-4"
          >
            <div>
              <h4 className="font-bold text-white text-sm">{edu.degree}</h4>
              <p className="text-xs text-brand-purple font-medium">{edu.institution}</p>
              <p className="text-[11px] text-slate-400 mt-1 font-mono">{edu.duration} | {edu.cgpa_percentage}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setEditingItem(edu)}
                className="p-2 rounded-xl bg-white/5 hover:bg-brand-purple/20 text-slate-300 hover:text-brand-purple transition-colors"
                title="Edit"
              >
                <Edit2 className="w-4 h-4" />
              </button>

              {isDeleting === edu.id ? (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleDelete(edu.id)}
                    className="p-2 rounded-xl bg-rose-500 text-white"
                    title="Confirm Delete"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsDeleting(null)}
                    className="p-2 rounded-xl bg-white/10 text-slate-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsDeleting(edu.id)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 transition-colors"
                  title="Delete"
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
