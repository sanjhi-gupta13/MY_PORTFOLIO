import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Activity } from '../../types';
import { saveActivity, deleteActivityItem } from '../../lib/supabase';
import { Plus, Edit2, Trash2, Trophy, X, Check } from 'lucide-react';

export const ActivitiesEditor: React.FC = () => {
  const { activities, refreshData, addToast } = useData();
  const [editingAct, setEditingAct] = useState<Partial<Activity> | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleOpenNew = () => {
    setEditingAct({
      title: '',
      role: 'Participant',
      organizer: '',
      details: '',
      date_period: '2026',
      display_order: activities.length + 1
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAct?.title) return;

    try {
      await saveActivity(editingAct);
      await refreshData();
      addToast('Activity Saved', 'Hackathon / Activity updated.', 'success');
      setEditingAct(null);
    } catch (err) {
      addToast('Error', 'Failed to save activity.', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteActivityItem(id);
      await refreshData();
      addToast('Activity Deleted', 'Record removed.', 'info');
      setIsDeleting(null);
    } catch (err) {
      addToast('Error', 'Failed to delete activity.', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-400" />
          Hackathons & Activities Management
        </h3>

        <button
          onClick={handleOpenNew}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-purple text-white text-xs font-semibold hover:opacity-95 transition-all shadow-glow-purple"
        >
          <Plus className="w-4 h-4" />
          <span>Add Activity / Event</span>
        </button>
      </div>

      {editingAct && (
        <form onSubmit={handleSave} className="glass-card rounded-3xl p-6 border border-brand-purple/40 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-white text-sm">
              {editingAct.id ? 'Edit Activity' : 'New Activity / Event'}
            </h4>
            <button onClick={() => setEditingAct(null)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Event / Activity Title *</label>
              <input
                type="text"
                required
                value={editingAct.title || ''}
                onChange={(e) => setEditingAct({ ...editingAct, title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Role</label>
              <input
                type="text"
                value={editingAct.role || ''}
                onChange={(e) => setEditingAct({ ...editingAct, role: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Organizer / Institution</label>
              <input
                type="text"
                placeholder="IIT BHU / Devengers"
                value={editingAct.organizer || ''}
                onChange={(e) => setEditingAct({ ...editingAct, organizer: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Date / Event Period</label>
              <input
                type="text"
                placeholder="TECHNEX26 / 2026"
                value={editingAct.date_period || ''}
                onChange={(e) => setEditingAct({ ...editingAct, date_period: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Description / Highlights</label>
            <textarea
              rows={2}
              value={editingAct.details || ''}
              onChange={(e) => setEditingAct({ ...editingAct, details: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setEditingAct(null)}
              className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-xs font-semibold hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-brand-purple text-white text-xs font-semibold hover:opacity-90"
            >
              Save Activity
            </button>
          </div>
        </form>
      )}

      {/* List */}
      <div className="space-y-3">
        {activities.map((act) => (
          <div
            key={act.id}
            className="glass-card rounded-2xl p-5 border border-white/10 flex items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[10px] font-semibold">
                  {act.role}
                </span>
                <span className="text-xs text-slate-400 font-mono">{act.organizer}</span>
              </div>
              <h4 className="font-bold text-white text-sm">{act.title}</h4>
              {act.details && <p className="text-xs text-slate-300 mt-1 max-w-xl">{act.details}</p>}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setEditingAct(act)}
                className="p-2 rounded-xl bg-white/5 hover:bg-brand-purple/20 text-slate-300 hover:text-brand-purple"
              >
                <Edit2 className="w-4 h-4" />
              </button>

              {isDeleting === act.id ? (
                <div className="flex items-center gap-1">
                  <button onClick={() => handleDelete(act.id)} className="p-2 rounded-xl bg-rose-500 text-white">
                    <Check className="w-4 h-4" />
                  </button>
                  <button onClick={() => setIsDeleting(null)} className="p-2 rounded-xl bg-white/10 text-slate-300">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsDeleting(act.id)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400"
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
