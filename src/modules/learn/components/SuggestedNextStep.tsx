import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';
import { Tile, Badge, Button } from '../../../components/ui';

export const SuggestedNextStep: React.FC = () => {
  return (
    <Tile accent="acid" shadow="ox" className="p-6 sm:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#171717] uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-[var(--ox)]" />
            <span>Priority Studio Brief</span>
          </div>
          <span className="font-mono text-[10px] uppercase font-bold px-1.5 py-0.5 bg-[#171717] text-[#D9E638]">
            Urgent Dispatch
          </span>
        </div>

        <div>
          <h3 className="font-display font-extrabold text-2xl text-[#171717] leading-tight">
            Draft the Brand Manifesto for Offscript Press
          </h3>
          <p className="text-xs sm:text-sm text-[#171717] opacity-90 mt-2 leading-relaxed font-sans">
            Real prompt with firm constraints. Write a 3-part positioning statement and design an accompanying typography specimen.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
          <Badge variant="default" className="bg-[#171717] text-[#F1EBDD] border-0 text-[10px] uppercase">
            Unlocks 3 Skills
          </Badge>
          <Badge variant="default" className="bg-[#171717] text-[#F1EBDD] border-0 text-[10px] uppercase">
            Spawns Project
          </Badge>
        </div>
      </div>

      <div className="pt-4 border-t-2 border-[#171717] flex items-center justify-between">
        <div className="flex items-center gap-1 font-mono text-xs text-[#171717] font-bold">
          <Sparkles className="w-3.5 h-3.5 text-[var(--ox)]" />
          <span>Est. 45 min</span>
        </div>
        <Link to="/learn/briefs/brief-01">
          <Button variant="primary" size="sm" className="bg-[#171717] text-[#F1EBDD] hover:bg-[#171717]/90 text-xs shadow-hard-sm">
            <span>Execute Brief</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        </Link>
      </div>
    </Tile>
  );
};

export default SuggestedNextStep;
