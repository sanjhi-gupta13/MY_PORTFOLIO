import React from 'react';
import { useData } from '../../context/DataContext';
import { Award, ShieldCheck, ExternalLink } from 'lucide-react';

export const CertificationsSection: React.FC = () => {
  const { certifications } = useData();

  return (
    <section id="certifications" className="mb-16 scroll-mt-24">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold font-mono mb-2">
          <Award className="w-3.5 h-3.5 text-indigo-600" />
          <span>VERIFIED CREDENTIALS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Certifications & Credentials</h2>
        <p className="text-slate-700 font-semibold text-xs sm:text-sm mt-1">Industry certifications & academic workshop credentials</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="p-6 rounded-[24px] kan3an-card flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
                  <Award className="w-5 h-5" />
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-mono font-bold">
                  <ShieldCheck className="w-3 h-3" />
                  {cert.issue_date || 'Verified'}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-sm leading-snug mb-1">
                {cert.title}
              </h3>
              <p className="text-xs font-bold text-indigo-600 mb-3">{cert.issuer}</p>
            </div>

            {cert.credential_url ? (
              <a
                href={cert.credential_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-slate-700 font-semibold hover:text-indigo-600 transition-colors pt-3 border-t border-slate-200"
              >
                <span>View Credential</span>
                <ExternalLink className="w-3.5 h-3.5 text-indigo-600" />
              </a>
            ) : (
              <div className="text-[11px] text-slate-600 pt-3 border-t border-slate-200 font-mono font-semibold">
                Official Credential Verified
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
