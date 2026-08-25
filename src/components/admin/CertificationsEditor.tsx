import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Certification } from '../../types';
import { saveCertification, deleteCertificationItem } from '../../lib/supabase';
import { Plus, Edit2, Trash2, Award, X, Check } from 'lucide-react';

export const CertificationsEditor: React.FC = () => {
  const { certifications, refreshData, addToast } = useData();
  const [editingCert, setEditingCert] = useState<Partial<Certification> | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleOpenNew = () => {
    setEditingCert({
      title: '',
      issuer: '',
      issue_date: 'Verified',
      credential_url: '',
      display_order: certifications.length + 1
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert?.title || !editingCert?.issuer) return;

    try {
      await saveCertification(editingCert);
      await refreshData();
      addToast('Certification Saved', 'Certification updated.', 'success');
      setEditingCert(null);
    } catch (err) {
      addToast('Error', 'Failed to save certification.', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCertificationItem(id);
      await refreshData();
      addToast('Certification Deleted', 'Certification removed.', 'info');
      setIsDeleting(null);
    } catch (err) {
      addToast('Error', 'Failed to delete certification.', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-brand-indigo" />
          Certifications Management
        </h3>

        <button
          onClick={handleOpenNew}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-purple text-white text-xs font-semibold hover:opacity-95 transition-all shadow-glow-purple"
        >
          <Plus className="w-4 h-4" />
          <span>Add Certification</span>
        </button>
      </div>

      {editingCert && (
        <form onSubmit={handleSave} className="glass-card rounded-3xl p-6 border border-brand-purple/40 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-white text-sm">
              {editingCert.id ? 'Edit Certification' : 'New Certification'}
            </h4>
            <button onClick={() => setEditingCert(null)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Certification Title *</label>
              <input
                type="text"
                required
                value={editingCert.title || ''}
                onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Issuer / Organization *</label>
              <input
                type="text"
                required
                value={editingCert.issuer || ''}
                onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Date / Status</label>
              <input
                type="text"
                placeholder="Verified / 2026"
                value={editingCert.issue_date || ''}
                onChange={(e) => setEditingCert({ ...editingCert, issue_date: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Credential URL</label>
              <input
                type="url"
                placeholder="https://..."
                value={editingCert.credential_url || ''}
                onChange={(e) => setEditingCert({ ...editingCert, credential_url: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setEditingCert(null)}
              className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-xs font-semibold hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-brand-purple text-white text-xs font-semibold hover:opacity-90"
            >
              Save Certification
            </button>
          </div>
        </form>
      )}

      {/* Grid of Certs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="glass-card rounded-2xl p-4 border border-white/10 flex items-center justify-between gap-3"
          >
            <div>
              <h4 className="font-bold text-white text-sm leading-snug">{cert.title}</h4>
              <p className="text-xs text-brand-indigo font-medium mt-0.5">{cert.issuer}</p>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => setEditingCert(cert)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-brand-purple/20 text-slate-300 hover:text-brand-purple"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>

              {isDeleting === cert.id ? (
                <div className="flex items-center gap-1">
                  <button onClick={() => handleDelete(cert.id)} className="p-1.5 rounded-lg bg-rose-500 text-white">
                    <Check className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => setIsDeleting(null)} className="p-1.5 rounded-lg bg-white/10 text-slate-300">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsDeleting(cert.id)}
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
