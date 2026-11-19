import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Tile, Badge, Button } from '../../../components/ui';

export const SuggestedNextStep: React.FC = () => {
  return (
    <Tile accent="acid" shadow="ox" className="p-6 flex flex-col justify-between space-y-5">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#171717] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[var(--ox)]" />
            <span>Suggested Next Step</span>
          </div>
          <span className="font-mono text-xs text-[#171717] font-bold">Priority Brief</span>
        </div>

        <div>
          <h3 className="font-display font-extrabold text-2xl text-[#171717] leading-snug">
            Draft the Brand Manifesto for Offscript Press
          </h3>
          <p className="text-sm text-[#171717] opacity-90 mt-1 leading-relaxed">
            Real prompt with deadline. Write a 3-part positioning statement and design an accompanying typography sample.
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1">
          <Badge variant="default" className="bg-[#171717] text-[#F1EBDD]">Unlocks 3 Skills</Badge>
          <Badge variant="default" className="bg-[#171717] text-[#F1EBDD]">Opens in Create</Badge>
        </div>
      </div>

      <div className="pt-3 border-t border-[#171717]/20 flex items-center justify-between">
        <span className="font-mono text-xs text-[#171717] opacity-75">Est. time: 45 min</span>
        <Link to="/learn/briefs/brief-01">
          <Button variant="primary" size="sm" className="bg-[#171717] text-[#F1EBDD]">
            <span>Open Brief</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        </Link>
      </div>
    </Tile>
  );
};

export default SuggestedNextStep;

