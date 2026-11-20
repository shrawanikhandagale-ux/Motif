import React, { useState, useMemo } from 'react';
import { SectionHeading, Sticker, Button } from '../../../components/ui';
import { MarketSubNav } from '../components';
import { PostEditorModal } from '../components/PostEditorModal';
import { Calendar, ChevronLeft, ChevronRight, Plus, Search, Filter, Edit3, Trash2 } from 'lucide-react';
import { ContentPostRecord, PostStatus, ChannelType } from '../../../types';
import { useProgress } from '../../../hooks';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const CHANNEL_ABBREV: Record<ChannelType, string> = {
  Instagram: 'IG',
  Pinterest: 'PIN',
  Newsletter: 'NEWS',
  LinkedIn: 'LI',
  YouTube: 'YT',
  Website: 'WEB',
};

export const ContentPlannerPage: React.FC = () => {
  const { posts, campaigns, projects, createPost, updatePost, deletePost } = useProgress();

  // Calendar year and month state (default to November 2026 matching prototype)
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(10); // 0-indexed: 10 = November
  const [viewMode, setViewMode] = useState<'month' | 'list'>('month');

  // Filters & search
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [channelFilter, setChannelFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<ContentPostRecord | null>(null);
  const [selectedDayDate, setSelectedDayDate] = useState<string>('2026-11-20');

  // Navigate months
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  // Build calendar matrix (Monday-start)
  const calendarDays = useMemo(() => {
    const firstDayIndex = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const cells: (number | null)[] = [];
    for (let i = 0; i < firstDayIndex; i++) {
      cells.push(null);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push(d);
    }
    while (cells.length % 7 !== 0) {
      cells.push(null);
    }
    return cells;
  }, [currentYear, currentMonth]);

  // Format date helper: YYYY-MM-DD
  const formatDateKey = (day: number) => {
    const mStr = String(currentMonth + 1).padStart(2, '0');
    const dStr = String(day).padStart(2, '0');
    return `${currentYear}-${mStr}-${dStr}`;
  };

  // Filtered posts
  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
      const matchesChannel = channelFilter === 'all' || p.channel === channelFilter;
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.caption && p.caption.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.campaignTitle && p.campaignTitle.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesStatus && matchesChannel && matchesSearch;
    });
  }, [posts, statusFilter, channelFilter, searchQuery]);

  // Stage counts for quick overview
  const counts = {
    idea: posts.filter((p) => p.status === 'idea').length,
    in_review: posts.filter((p) => p.status === 'in_review').length,
    scheduled: posts.filter((p) => p.status === 'scheduled').length,
    published: posts.filter((p) => p.status === 'published').length,
  };

  const handleOpenNewPost = (date?: string) => {
    setEditingPost(null);
    setSelectedDayDate(date || `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-20`);
    setModalOpen(true);
  };

  const handleEditPost = (post: ContentPostRecord, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingPost(post);
    setModalOpen(true);
  };

  const handleSavePost = (data: Omit<ContentPostRecord, 'id'> & { id?: string }) => {
    if (data.id) {
      updatePost(data.id, data);
    } else {
      createPost(data);
    }
  };

  const handleDeletePost = (id: string) => {
    deletePost(id);
  };

  const getStatusBadgeClass = (st: PostStatus) => {
    switch (st) {
      case 'published':
        return 'bg-[var(--ink)] text-[var(--bg)] border-[#171717]';
      case 'scheduled':
        return 'bg-[var(--acid)] text-[#171717] border-[#171717]';
      case 'in_review':
        return 'bg-[var(--elec)] text-[#171717] border-[#171717]';
      case 'idea':
      default:
        return 'bg-[var(--card-subtle)] text-[var(--ink)] border-dashed border-[var(--line)]';
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <SectionHeading
        as="h1"
        kicker="Department 03 · Multi-Channel Distribution · Editorial Calendar"
        title="CONTENT PLANNER:"
        skewWord="schedule & drops"
        description="Plan release cadences, map visual assets to channel formats, and manage scheduled publication dispatches."
        borderBottom
        action={
          <Sticker variant="electric" rotation="cw">
            Department 03
          </Sticker>
        }
      />

      <MarketSubNav />

      {/* Control Strip: Month Navigation, Status Counters, View Toggle, New Post */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard">
        {/* Month Selector */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrevMonth}
            aria-label="Previous Month"
            className="p-1.5 border border-[var(--line)] bg-[var(--bg)] hover:bg-[var(--card-subtle)] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h2 className="font-display font-black text-xl min-w-[180px] text-center text-[var(--ink)]">
            {MONTH_NAMES[currentMonth]} {currentYear}
          </h2>
          <button
            type="button"
            onClick={handleNextMonth}
            aria-label="Next Month"
            className="p-1.5 border border-[var(--line)] bg-[var(--bg)] hover:bg-[var(--card-subtle)] transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* View Mode Tabs (Month vs List) */}
        <div className="flex items-center border-2 border-[var(--line)] font-mono text-xs font-bold">
          <button
            type="button"
            onClick={() => setViewMode('month')}
            className={`px-3 py-1.5 uppercase transition-colors ${
              viewMode === 'month'
                ? 'bg-[var(--ink)] text-[var(--bg)]'
                : 'bg-[var(--card-bg)] text-[var(--ink)] hover:bg-[var(--card-subtle)]'
            }`}
          >
            Month
          </button>
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 uppercase border-l-2 border-[var(--line)] transition-colors ${
              viewMode === 'list'
                ? 'bg-[var(--ink)] text-[var(--bg)]'
                : 'bg-[var(--card-bg)] text-[var(--ink)] hover:bg-[var(--card-subtle)]'
            }`}
          >
            List ({filteredPosts.length})
          </button>
        </div>

        {/* Action: Plan a Post */}
        <Button variant="primary" size="sm" onClick={() => handleOpenNewPost()}>
          <Plus className="w-3.5 h-3.5 mr-1" />
          <span>Plan a Post</span>
        </Button>
      </div>

      {/* Filter and Status Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        {/* Status Count Pills (motif-v2.html:114) */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-2.5 py-1 border uppercase font-bold transition-colors ${
              statusFilter === 'all'
                ? 'border-[var(--line)] bg-[var(--ink)] text-[var(--bg)]'
                : 'border-[var(--line)]/50 bg-[var(--card-bg)] text-[var(--ink)] hover:bg-[var(--card-subtle)]'
            }`}
          >
            All ({posts.length})
          </button>
          <button
            onClick={() => setStatusFilter('idea')}
            className={`px-2.5 py-1 border border-dashed uppercase font-bold transition-colors ${
              statusFilter === 'idea'
                ? 'border-[var(--line)] bg-[var(--card-subtle)] text-[var(--ink)] shadow-hard-xs'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            {counts.idea} Idea
          </button>
          <button
            onClick={() => setStatusFilter('in_review')}
            className={`px-2.5 py-1 border uppercase font-bold transition-colors ${
              statusFilter === 'in_review'
                ? 'bg-[var(--elec)] text-[#171717] border-[#171717]'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            {counts.in_review} In Review
          </button>
          <button
            onClick={() => setStatusFilter('scheduled')}
            className={`px-2.5 py-1 border uppercase font-bold transition-colors ${
              statusFilter === 'scheduled'
                ? 'bg-[var(--acid)] text-[#171717] border-[#171717]'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            {counts.scheduled} Scheduled
          </button>
          <button
            onClick={() => setStatusFilter('published')}
            className={`px-2.5 py-1 border uppercase font-bold transition-colors ${
              statusFilter === 'published'
                ? 'bg-[var(--ink)] text-[var(--bg)] border-[#171717]'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            {counts.published} Published
          </button>
        </div>

        {/* Channel and Keyword Filters */}
        <div className="flex flex-wrap items-center gap-2 flex-1 max-w-md ml-auto">
          <div className="flex items-center gap-1 px-2.5 py-1 border border-[var(--line)] bg-[var(--card-bg)] flex-1 min-w-[160px]">
            <Search className="w-3.5 h-3.5 opacity-50" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs font-mono text-[var(--ink)] focus:outline-none placeholder:opacity-50"
            />
          </div>

          <div className="flex items-center gap-1 font-mono text-xs">
            <Filter className="w-3.5 h-3.5 opacity-60" />
            <select
              aria-label="Filter by channel"
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value)}
              className="bg-[var(--card-bg)] border border-[var(--line)] px-2 py-1 text-xs font-mono text-[var(--ink)] focus:outline-none"
            >
              <option value="all">All Channels</option>
              <option value="Instagram">Instagram</option>
              <option value="Pinterest">Pinterest</option>
              <option value="Newsletter">Newsletter</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="YouTube">YouTube</option>
              <option value="Website">Website</option>
            </select>
          </div>
        </div>
      </div>

      {/* MONTH VIEW (motif-v2.html:116 fidelity) */}
      {viewMode === 'month' && (
        <div className="border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard overflow-x-auto">
          <div className="min-w-[680px]">
            {/* Weekday headers */}
            <div className="grid grid-cols-7 border-b-2 border-[var(--line)] bg-[var(--ink)] text-[var(--bg)] font-mono text-xs font-bold">
              {WEEKDAYS.map((wd) => (
                <div key={wd} className="p-2.5 text-center uppercase border-r border-[var(--line)] last:border-r-0">
                  {wd}
                </div>
              ))}
            </div>

            {/* Calendar Day Grid */}
            <div className="grid grid-cols-7 border-collapse">
            {calendarDays.map((dayNum, cellIdx) => {
              if (dayNum === null) {
                return (
                  <div
                    key={`empty-${cellIdx}`}
                    className="min-h-[110px] p-2 border-r border-b border-[var(--line)]/30 bg-[var(--card-subtle)]/30 opacity-40"
                  />
                );
              }

              const dateKey = formatDateKey(dayNum);
              const dayPosts = filteredPosts.filter((p) => p.scheduledDate === dateKey);
              const isToday = currentYear === 2026 && currentMonth === 10 && dayNum === 20;

              return (
                <div
                  key={`day-${dayNum}`}
                  onClick={() => handleOpenNewPost(dateKey)}
                  className={`min-h-[110px] p-2 border-r border-b border-[var(--line)] transition-colors hover:bg-[var(--card-subtle)]/70 cursor-pointer flex flex-col justify-between select-none ${
                    isToday ? 'bg-[var(--card-subtle)]/50' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-mono text-xs font-bold inline-grid place-items-center w-6 h-6 rounded-full ${
                        isToday ? 'bg-[var(--acid)] text-[#171717] border border-[#171717]' : 'opacity-80'
                      }`}
                    >
                      {dayNum}
                    </span>
                    {dayPosts.length > 0 && (
                      <span className="font-mono text-[10px] opacity-60">
                        {dayPosts.length} post{dayPosts.length !== 1 ? 's' : ''}
                      </span>
                    )}
                  </div>

                  {/* Post Chips */}
                  <div className="space-y-1.5 mt-1.5 flex-1">
                    {dayPosts.map((post) => (
                      <div
                        key={post.id}
                        onClick={(e) => handleEditPost(post, e)}
                        className={`p-1.5 text-[11px] font-mono border-2 truncate card-tilt-hover cursor-pointer shadow-hard-xs ${getStatusBadgeClass(
                          post.status
                        )}`}
                        title={`${post.channel}: ${post.title} (${post.status})`}
                      >
                        <span className="font-bold opacity-80 mr-1">
                          [{CHANNEL_ABBREV[post.channel] || post.channel.slice(0, 2).toUpperCase()}]
                        </span>
                        <span>{post.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          </div>
        </div>
      )}

      {/* LIST VIEW (motif-v2.html:115 fidelity) */}
      {viewMode === 'list' && (
        <div className="border-2 border-[var(--line)] bg-[var(--card-bg)] shadow-hard divide-y border-[var(--line)]">
          {filteredPosts.length === 0 ? (
            <div className="p-8 text-center font-mono text-xs opacity-60">
              No scheduled content matches the current filter.
            </div>
          ) : (
            [...filteredPosts]
              .sort((a, b) => (a.scheduledDate < b.scheduledDate ? -1 : 1))
              .map((post) => (
                <div
                  key={post.id}
                  onClick={() => handleEditPost(post)}
                  className="p-4 flex flex-wrap items-center justify-between gap-4 hover:bg-[var(--card-subtle)] transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-[240px]">
                    <span className="font-mono text-xs font-bold bg-[var(--card-subtle)] px-2 py-1 border border-[var(--line)]">
                      {post.scheduledDate}
                    </span>
                    <span className="font-mono text-xs font-bold text-[var(--ox)] uppercase">
                      {post.channel}
                    </span>
                    <div>
                      <h3 className="font-sans font-bold text-sm text-[var(--ink)] leading-snug">
                        {post.title}
                      </h3>
                      {post.campaignTitle && (
                        <span className="font-mono text-[10px] opacity-70">
                          Campaign: {post.campaignTitle}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 border ${getStatusBadgeClass(
                        post.status
                      )}`}
                    >
                      {post.status.replace('_', ' ')}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => handleEditPost(post, e)}
                      className="p-1 hover:bg-[var(--bg)] border border-[var(--line)] text-xs"
                      title="Edit"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePost(post.id);
                      }}
                      className="p-1 hover:bg-[var(--ox)] hover:text-[#F1EBDD] border border-[var(--line)] text-xs"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
          )}
        </div>
      )}

      {/* Editorial Footnote (matches motif-v2.html:117) */}
      <div className="p-4 border-2 border-dashed border-[var(--line)] bg-[var(--card-bg)] flex items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[var(--ox)]" />
          <span className="font-bold">Editorial Cadence Engine</span>
        </div>
        <p className="opacity-80">
          Planning &amp; handoff. Publishing integrations activate when authenticated social platform tokens are connected.
        </p>
      </div>

      {/* Post Modal */}
      <PostEditorModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        post={editingPost}
        defaultDate={selectedDayDate}
        campaigns={campaigns}
        projects={projects}
        onSave={handleSavePost}
        onDelete={handleDeletePost}
      />
    </div>
  );
};

export default ContentPlannerPage;
