import React from 'react';
import { SectionHeading, Tile, Button, Sticker } from '../../../components/ui';
import { HandoffNotice } from '../../../components/shared/HandoffNotice';
import { RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AnalyzePage: React.FC = () => {
  return (
    <div className="space-y-8">
      <SectionHeading
        as="h1"
        kicker="Department 05 · The Feedback Engine"
        title="ANALYZE:"
        skewWord="& grow"
        description="See what worked with live campaign diagnostics, business metrics, and insights that close the loop back to Learn."
        borderBottom
        action={
          <Sticker variant="acid" rotation="cw">
            Department 05
          </Sticker>
        }
      />

      <HandoffNotice
        toDeptName="Learn"
        toDeptPath="/learn"
        text="A weak result suggests a targeted curriculum path in Learn. The interconnected cycle continues."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Tile accent="none" shadow="default" className="space-y-3">
          <span className="font-mono text-xs text-[var(--ox)] font-bold uppercase">Audience Metric</span>
          <h3 className="font-display font-extrabold text-3xl">78.6k Reach</h3>
          <p className="text-sm opacity-85 leading-relaxed">
            +32% velocity across newsletters and drops. High editorial resonance.
          </p>
        </Tile>

        <Tile accent="none" shadow="default" className="space-y-3">
          <span className="font-mono text-xs text-[var(--ox)] font-bold uppercase">Conversion Metric</span>
          <h3 className="font-display font-extrabold text-3xl">4.8% Rate</h3>
          <p className="text-sm opacity-85 leading-relaxed">
            -0.6% dip on streetwear drop. Weak urgent hooks in teaser copy.
          </p>
          <div className="pt-2">
            <Link to="/learn">
              <Button variant="acid" size="sm">
                <RefreshCw className="w-3.5 h-3.5 mr-1" />
                <span>Fix in Learn</span>
              </Button>
            </Link>
          </div>
        </Tile>

        <Tile accent="acid" shadow="ox" className="space-y-3">
          <span className="font-mono text-xs font-bold uppercase text-[#171717]">Loop Diagnostic</span>
          <h3 className="font-display font-bold text-xl text-[#171717]">The Loop Closes</h3>
          <p className="text-xs font-mono text-[#171717] opacity-90 leading-relaxed">
            Weak results automatically recommend specific paths in Learn. Nothing gets lost.
          </p>
        </Tile>
      </div>
    </div>
  );
};

export default AnalyzePage;
