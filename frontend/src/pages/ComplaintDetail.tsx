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
      <div style={{ textAlign: 'center', padding: '80px 0' }}>
        <div className="w-8 h-8 border-3 border-indigo-200 border-t-indigo-500 rounded-full animate-spin mx-auto" style={{ marginBottom: '12px' }}></div>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Loading complaint...</p>
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
        className="flex items-center gap-2 text-sm text-indigo-500 font-semibold hover:underline underline-offset-4 cursor-pointer"
        style={{ marginBottom: '32px' }}
      >
        <ArrowLeft size={16} /> Back to complaints
      </button>

      <div className="glass-card shadow-premium" style={{ borderRadius: '24px', padding: '32px', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative gradient */}
        <div style={{ position: 'absolute', top: 0, right: 0, width: '192px', height: '192px', background: 'linear-gradient(225deg, rgba(99,102,241,0.05), rgba(168,85,247,0.05))', borderRadius: '50%', filter: 'blur(48px)', pointerEvents: 'none' }} />

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px', position: 'relative', zIndex: 10 }}>
          <div>
            <span className="text-xs font-bold font-mono text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10" style={{ padding: '4px 8px', borderRadius: '6px' }}>#{complaint.id}</span>
            <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--color-text)', marginTop: '12px' }}>
              {editing ? (
                <input
                  value={editData.title || ''}
                  onChange={(e) => updateField('title', e.target.value)}
                  maxLength={12}
                  style={{
                    backgroundColor: 'var(--color-bg-input)',
                    border: '1px solid var(--color-border-input)',
                    borderRadius: '12px',
                    padding: '8px 12px',
                    fontSize: '24px',
                    fontWeight: 700,
                    width: '100%',
                    color: 'var(--color-text)',
                    outline: 'none',
                  }}
                />
              ) : (
                complaint.title
              )}
            </h1>
          </div>
          {canModify && !editing && (
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={handleEdit}
                className="hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-500"
                style={{ padding: '10px', borderRadius: '12px', color: 'var(--color-text-muted)', cursor: 'pointer', transition: 'all 0.2s' }}
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500 disabled:opacity-50"
                style={{ padding: '10px', borderRadius: '12px', color: 'var(--color-text-muted)', cursor: 'pointer', transition: 'all 0.2s' }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>

        {editing ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative', zIndex: 10 }}>
            <Input label="Complainant Name" value={editData.complainantName || ''} onChange={(e) => updateField('complainantName', e.target.value)} />
            <Input label="Contact / Address" value={editData.complainantContact || ''} onChange={(e) => updateField('complainantContact', e.target.value)} />
            <Input label="Incident Date & Time" type="datetime-local" value={(editData.incidentDatetime || '').slice(0, 16)} onChange={(e) => updateField('incidentDatetime', new Date(e.target.value).toISOString())} />
            <Input label="Incident Place" value={editData.incidentPlace || ''} onChange={(e) => updateField('incidentPlace', e.target.value)} />
            <Input label="Accused Details" value={editData.accusedDetails || ''} onChange={(e) => updateField('accusedDetails', e.target.value)} />
            <TextArea label="Description" value={editData.description || ''} onChange={(e) => updateField('description', e.target.value)} />
            <MultiSelectTags label="IPC Sections" value={editData.ipcSections || []} onChange={(tags) => updateField('ipcSections', tags)} />

            <div style={{ display: 'flex', gap: '12px', paddingTop: '16px' }}>
              <Button onClick={handleSave} disabled={saving} size="lg">
                {saving ? <span className="flex items-center gap-2"><Loader2 size={16} className="animate-spin" /> Saving...</span> : 'Save Changes'}
              </Button>
              <Button variant="outline" onClick={() => setEditing(false)} size="lg">Cancel</Button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative', zIndex: 10 }}>
            <DetailRow label="Complainant Name" value={complaint.complainantName} />
            <DetailRow label="Contact / Address" value={complaint.complainantContact} />
            <DetailRow label="Incident Date & Time" value={new Date(complaint.incidentDatetime).toLocaleString('en-IN')} />
            <DetailRow label="Place of Incident" value={complaint.incidentPlace} />
            <DetailRow label="Accused / Suspect" value={complaint.accusedDetails || '—'} />
            <DetailRow label="Description" value={complaint.description} />
            <div>
              <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>IPC Sections</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {complaint.ipcSections.map((s) => (
                  <span
                    key={s}
                    className="bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400"
                    style={{ padding: '6px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 700 }}
                  >
                    §{s}
                  </span>
                ))}
              </div>
            </div>
            {complaint.imageUrl && (
              <div>
                <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Original Image</p>
                <img src={complaint.imageUrl} alt="Complaint" className="shadow-premium" style={{ maxWidth: '100%', borderRadius: '16px', border: '1px solid var(--color-border)' }} />
              </div>
            )}
            <div style={{ paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
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
      <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>{label}</p>
      <p className="text-sm whitespace-pre-wrap leading-relaxed" style={{ color: 'var(--color-text)' }}>{value}</p>
    </div>
  );
}
