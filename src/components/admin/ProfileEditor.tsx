import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { updateProfile } from '../../lib/supabase';
import { Save, User, Mail, Phone, MapPin, Github, Linkedin, FileText, CheckCircle } from 'lucide-react';

export const ProfileEditor: React.FC = () => {
  const { profile, refreshData, addToast } = useData();
  const [form, setForm] = useState({ ...profile });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile(form);
      await refreshData();
      addToast('Profile Updated', 'Portfolio profile updated successfully!', 'success');
    } catch (err) {
      addToast('Error', 'Failed to update profile.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
        <User className="w-6 h-6 text-brand-purple" />
        <div>
          <h3 className="text-xl font-bold text-white">Edit Profile & Portfolio Info</h3>
          <p className="text-xs text-slate-400">Update personal, contact, and positioning details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              required
              value={form.name || ''}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl glass-input text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
              Professional Positioning Title
            </label>
            <input
              type="text"
              required
              value={form.title || ''}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-3 rounded-xl glass-input text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
            Professional Summary / Bio
          </label>
          <textarea
            rows={3}
            required
            value={form.bio || ''}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            className="w-full px-4 py-3 rounded-xl glass-input text-sm resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">Email</label>
            <input
              type="email"
              required
              value={form.email || ''}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl glass-input text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">Phone</label>
            <input
              type="text"
              value={form.phone || ''}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl glass-input text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">Location</label>
            <input
              type="text"
              value={form.location || ''}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full px-4 py-3 rounded-xl glass-input text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">GitHub URL</label>
            <input
              type="url"
              value={form.github_url || ''}
              onChange={(e) => setForm({ ...form, github_url: e.target.value })}
              className="w-full px-4 py-3 rounded-xl glass-input text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">LinkedIn URL</label>
            <input
              type="url"
              value={form.linkedin_url || ''}
              onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })}
              className="w-full px-4 py-3 rounded-xl glass-input text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">Resume Link / URL</label>
            <input
              type="text"
              value={form.resume_url || ''}
              onChange={(e) => setForm({ ...form, resume_url: e.target.value })}
              className="w-full px-4 py-3 rounded-xl glass-input text-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <input
            type="checkbox"
            id="availableToggle"
            checked={form.is_available}
            onChange={(e) => setForm({ ...form, is_available: e.target.checked })}
            className="w-4 h-4 accent-brand-purple rounded"
          />
          <label htmlFor="availableToggle" className="text-xs font-semibold text-slate-200 cursor-pointer">
            Mark as Available for Work / Internships
          </label>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-purple text-white font-semibold text-sm hover:opacity-95 transition-all shadow-glow-purple disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Profile Changes'}</span>
        </button>
      </form>
    </div>
  );
};
