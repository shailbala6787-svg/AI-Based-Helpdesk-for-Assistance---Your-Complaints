import api from '../lib/axios';
import { ENDPOINTS } from '../constants/endpoints';

export interface Complaint {
  id: number;
  userId: number;
  title: string;
  complainantName: string;
  complainantContact: string;
  incidentDatetime: string;
  incidentPlace: string;
  accusedDetails: string;
  description: string;
  ipcSections: string[];
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface ParsedDraft {
  title: string;
  complainantName: string;
  complainantContact: string;
  incidentDatetime: string;
  incidentPlace: string;
  accusedDetails: string;
  description: string;
  ipcSections: string[];
  imageUrl: string;
}

export interface CreateComplaintData {
  title: string;
  complainantName: string;
  complainantContact: string;
  incidentDatetime: string;
  incidentPlace: string;
  accusedDetails?: string;
  description: string;
  ipcSections: string[];
  imageUrl: string;
}

export async function parseImage(file: File) {
  const formData = new FormData();
  formData.append('image', file);
  const res = await api.post(ENDPOINTS.COMPLAINTS.PARSE, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data as { status: string; message: string; data: ParsedDraft };
}

export async function createComplaint(data: CreateComplaintData) {
  const res = await api.post(ENDPOINTS.COMPLAINTS.CREATE, data);
  return res.data;
}

export async function listComplaints() {
  const res = await api.get(ENDPOINTS.COMPLAINTS.LIST);
  return res.data as { status: string; message: string; data: Complaint[] };
}

export async function getComplaint(id: number) {
  const res = await api.get(ENDPOINTS.COMPLAINTS.BY_ID(id));
  return res.data as { status: string; message: string; data: Complaint };
}

export async function updateComplaint(id: number, data: Partial<CreateComplaintData>) {
  const res = await api.patch(ENDPOINTS.COMPLAINTS.BY_ID(id), data);
  return res.data;
}

export async function deleteComplaint(id: number) {
  const res = await api.delete(ENDPOINTS.COMPLAINTS.BY_ID(id));
  return res.data;
}

export async function searchComplaints(q: string, ai: boolean = false) {
  const res = await api.get(ENDPOINTS.COMPLAINTS.SEARCH, { params: { q, ai: ai.toString() } });
  return res.data as { status: string; message: string; data: Complaint[] };
}
