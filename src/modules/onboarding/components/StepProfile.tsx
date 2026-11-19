import React from 'react';
import { Input } from '../../../components/ui';

interface StepProfileProps {
  name: string;
  handle: string;
  bio: string;
  onChange: (field: 'name' | 'handle' | 'bio', value: string) => void;
}

export const StepProfile: React.FC<StepProfileProps> = ({
  name,
  handle,
  bio,
  onChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="font-display font-extrabold text-2xl text-[var(--ink)]">
          Introduce yourself
        </h2>
        <p className="text-sm opacity-80 font-sans">
          This establishes your creator profile and sets up your master workspace record.
        </p>
      </div>

      <div className="space-y-4">
        <Input
          label="Full Name or Creative Alias"
          placeholder="e.g. Maya Chen"
          value={name}
          onChange={(e) => onChange('name', e.target.value)}
          required
          autoFocus
        />

        <Input
          label="Creator Handle"
          placeholder="e.g. mayachen"
          value={handle}
          onChange={(e) => {
            const sanitized = e.target.value.replace(/[^a-zA-Z0-9_-]/g, '').toLowerCase();
            onChange('handle', sanitized);
          }}
          prefixElement={<span className="font-mono text-xs font-bold">@</span>}
          hint="Unique handle for activity ledgers and shared records"
          required
        />

        <div className="space-y-1.5 font-sans">
          <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
            One-Line Bio or Manifesto
          </label>
          <textarea
            rows={3}
            placeholder="e.g. Independent art director making zines and high-contrast digital identities."
            value={bio}
            onChange={(e) => onChange('bio', e.target.value)}
            className="w-full border-2 border-[var(--line)] bg-[var(--card-bg)] text-[var(--ink)] font-sans text-sm p-3 placeholder:text-[var(--ink)]/40 focus:outline-2 focus:outline-[var(--ox)] focus:outline-offset-1 resize-none"
          />
          <p className="font-mono text-xs text-[var(--ink)] opacity-70">
            Tell the ecosystem what you make or want to make.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StepProfile;

