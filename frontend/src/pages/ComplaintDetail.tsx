import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getComplaint, updateComplaint, deleteComplaint, type Complaint } from '../APIs/complaints';
import { useAuth } from '../context/auth';
import { useToast } from '../components/ui/Toast';
import { ROLES } from '../constants/roles';
import Input from '../components/form/Input';
import TextArea from '../components/form/TextArea';
import Button from '../components/form/Button';
import MultiSelectTags from '../components/ui/MultiSelectTags';
import { ArrowLeft, Pencil, Trash2, Loader2 } from 'lucide-react';

export default function ComplaintDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editData, setEditData] = useState<Partial<Complaint>>({});

  const canModify = user && complaint && (user.id === complaint.userId || user.role === ROLES.ADMIN);

  useEffect(() => {
    if (id) fetchComplaint(parseInt(id));
  }, [id]);

  const fetchComplaint = async (cId: number) => {
    setLoading(true);
    try {
      const res = await getComplaint(cId);
      setComplaint(res.data);
    } catch (err: any) {
      toast(err.response?.data?.message || 'Failed to load complaint', 'error');
      navigate('/complaints');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    if (!complaint) return;
    setEditData({
      title: complaint.title,
      complainantName: complaint.complainantName,
      complainantContact: complaint.complainantContact,
      incidentDatetime: complaint.incidentDatetime,
      incidentPlace: complaint.incidentPlace,
      accusedDetails: complaint.accusedDetails,
      description: complaint.description,
      ipcSections: [...complaint.ipcSections],
    });
    setEditing(true);
  };

  const handleSave = async () => {
    if (!complaint) return;
    setSaving(true);
    try {
      await updateComplaint(complaint.id, editData);
      toast('Complaint updated', 'success');
      setEditing(false);
      fetchComplaint(complaint.id);
    } catch (err: any) {
      toast(err.response?.data?.message || 'Update failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!complaint || !confirm('Are you sure you want to delete this complaint?')) return;
    setDeleting(true);
    try {
      await deleteComplaint(complaint.id);
      toast('Complaint deleted', 'success');
      navigate('/complaints');
    } catch (err: any) {
      toast(err.response?.data?.message || 'Delete failed', 'error');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="w-8 h-8 border-3 border-(--color-primary)/20 border-t-(--color-primary) rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-sm text-(--color-text-muted)">Loading complaint...</p>
      </div>
    );
  }

  if (!complaint) return null;

  const updateField = (field: string, value: unknown) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <button
        onClick={() => navigate('/complaints')}
        className="flex items-center gap-2 text-sm text-(--color-primary) font-semibold hover:underline underline-offset-4 transition-all mb-8 cursor-pointer"
      >
        <ArrowLeft size={16} /> Back to complaints
      </button>

      <div className="glass-card shadow-premium rounded-3xl p-8 relative overflow-hidden">
        {/* Decorative gradient */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-indigo-500/5 to-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-start justify-between mb-8 relative z-10">
          <div>
            <span className="text-xs font-bold font-mono text-(--color-primary) bg-indigo-50 dark:bg-indigo-500/10 px-2 py-1 rounded-md">#{complaint.id}</span>
            <h1 className="text-2xl font-bold text-(--color-text) mt-3 tracking-tight">
              {editing ? (
                <input
                  value={editData.title || ''}
                  onChange={(e) => updateField('title', e.target.value)}
                  maxLength={12}
                  className="bg-(--color-bg-input) border border-(--color-border-input) rounded-xl px-3 py-2 text-2xl font-bold w-full focus:outline-none focus:ring-2 focus:ring-(--color-primary)/40"
                />
              ) : (
                complaint.title
              )}
            </h1>
          </div>
          {canModify && !editing && (
            <div className="flex gap-2">
              <button
                onClick={handleEdit}
                className="p-2.5 rounded-xl text-(--color-text-muted) hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-(--color-primary) transition-all cursor-pointer"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="p-2.5 rounded-xl text-(--color-text-muted) hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-(--color-destructive) transition-all cursor-pointer disabled:opacity-50"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>

        {editing ? (
          <div className="space-y-5 relative z-10">
            <Input label="Complainant Name" value={editData.complainantName || ''} onChange={(e) => updateField('complainantName', e.target.value)} />
            <Input label="Contact / Address" value={editData.complainantContact || ''} onChange={(e) => updateField('complainantContact', e.target.value)} />
            <Input label="Incident Date & Time" type="datetime-local" value={(editData.incidentDatetime || '').slice(0, 16)} onChange={(e) => updateField('incidentDatetime', new Date(e.target.value).toISOString())} />
            <Input label="Incident Place" value={editData.incidentPlace || ''} onChange={(e) => updateField('incidentPlace', e.target.value)} />
            <Input label="Accused Details" value={editData.accusedDetails || ''} onChange={(e) => updateField('accusedDetails', e.target.value)} />
            <TextArea label="Description" value={editData.description || ''} onChange={(e) => updateField('description', e.target.value)} />
            <MultiSelectTags label="IPC Sections" value={editData.ipcSections || []} onChange={(tags) => updateField('ipcSections', tags)} />

            <div className="flex gap-3 pt-4">
              <Button onClick={handleSave} disabled={saving} size="lg">
                {saving ? <span className="flex items-center gap-2"><Loader2 size={16} className="animate-spin" /> Saving...</span> : 'Save Changes'}
              </Button>
              <Button variant="outline" onClick={() => setEditing(false)} size="lg">Cancel</Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 relative z-10">
            <DetailRow label="Complainant Name" value={complaint.complainantName} />
            <DetailRow label="Contact / Address" value={complaint.complainantContact} />
            <DetailRow label="Incident Date & Time" value={new Date(complaint.incidentDatetime).toLocaleString('en-IN')} />
            <DetailRow label="Place of Incident" value={complaint.incidentPlace} />
            <DetailRow label="Accused / Suspect" value={complaint.accusedDetails || '—'} />
            <DetailRow label="Description" value={complaint.description} />
            <div>
              <p className="text-[10px] font-bold text-(--color-text-muted) uppercase tracking-widest mb-2">IPC Sections</p>
              <div className="flex gap-2 flex-wrap">
                {complaint.ipcSections.map((s) => (
                  <span key={s} className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    §{s}
                  </span>
                ))}
              </div>
            </div>
            {complaint.imageUrl && (
              <div>
                <p className="text-[10px] font-bold text-(--color-text-muted) uppercase tracking-widest mb-2">Original Image</p>
                <img src={complaint.imageUrl} alt="Complaint" className="max-w-full rounded-2xl border border-(--color-border) shadow-premium" />
              </div>
            )}
            <div className="pt-4 border-t border-(--color-border)">
              <p className="text-xs text-(--color-text-muted)">
                Filed on {new Date(complaint.createdAt).toLocaleString('en-IN')}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold text-(--color-text-muted) uppercase tracking-widest mb-1">{label}</p>
      <p className="text-sm text-(--color-text) whitespace-pre-wrap leading-relaxed">{value}</p>
    </div>
  );
}
