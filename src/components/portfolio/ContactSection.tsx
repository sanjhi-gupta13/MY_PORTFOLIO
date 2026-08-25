import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { sendContactMessage } from '../../lib/supabase';
import { Mail, Send, CheckCircle2, Phone, MapPin } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { profile, addToast } = useData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      addToast('Validation Error', 'Please fill in name, email, and message.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await sendContactMessage(formData);
      setSubmittedSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      addToast('Message Sent', 'Thank you! Your message was saved to the database.', 'success');
      setTimeout(() => setSubmittedSuccess(false), 5000);
    } catch {
      addToast('Error', 'Failed to send message.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="mb-16 scroll-mt-24">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold font-mono mb-2">
          <Mail className="w-3.5 h-3.5 text-indigo-600" />
          <span>GET IN TOUCH</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Contact Me</h2>
        <p className="text-slate-700 font-semibold text-xs sm:text-sm mt-1">Get in touch for internships, projects, or collaborations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Contact Info Card */}
        <div className="lg:col-span-5 kan3an-card rounded-[28px] p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-6">
              <Mail className="w-6 h-6" />
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900 mb-3">Let's Work Together!</h3>
            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
              I am open to full-time internships, hackathons, and software engineering opportunities. Send me a message!
            </p>
          </div>

          <div className="space-y-4 pt-6 border-t border-slate-200 text-xs text-slate-900">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-slate-600 uppercase font-mono font-bold">Email</p>
                <a href={`mailto:${profile.email}`} className="font-bold hover:text-indigo-600 transition-colors">
                  {profile.email || 'sanjhigupta2023@gmail.com'}
                </a>
              </div>
            </div>

            {profile.phone && (
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-600 uppercase font-mono font-bold">Phone</p>
                  <p className="font-bold">{profile.phone}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-slate-600 uppercase font-mono font-bold">Location</p>
                <p className="font-bold">{profile.location || 'GLA University, Mathura'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Card */}
        <div className="lg:col-span-7 kan3an-card rounded-[28px] p-6 sm:p-8">
          {submittedSuccess ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">Message Sent Successfully!</h4>
              <p className="text-slate-700 text-xs sm:text-sm max-w-md mx-auto">
                Thank you for reaching out. Your message has been saved to the database.
              </p>
              <button
                onClick={() => setSubmittedSuccess(false)}
                className="px-5 py-2.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold hover:bg-indigo-100 transition-all"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-900 font-bold mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl glass-input text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-900 font-bold mb-1.5">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl glass-input text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-900 font-bold mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Project Opportunity / Internship"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl glass-input text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-900 font-bold mb-1.5">
                  Message *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Hello Sanjhi, I saw your developer portfolio and..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl glass-input text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="kan3an-pill-btn w-full justify-center text-sm py-3.5 shadow-kan3an-pill disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Transmitting...
                  </span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
