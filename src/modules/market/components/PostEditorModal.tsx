import React, { useState, useEffect } from 'react';
import { X, Calendar, Trash2, Tag, Layers } from 'lucide-react';
import { Button, Input } from '../../../components/ui';
import { ContentPostRecord, ChannelType, PostStatus, CampaignRecord, Project } from '../../../types';

interface PostEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  post?: ContentPostRecord | null;
  defaultDate?: string;
  campaigns: CampaignRecord[];
  projects: Project[];
  onSave: (data: Omit<ContentPostRecord, 'id'> & { id?: string }) => void;
  onDelete?: (id: string) => void;
}

const CHANNELS: ChannelType[] = [
  'Instagram',
  'Pinterest',
  'Newsletter',
  'LinkedIn',
  'YouTube',
  'Website',
];

const STATUSES: { key: PostStatus; label: string }[] = [
  { key: 'idea', label: 'Idea / Draft' },
  { key: 'in_review', label: 'In Review' },
  { key: 'scheduled', label: 'Scheduled' },
  { key: 'published', label: 'Published' },
];

export const PostEditorModal: React.FC<PostEditorModalProps> = ({
  isOpen,
  onClose,
  post,
  defaultDate,
  campaigns,
  projects,
  onSave,
  onDelete,
}) => {
  const [title, setTitle] = useState('');
  const [channel, setChannel] = useState<ChannelType>('Instagram');
  const [scheduledDate, setScheduledDate] = useState('2026-11-20');
  const [status, setStatus] = useState<PostStatus>('idea');
  const [caption, setCaption] = useState('');
  const [campaignId, setCampaignId] = useState('');
  const [projectId, setProjectId] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setChannel(post.channel);
      setScheduledDate(post.scheduledDate);
      setStatus(post.status);
      setCaption(post.caption || '');
      setCampaignId(post.campaignId || '');
      setProjectId(post.projectId || '');
    } else {
      setTitle('');
      setChannel('Instagram');
      setScheduledDate(defaultDate || '2026-11-20');
      setStatus('idea');
      setCaption('');
      setCampaignId('');
      setProjectId('');
    }
    setError(null);
  }, [post, defaultDate, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || title.trim().length < 2) {
      setError('Please provide a post idea or title (at least 2 characters).');
      return;
    }
    if (!scheduledDate) {
      setError('Please set a scheduled calendar date.');
      return;
    }

    const linkedCamp = campaigns.find((c) => c.id === campaignId);
    const linkedProj = projects.find((p) => p.id === projectId);

    onSave({
      id: post?.id,
      title: title.trim(),
      channel,
      scheduledDate,
      status,
      caption: caption.trim(),
      campaignId: linkedCamp?.id,
      campaignTitle: linkedCamp?.title,
      projectId: linkedProj?.id,
      projectTitle: linkedProj?.title,
    });

    onClose();
  };

  const handleDelete = () => {
    if (post && onDelete) {
      onDelete(post.id);
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={post ? 'Edit Scheduled Post' : 'Plan a Post'}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[var(--card-bg)] border-2 border-[var(--line)] shadow-hard-lg p-6 space-y-5 text-[var(--ink)] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b-2 border-[var(--line)]">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[var(--ox)]" />
            <h2 className="font-display font-extrabold text-2xl">
              {post ? 'Edit Scheduled Content' : 'Plan a Post'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 hover:bg-[var(--card-subtle)] border border-[var(--line)]"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {error && (
          <div className="p-3 bg-[var(--ox)] text-[#F1EBDD] font-mono text-xs border border-[var(--line)]">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Idea / Content Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Halftone Print Process Reel"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-mono text-xs font-bold uppercase">Channel</label>
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value as ChannelType)}
                className="w-full bg-[var(--bg)] border-2 border-[var(--line)] p-2 font-mono text-xs text-[var(--ink)] focus:outline-none"
              >
                {CHANNELS.map((ch) => (
                  <option key={ch} value={ch}>
                    {ch}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="block font-mono text-xs font-bold uppercase">Scheduled Date</label>
              <input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full bg-[var(--bg)] border-2 border-[var(--line)] p-2 font-mono text-xs text-[var(--ink)] focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block font-mono text-xs font-bold uppercase">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as PostStatus)}
              className="w-full bg-[var(--bg)] border-2 border-[var(--line)] p-2 font-mono text-xs text-[var(--ink)] focus:outline-none"
            >
              {STATUSES.map((st) => (
                <option key={st.key} value={st.key}>
                  {st.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-mono text-xs font-bold uppercase flex items-center gap-1">
                <Tag className="w-3 h-3 text-[var(--ox)]" />
                <span>Link Campaign (Optional)</span>
              </label>
              <select
                value={campaignId}
                onChange={(e) => setCampaignId(e.target.value)}
                className="w-full bg-[var(--bg)] border-2 border-[var(--line)] p-2 font-mono text-xs text-[var(--ink)] focus:outline-none"
              >
                <option value="">None / Standalone Post</option>
                {campaigns.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="block font-mono text-xs font-bold uppercase flex items-center gap-1">
                <Layers className="w-3 h-3 text-[var(--ox)]" />
                <span>Link Project (Optional)</span>
              </label>
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full bg-[var(--bg)] border-2 border-[var(--line)] p-2 font-mono text-xs text-[var(--ink)] focus:outline-none"
              >
                <option value="">None / Standalone</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="block font-mono text-xs font-bold uppercase">Caption / Copy Specimen</label>
            <textarea
              rows={3}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Post copy, hashtags, or creative briefing notes..."
              className="w-full bg-[var(--bg)] border-2 border-[var(--line)] p-2 font-mono text-xs text-[var(--ink)] focus:outline-none resize-y"
            />
          </div>

          <div className="pt-4 border-t-2 border-[var(--line)] flex items-center justify-between gap-3">
            <div>
              {post && onDelete && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleDelete}
                  className="text-xs text-[var(--ox)] border-[var(--ox)] hover:bg-[var(--ox)] hover:text-[#F1EBDD]"
                >
                  <Trash2 className="w-3.5 h-3.5 mr-1" />
                  <span>Delete Post</span>
                </Button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" size="sm" onClick={onClose} className="text-xs">
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" className="text-xs">
                {post ? 'Save Changes' : 'Schedule Post'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostEditorModal;
