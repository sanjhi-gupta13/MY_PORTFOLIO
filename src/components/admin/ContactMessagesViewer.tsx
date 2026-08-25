import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { toggleMessageReadStatus, deleteMessage } from '../../lib/supabase';
import { Mail, CheckCircle2, Trash2, Eye, EyeOff, X, Check } from 'lucide-react';

export const ContactMessagesViewer: React.FC = () => {
  const { messages, refreshData, addToast } = useData();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const filteredMessages = filter === 'all'
    ? messages
    : messages.filter(m => !m.is_read);

  const handleToggleRead = async (id: string, currentRead: boolean) => {
    try {
      await toggleMessageReadStatus(id, currentRead);
      await refreshData();
      addToast('Status Updated', currentRead ? 'Marked as unread' : 'Marked as read', 'info');
    } catch {
      addToast('Error', 'Failed to update status', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMessage(id);
      await refreshData();
      addToast('Message Deleted', 'Removed from database.', 'info');
      setIsDeleting(null);
    } catch {
      addToast('Error', 'Failed to delete message.', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Mail className="w-5 h-5 text-emerald-400" />
          Contact Form Messages
        </h3>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
              filter === 'all' ? 'bg-brand-purple text-white' : 'bg-white/5 text-slate-400'
            }`}
          >
            All ({messages.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
              filter === 'unread' ? 'bg-brand-purple text-white' : 'bg-white/5 text-slate-400'
            }`}
          >
            Unread ({messages.filter(m => !m.is_read).length})
          </button>
        </div>
      </div>

      {filteredMessages.length === 0 ? (
        <div className="glass-card rounded-3xl p-12 text-center text-slate-400">
          <Mail className="w-10 h-10 mx-auto mb-3 text-slate-500 opacity-50" />
          <p className="text-sm font-medium">No messages found in this category.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMessages.map((msg) => (
            <div
              key={msg.id}
              className={`glass-card rounded-2xl p-6 border transition-all ${
                !msg.is_read ? 'border-brand-purple/50 bg-brand-purple/5' : 'border-white/10'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-white text-base">{msg.name}</h4>
                    {!msg.is_read && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                        NEW
                      </span>
                    )}
                  </div>
                  <a href={`mailto:${msg.email}`} className="text-xs text-brand-cyan hover:underline">
                    {msg.email}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono text-slate-400">
                    {new Date(msg.created_at).toLocaleDateString()} {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>

                  <button
                    onClick={() => handleToggleRead(msg.id, msg.is_read)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-brand-purple/20 text-slate-300 hover:text-brand-purple"
                    title={msg.is_read ? 'Mark Unread' : 'Mark Read'}
                  >
                    {msg.is_read ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4 text-emerald-400" />}
                  </button>

                  {isDeleting === msg.id ? (
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleDelete(msg.id)} className="p-1.5 rounded-lg bg-rose-500 text-white">
                        <Check className="w-4 h-4" />
                      </button>
                      <button onClick={() => setIsDeleting(null)} className="p-1.5 rounded-lg bg-white/10 text-slate-300">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsDeleting(msg.id)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {msg.subject && (
                <p className="text-xs font-mono text-brand-purple font-semibold mb-2">Subject: {msg.subject}</p>
              )}

              <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
