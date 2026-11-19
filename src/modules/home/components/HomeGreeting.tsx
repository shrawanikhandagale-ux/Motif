import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { Button } from '../../../components/ui';
import { Profile } from '../../../types';

interface HomeGreetingProps {
  profile: Profile | null;
  onOpenCustomise: () => void;
}

export const HomeGreeting: React.FC<HomeGreetingProps> = ({
  profile,
  onOpenCustomise,
}) => {
  const getGreetingTime = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const name = profile?.name || 'Creator';
  const handle = profile?.handle ? `@${profile.handle}` : '@studio';

  return (
    <div className="border-b-2 border-[var(--line)] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="font-mono text-xs text-[var(--ox)] uppercase font-bold tracking-wider">
            Workspace Hub · {handle}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--acid)] border border-[var(--line)]" />
          <span className="font-mono text-[11px] opacity-75">Studio 01</span>
        </div>

        <h1 className="font-display font-extrabold text-4xl sm:text-6xl tracking-tight text-[var(--ink)] leading-none">
          {getGreetingTime()},{' '}
          <span className="text-[var(--ox)] inline-block transform -rotate-1 origin-left">
            {name}.
          </span>
        </h1>

        <p className="font-sans text-sm sm:text-base text-[var(--ink)] opacity-85 mt-2 max-w-2xl">
          {profile?.bio ||
            'One interconnected operating system across five departments. Zero retyping.'}
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <Button
          variant="secondary"
          size="sm"
          onClick={onOpenCustomise}
          className="font-mono text-xs uppercase"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 mr-1.5" />
          <span>Customise Tiles</span>
        </Button>
      </div>
    </div>
  );
};

export default HomeGreeting;
