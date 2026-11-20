import React from 'react';
import { SectionHeading, Sticker, Badge } from '../../../components/ui';
import { MarketSubNav } from '../components';
import { Share2, CheckCircle2, AlertTriangle, XCircle, Sparkles, ShieldCheck } from 'lucide-react';
import { ConnectionRecord, ConnectionStatus } from '../../../types';
import { useProgress } from '../../../hooks';

export const ConnectionsPage: React.FC = () => {
  const { connections, updateConnectionStatus } = useProgress();

  const handleToggleHandoff = (conn: ConnectionRecord) => {
    if (conn.status === 'unavailable') return;
    const nextStatus: ConnectionStatus =
      conn.status === 'demo_handoff_ready'
        ? 'disconnected'
        : conn.status === 'disconnected'
        ? 'demo_handoff_ready'
        : conn.status === 'connected'
        ? 'disconnected'
        : 'demo_handoff_ready';
    updateConnectionStatus(conn.id, nextStatus);
  };

  const getStatusBadge = (status: ConnectionStatus) => {
    switch (status) {
      case 'connected':
        return (
          <Badge variant="teal" className="text-[10px] font-mono uppercase font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-green-700" />
            <span>Connected</span>
          </Badge>
        );
      case 'demo_handoff_ready':
        return (
          <Badge variant="acid" className="text-[10px] font-mono uppercase font-bold flex items-center gap-1 text-[#171717]">
            <Sparkles className="w-3 h-3" />
            <span>Demo / Handoff Ready</span>
          </Badge>
        );
      case 'unavailable':
        return (
          <Badge variant="oxblood" className="text-[10px] font-mono uppercase font-bold flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            <span>Unavailable</span>
          </Badge>
        );
      case 'disconnected':
      default:
        return (
          <Badge variant="subtle" className="text-[10px] font-mono uppercase font-bold flex items-center gap-1 opacity-75">
            <XCircle className="w-3 h-3 text-[var(--ox)]" />
            <span>Disconnected</span>
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <SectionHeading
        as="h1"
        kicker="Department 03 · Multi-Channel Distribution · Publishing Pipes"
        title="CONNECTIONS:"
        skewWord="publishing pipes"
        description="Manage distribution pipes, handoff destinations, and syndication channels without fabricated credentials."
        borderBottom
        action={
          <Sticker variant="electric" rotation="cw">
            Department 03
          </Sticker>
        }
      />

      <MarketSubNav />

      {/* Overview Status Telemetry Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard-sm space-y-1">
          <div className="font-mono text-xs opacity-75 uppercase">DEMO / HANDOFF READY</div>
          <div className="font-display font-black text-2xl text-[var(--ink)]">
            {connections.filter((c) => c.status === 'demo_handoff_ready').length}
          </div>
          <div className="font-mono text-[10px] text-green-700 font-bold">Local File Delivery Active</div>
        </div>

        <div className="p-4 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard-sm space-y-1">
          <div className="font-mono text-xs opacity-75 uppercase">AUTHENTICATED PIPES</div>
          <div className="font-display font-black text-2xl text-[var(--ink)]">
            {connections.filter((c) => c.status === 'connected').length}
          </div>
          <div className="font-mono text-[10px] opacity-70">Direct RSS / Publication</div>
        </div>

        <div className="p-4 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard-sm space-y-1">
          <div className="font-mono text-xs opacity-75 uppercase">DISCONNECTED</div>
          <div className="font-display font-black text-2xl text-[var(--ink)]">
            {connections.filter((c) => c.status === 'disconnected').length}
          </div>
          <div className="font-mono text-[10px] opacity-70">Pending Configuration</div>
        </div>

        <div className="p-4 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard-sm space-y-1">
          <div className="font-mono text-xs opacity-75 uppercase">UNAVAILABLE</div>
          <div className="font-display font-black text-2xl text-[var(--ink)]">
            {connections.filter((c) => c.status === 'unavailable').length}
          </div>
          <div className="font-mono text-[10px] text-[var(--ox)] font-bold">External API Gate Active</div>
        </div>
      </div>

      {/* Connections Grid */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b-2 border-[var(--line)]">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-[var(--ox)]" />
            <h2 className="font-display font-black text-xl text-[var(--ink)]">Configured Distribution Endpoints</h2>
          </div>
          <span className="font-mono text-xs opacity-75">Click toggle switch to adjust handoff status</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {connections.map((conn) => {
            const isSwitchOn = conn.status === 'demo_handoff_ready' || conn.status === 'connected';

            return (
              <div
                key={conn.id}
                className="p-5 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard flex flex-col justify-between space-y-4 card-tilt-hover"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs uppercase font-bold text-[var(--ox)]">
                      {conn.channel}
                    </span>
                    {getStatusBadge(conn.status)}
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-xl text-[var(--ink)] leading-snug">
                      {conn.name}
                    </h3>
                    {conn.handleOrUrl && (
                      <div className="font-mono text-xs opacity-70 mt-1 truncate">
                        {conn.handleOrUrl}
                      </div>
                    )}
                  </div>

                  {conn.notes && (
                    <p className="font-sans text-xs opacity-85 leading-relaxed">
                      {conn.notes}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-[var(--line)]/20 flex items-center justify-between">
                  <span className="font-mono text-[11px] opacity-70">
                    {conn.status === 'demo_handoff_ready'
                      ? 'Ready for Asset Handoff'
                      : conn.status === 'connected'
                      ? 'Live Syndication Pipe'
                      : conn.status === 'unavailable'
                      ? 'Requires Cloud Credentials'
                      : 'Handoff Inactive'}
                  </span>

                  <button
                    type="button"
                    disabled={conn.status === 'unavailable'}
                    onClick={() => handleToggleHandoff(conn)}
                    className={`sw-toggle ${isSwitchOn ? 'on' : ''} ${
                      conn.status === 'unavailable' ? 'opacity-30 cursor-not-allowed' : ''
                    }`}
                    title={
                      conn.status === 'unavailable'
                        ? 'Channel unavailable without live credentials'
                        : `Toggle ${conn.name} handoff readiness`
                    }
                    aria-label={`Toggle ${conn.name}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Editorial Brutalist Integrity Banner */}
      <div className="p-6 border-2 border-dashed border-[var(--line)] bg-[var(--card-bg)] space-y-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-green-700" />
          <span className="font-mono text-xs font-bold uppercase text-[var(--ox)]">
            Architectural Constraint &amp; Data Integrity
          </span>
        </div>
        <h3 className="font-display font-bold text-lg text-[var(--ink)]">
          Handoff Readiness vs Authenticated Production Pipes
        </h3>
        <p className="font-sans text-xs sm:text-sm opacity-85 leading-relaxed max-w-3xl">
          <strong>Demo / Handoff Ready</strong> status indicates that asset bundles, caption specimens, and aspect-ratio separations exported from <strong>Create Studio</strong> can be staged and packaged for human handoff. It is never misrepresented as an authenticated third-party OAuth connection. MOTIF does not fabricate simulated social media logins.
        </p>
      </div>
    </div>
  );
};

export default ConnectionsPage;
