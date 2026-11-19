import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Tile, Badge } from '../../../components/ui';

export const SkillMapTile: React.FC = () => {
  const skills = [
    { name: 'Brutal Typography', progress: 100, level: 'Mastered' },
    { name: 'Tactile Color Theory', progress: 85, level: 'Proficient' },
    { name: 'Manifesto Copywriting', progress: 60, level: 'Practicing' },
    { name: 'Organic Drop Tactics', progress: 25, level: 'Queued' },
  ];

  return (
    <Tile accent="electric" shadow="default" className="p-5 flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant="default" className="bg-[#171717] text-[#F1EBDD]">Skill Map Preview</Badge>
          <span className="font-mono text-xs text-[#171717] font-bold">4 Active</span>
        </div>
        <h3 className="font-display font-bold text-xl text-[#171717]">Creative Competency</h3>

        <div className="space-y-3 pt-1">
          {skills.map((skill) => (
            <div key={skill.name} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-mono text-[#171717]">
                <span className="font-bold">{skill.name}</span>
                <span className="opacity-80 font-medium">{skill.level}</span>
              </div>
              <div className="h-2 w-full bg-[#171717]/20 border border-[#171717] overflow-hidden">
                <div
                  className="h-full bg-[var(--ox)]"
                  style={{ width: `${skill.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2 border-t border-[#171717]/20 flex items-center justify-between text-xs font-mono text-[#171717]">
        <span className="opacity-75">Updated by Learn progress</span>
        <Link to="/learn" className="font-bold hover:underline inline-flex items-center gap-1 text-[#171717]">
          <span>Full Skill Map</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </Tile>
  );
};

export default SkillMapTile;

