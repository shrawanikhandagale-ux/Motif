import React from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { Tile, ProgressBar, Button, Badge } from '../../../components/ui';

export const ContinueLearningTile: React.FC = () => {
  return (
    <Tile accent="none" shadow="default" className="p-6 flex flex-col justify-between space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="oxblood">Continue Learning</Badge>
          <span className="font-mono text-xs opacity-75">Path 01 · Branding</span>
        </div>

        <div>
          <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[var(--ink)] tracking-tight">
            Offscript Identity Systems
          </h3>
          <p className="text-sm opacity-85 mt-1.5 leading-relaxed">
            Gritty editorial type scales, irreverent color contrasts, and tactile print textures for independent publications.
          </p>
        </div>

        <div className="space-y-1.5 pt-1">
          <ProgressBar
            value={80}
            label="Module 4 of 5: Risograph Halftones & Texture Masks"
            showValue
            variant="oxblood"
            size="md"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-[var(--line)]/20 flex flex-wrap items-center justify-between gap-4">
        <div className="font-mono text-xs opacity-80">
          Next module: <b>Vector Color Separations (22 min)</b>
        </div>
        <Link to="/learn">
          <Button variant="primary" size="md">
            <Play className="w-3.5 h-3.5 mr-2" />
            <span>Resume Path</span>
          </Button>
        </Link>
      </div>
    </Tile>
  );
};

export default ContinueLearningTile;
