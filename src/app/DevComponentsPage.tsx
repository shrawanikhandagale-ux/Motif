import React, { useState } from 'react';
import {
  Button,
  Tile,
  Chip,
  TabBar,
  Input,
  ProgressBar,
  Sticker,
  SectionHeading,
} from '../components/ui';
import { Search, Mail } from 'lucide-react';

const SAMPLE_TABS = [
  { id: 'learn', label: 'Learn', subtitle: 'the academy' },
  { id: 'create', label: 'Create', subtitle: 'the studio' },
  { id: 'market', label: 'Market', subtitle: 'the hub' },
];

export const DevComponentsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [chipSelected, setChipSelected] = useState('Branding');
  const [progress, setProgress] = useState(65);
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] p-4 sm:p-8 space-y-10 max-w-7xl mx-auto">
      <SectionHeading
        as="h1"
        kicker="Design System · UI Primitives"
        title="Component"
        skewWord="specimen."
        description="Typed, accessible base components adhering to the 2px ink border, hard offset shadow, and editorial typography system."
        borderBottom
        action={
          <div className="flex gap-2">
            <Button variant="primary" size="sm">Primary</Button>
            <Button variant="ghost" size="sm">Ghost</Button>
          </div>
        }
      />

      {/* 01. Buttons */}
      <section className="space-y-3">
        <h3 className="font-display font-extrabold text-2xl">01. Buttons</h3>
        <div className="flex flex-wrap items-center gap-3 p-4 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="acid">Acid</Button>
          <Button variant="oxblood">Oxblood</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
      </section>

      {/* 02. Tiles */}
      <section className="space-y-3">
        <h3 className="font-display font-extrabold text-2xl">02. Tiles (Accent &amp; Tilt)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Tile accent="none" tilt="none" interactive>
            <h4 className="font-display font-bold text-lg">Default Tile</h4>
            <p className="text-xs opacity-80 mt-1">Flat card background with 4px hard offset shadow.</p>
          </Tile>
          <Tile accent="acid" tilt="cw" shadow="ox" interactive>
            <h4 className="font-display font-bold text-lg">Acid + CW</h4>
            <p className="text-xs opacity-80 mt-1">Tilted +2deg with oxblood hard shadow.</p>
          </Tile>
          <Tile accent="oxblood" tilt="ccw" interactive>
            <h4 className="font-display font-bold text-lg">Oxblood + CCW</h4>
            <p className="text-xs opacity-80 mt-1">Tilted -2deg with high contrast ink border.</p>
          </Tile>
          <Tile accent="electric" tilt="slight-cw" interactive>
            <h4 className="font-display font-bold text-lg">Electric Accent</h4>
            <p className="text-xs opacity-80 mt-1">Tactile editorial contrast with hover elevation.</p>
          </Tile>
        </div>
      </section>

      {/* 03. TabBar */}
      <section className="space-y-3">
        <h3 className="font-display font-extrabold text-2xl">03. TabBar</h3>
        <TabBar tabs={SAMPLE_TABS} activeTabId={activeTab} onChange={setActiveTab} />
      </section>

      {/* 04. Chips */}
      <section className="space-y-3">
        <h3 className="font-display font-extrabold text-2xl">04. Chip</h3>
        <div className="flex flex-wrap items-center gap-3 p-4 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard">
          {['Branding', 'Editorial', 'UI/UX'].map((tag) => (
            <Chip key={tag} clickable selected={chipSelected === tag} onClick={() => setChipSelected(tag)}>
              {tag}
            </Chip>
          ))}
          <Chip variant="acid">Acid</Chip>
          <Chip variant="oxblood" onRemove={() => {}}>Removable</Chip>
          <Chip variant="electric">Electric</Chip>
        </div>
      </section>

      {/* 05. Input */}
      <section className="space-y-3">
        <h3 className="font-display font-extrabold text-2xl">05. Input</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Project Title"
            placeholder="e.g. Issue Zero Zine"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            hint="Input labels render in DM Mono"
          />
          <Input label="Search Records" placeholder="Filter projects…" prefixElement={<Search className="w-4 h-4" />} />
          <Input label="Email" defaultValue="err" error="Invalid format" prefixElement={<Mail className="w-4 h-4" />} />
        </div>
      </section>

      {/* 06. ProgressBar (Halftone) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-extrabold text-2xl">06. Halftone ProgressBar</h3>
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" onClick={() => setProgress((p) => Math.max(0, p - 10))}>-10%</Button>
            <Button size="sm" variant="secondary" onClick={() => setProgress((p) => Math.min(100, p + 10))}>+10%</Button>
          </div>
        </div>
        <div className="space-y-3 p-4 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard">
          <ProgressBar value={progress} label="Curriculum Completion (Oxblood)" showValue variant="oxblood" size="md" />
          <ProgressBar value={progress + 15} label="Campaign Velocity (Acid)" showValue variant="acid" size="lg" />
          <ProgressBar value={progress - 20} label="Asset Storage (Electric)" showValue variant="electric" size="sm" />
        </div>
      </section>

      {/* 07. Sticker */}
      <section className="space-y-3 pb-8">
        <h3 className="font-display font-extrabold text-2xl">07. Sticker</h3>
        <div className="p-6 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard-lg flex flex-wrap items-center gap-5">
          <Sticker variant="acid" rotation="cw" interactive>Idea in. Real thing out.</Sticker>
          <Sticker variant="oxblood" rotation="ccw" interactive>hands off to Create →</Sticker>
          <Sticker variant="electric" rotation="cw" interactive>Offscript OS</Sticker>
          <Sticker variant="ivory" rotation="flat" interactive>2px Ink Borders</Sticker>
        </div>
      </section>
    </div>
  );
};

export default DevComponentsPage;
