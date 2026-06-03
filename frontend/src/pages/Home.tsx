import { useState, useRef, useEffect, type FormEvent, type DragEvent } from 'react';
import { Upload, Loader2, FileImage } from 'lucide-react';
import { parseImage, createComplaint, type ParsedDraft } from '../APIs/complaints';
import { useAuth } from '../context/auth';
import { useToast } from '../components/ui/Toast';
import Input from '../components/form/Input';
import TextArea from '../components/form/TextArea';
import Button from '../components/form/Button';
import MultiSelectTags from '../components/ui/MultiSelectTags';

const DRAFT_KEY = 'abhay-draft';

export default function Home() {
  const { user, refetch } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [parsing, setParsing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [draft, setDraft] = useState<ParsedDraft | null>(() => {
    const saved = localStorage.getItem(DRAFT_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (draft) {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    }
  }, [draft]);

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped && dropped.type.startsWith('image/')) {
      setFile(dropped);
    }
  };

  const handleParse = async () => {
    if (!file) return;
    setParsing(true);
    try {
      const res = await parseImage(file);
      setDraft(res.data);
      toast('Image parsed successfully. Review the details below', 'success');
    } catch (err: any) {
      toast(err.response?.data?.message || 'Failed to parse image', 'error');
    } finally {
      setParsing(false);
    }
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!draft) return;
    setSaving(true);
    try {
      await createComplaint({
        title: draft.title,
        complainantName: draft.complainantName,
        complainantContact: draft.complainantContact,
        incidentDatetime: draft.incidentDatetime,
        incidentPlace: draft.incidentPlace,
        accusedDetails: draft.accusedDetails,
        description: draft.description,
        ipcSections: draft.ipcSections,
        imageUrl: draft.imageUrl,
      });
      toast('Complaint saved successfully', 'success');
      setDraft(null);
      setFile(null);
      localStorage.removeItem(DRAFT_KEY);
      await refetch();
    } catch (err: any) {
      toast(err.response?.data?.message || 'Failed to save complaint', 'error');
    } finally {
      setSaving(false);
    }
  };

  const updateDraft = (field: string, value: unknown) => {
    setDraft((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div style={{ marginBottom: '32px' }}>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>
          File a Complaint
        </h1>
        <p className="text-sm mt-2" style={{ color: 'var(--color-text-muted)' }}>
          Upload a complaint image to get started. Uploads used:{' '}
          <span className="font-semibold text-indigo-500">{user?.uploadsUsed ?? 0}/{user?.uploadLimit ?? 5}</span>
        </p>
      </div>

      {!draft && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Upload area */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            style={{
              padding: '56px 32px',
              borderRadius: '24px',
              border: `2px dashed ${dragOver ? 'var(--color-primary)' : 'var(--color-border-input)'}`,
              backgroundColor: dragOver ? 'rgba(99, 102, 241, 0.05)' : 'rgba(255,255,255,0.4)',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            {file ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <FileImage size={32} />
                </div>
                <div>
                  <p className="text-base font-semibold" style={{ color: 'var(--color-text)' }}>{file.name}</p>
                  <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500">
                  <Upload size={32} />
                </div>
                <div>
                  <p className="text-lg font-medium" style={{ color: 'var(--color-text)' }}>
                    Drag & drop an image here
                  </p>
                  <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
                    or click to browse from your computer
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                  <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-500">JPG</span>
                  <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-500">PNG</span>
                  <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-500">WEBP</span>
                </div>
              </div>
            )}
          </div>

          {file && (
            <Button onClick={handleParse} disabled={parsing} className="w-full" size="lg">
              {parsing ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={20} className="animate-spin" /> Analyzing with AI...
                </span>
              ) : (
                'Extract Details Automatically'
              )}
            </Button>
          )}
        </div>
      )}

      {/* Draft review form */}
      {draft && (
        <form
          onSubmit={handleSave}
          className="glass-card shadow-premium"
          style={{ borderRadius: '24px', padding: '32px', position: 'relative', overflow: 'hidden' }}
        >
          <div
            style={{
              position: 'absolute', top: 0, right: 0, width: '256px', height: '256px',
              background: 'var(--color-primary)', borderRadius: '50%', opacity: 0.05,
              filter: 'blur(48px)', pointerEvents: 'none',
            }}
          />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', position: 'relative', zIndex: 10 }}>
            <div>
              <h2 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>Review Details</h2>
              <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>AI has extracted the following information from your image.</p>
            </div>
            <button
              type="button"
              onClick={() => { setDraft(null); localStorage.removeItem(DRAFT_KEY); }}
              className="text-sm font-medium text-red-500 hover:text-red-600 bg-red-50 dark:bg-red-500/10 px-3 py-1.5 rounded-lg cursor-pointer"
            >
              Discard
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', zIndex: 10 }}>
            <Input
              id="draft-title"
              label="Title (≤12 chars)"
              value={draft.title}
              onChange={(e) => updateDraft('title', e.target.value)}
              maxLength={12}
              required
            />
            <Input
              id="draft-name"
              label="Complainant Name"
              value={draft.complainantName}
              onChange={(e) => updateDraft('complainantName', e.target.value)}
              required
            />
            <Input
              id="draft-contact"
              label="Complainant Contact / Address"
              value={draft.complainantContact}
              onChange={(e) => updateDraft('complainantContact', e.target.value)}
              required
            />
            <Input
              id="draft-datetime"
              label="Date & Time of Incident"
              type="datetime-local"
              value={draft.incidentDatetime?.slice(0, 16) || ''}
              onChange={(e) => updateDraft('incidentDatetime', new Date(e.target.value).toISOString())}
              required
            />
            <Input
              id="draft-place"
              label="Place of Incident (District / PS)"
              value={draft.incidentPlace}
              onChange={(e) => updateDraft('incidentPlace', e.target.value)}
              required
            />
            <Input
              id="draft-accused"
              label="Accused / Suspect Details"
              value={draft.accusedDetails}
              onChange={(e) => updateDraft('accusedDetails', e.target.value)}
            />
            <TextArea
              id="draft-description"
              label="Complaint Description"
              value={draft.description}
              onChange={(e) => updateDraft('description', e.target.value)}
              required
            />
            <MultiSelectTags
              label="IPC Sections"
              value={draft.ipcSections}
              onChange={(tags) => updateDraft('ipcSections', tags)}
              placeholder="Type section number and press Enter"
            />
          </div>

          <div style={{ marginTop: '24px', position: 'relative', zIndex: 10 }}>
            <Button type="submit" disabled={saving} className="w-full" size="lg">
              {saving ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={18} className="animate-spin" /> Saving...
                </span>
              ) : (
                'Save Complaint'
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
