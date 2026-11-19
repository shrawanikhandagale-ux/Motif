import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HandoffNoticeProps {
  toDeptName: string;
  toDeptPath: string;
  text: string;
  className?: string;
}

export const HandoffNotice: React.FC<HandoffNoticeProps> = ({
  toDeptName,
  toDeptPath,
  text,
  className = '',
}) => {
  return (
    <div
      className={`border-2 border-[var(--line)] bg-[var(--acid)] text-[#171717] p-4 shadow-hard-ox ${className}`}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider block font-semibold opacity-90">
            hands off to {toDeptName}
          </span>
          <p className="font-bold text-base mt-1 text-[#171717]">{text}</p>
        </div>
        <Link
          to={toDeptPath}
          className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#171717] text-[#F1EBDD] text-xs font-mono font-bold uppercase tracking-wider border-2 border-[#171717] hover:bg-[var(--ox)] transition-colors shrink-0"
        >
          <span>Go to {toDeptName}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

