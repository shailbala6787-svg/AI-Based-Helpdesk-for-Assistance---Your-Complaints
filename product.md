# ABHAY — Product Requirements Document

## 1. Vision & Purpose

**ABHAY** (AI-Based Helpdesk for Assistance & Your Complaints) is an AI-driven complaints management platform that transforms raw complaint images into structured First Information Report (FIR) documents. It removes the friction of manual data entry by leveraging AI to parse complaint images, suggest relevant IPC sections, and generate concise titles — while keeping a human reviewer in the loop before final submission.

### Problem Statement

Filing complaints typically involves tedious manual transcription from handwritten or printed documents into digital forms. This process is slow, error-prone, and discourages timely reporting. ABHAY automates the extraction step and provides intelligent suggestions, cutting turnaround time while maintaining accuracy through human review.

### Core Value Proposition

| For | Value |
|-----|-------|
| **Complainants** | Upload a complaint image → get a pre-filled, editable FIR form in seconds |
| **Reviewers / Users** | Correct AI-parsed data, approve, and persist structured FIRs |
| **Administrators** | Oversee all complaints, manage user quotas, and search the entire corpus |

---

## 2. Target Personas

### 2.1 Regular User (Complainant / Reviewer)

- Signs up with email & password, verifies via 6-digit OTP.
- Uploads complaint images (up to **5 lifetime uploads** by default).
- Reviews and edits the AI-parsed FIR draft, including IPC section suggestions.
- Searches own complaints via keyword (default) or semantic AI search (up to **10 lifetime AI searches** by default).
- Manages profile and settings.

### 2.2 Administrator

- Same signup flow as a regular user; role is flipped to `ADMIN` directly in the database.
- Views **all** complaints across every user.
- Searches all complaints (keyword + semantic).
- Manages per-user lifetime limits (upload & AI-search quotas) by looking up users via email or name.
- Near-identical UI to regular users — no separate admin portal.

---

## 3. User Flows

### 3.1 Authentication

```
Signup → Email OTP (6-digit, 5-min TTL) → Verify → Login
Forgot Password → Email OTP → Reset Password → Login
```

- Login is blocked until email is verified.
- JWT (1-day expiry, `userId` + `role` claims) set as `httpOnly`, `secure`, `sameSite: 'none'` cookie named `authorization`.
- Frontend bootstraps auth state via `GET /auth/me` on mount.

### 3.2 Complaint Submission (Happy Path)

```
Home → Upload Image
         ↓
    AI parses image → Draft FIR form pre-filled
         ↓
    User reviews & edits all 7 fields + IPC tags + title
         ↓
    Save → Stored in DB + vector embedding created
```

### 3.3 Complaint Search

```
Complaints Page → Search box
         ↓
    Toggle OFF (default): keyword search (ILIKE on title + description)
    Toggle ON: semantic AI search (vector similarity)
         ↓
    Results in table view
```

### 3.4 Admin: Limit Management

```
Admin Panel → Search user by email/name
         ↓
    View current limits → Set new absolute values for uploadLimit / searchLimit
```

---

## 4. Feature Breakdown

### 4.1 Authentication & Authorization

| Feature | Details |
|---------|---------|
| Signup | Email + password registration |
| OTP Verification | 6-digit code via Resend, 5-min TTL, bcrypt-hashed (cost 12) |
| Resend OTP | Re-sends verification code |
| Login | Returns JWT cookie; blocked if unverified |
| Logout | Clears cookie |
| Forgot Password | OTP flow with `purpose: 'reset'` |
| Reset Password | Sets new password after OTP verification |
| Session Bootstrap | `GET /auth/me` returns current user from JWT |

### 4.2 Complaint Management

| Feature | Details |
|---------|---------|
| Image Upload & Parse | Multipart upload → stored in Supabase Storage → AI extracts 7 FIR fields + IPC sections + title (≤12 char action-phrase) |
| Draft Review | Editable form with all FIR fields; IPC sections shown as editable multiselect tags (`IPC <n>`) |
| Save Complaint | Persists final FIR to DB; generates `text-embedding-3-small` embedding over `description + IPC` |
| View Complaints | Own complaints (user) or all complaints (admin); displayed as a **table** |
| View Single Complaint | Full detail view at `/complaints/:id` |
| Edit Complaint | Owner or admin; re-generates embedding on save |
| Delete Complaint | Owner or admin; removes DB record + embedding |

### 4.3 Search

| Feature | Details |
|---------|---------|
| Keyword Search (default) | `ILIKE '%q%'` on `title` and `description` columns |
| Semantic AI Search | Toggle (default OFF); uses `text-embedding-3-small` to embed query → pgvector cosine similarity |
| Quota Deduction | AI search deducts 1 from `searches_used` on success (including 0-result queries) |

### 4.4 Quota / Limits System

| Feature | Details |
|---------|---------|
| Default Limits | 5 image uploads, 10 AI searches per user lifetime |
| Enforcement | Checked before action; on cap → HTTP `403` with `status: 'fail'` + descriptive message |
| Counting | Incremented **on success only** |
| Admin Override | Admin sets absolute values for any user's `uploadLimit` and `searchLimit` |

### 4.5 Admin Panel

| Feature | Details |
|---------|---------|
| View All Complaints | Same table UI as user, but shows all records |
| User Search | Search by email or name |
| Limit Management | Set absolute `uploadLimit` / `searchLimit` per user |

---

## 5. FIR Data Format

Every complaint follows the **7-field FIR format** (inspired by UP Integrated FIR Form IF1, CrPC §154):

| # | Field | Type |
|---|-------|------|
| 1 | Complainant Name | text |
| 2 | Complainant Contact / Address | text |
| 3 | Date & Time of Incident | datetime |
| 4 | Place of Incident (District / PS) | text |
| 5 | Accused / Suspect Details | text |
| 6 | Complaint Description | text |
| 7 | IPC Sections | text[] (multiselect tags) |

**Additionally generated by AI:**
- **Title**: Short action-phrase, ≤ 12 characters (e.g., "Chain Snatch", "Land Grab")

---

## 6. UI / UX Specification

### 6.1 Design Language

- **Minimal grey** color palette — no blue, no "AI aesthetic".
- Standard buttons, forms, and inputs.
- Light theme by default; theme toggle available.
- shadcn component library with grey theme.
- No heavy animations; `framer-motion` only where genuinely needed.

### 6.2 Layout

- **Sidebar navigation** (persistent):
  - Org logo: **ABHAY**
  - Items: Home · Complaints · Profile · Settings · Logout
  - Role chip (User / Admin) displayed near user info
- Near-identical UI for both user and admin roles.

### 6.3 Pages / Routes

| Route | Page | Access |
|-------|------|--------|
| `/login` | Login form | Public |
| `/signup` | Signup form | Public |
| `/verify` | OTP verification | Public |
| `/forgot-password` | Forgot password + reset flow | Public |
| `/` | Home — image upload + AI parse → draft review | Authenticated |
| `/complaints` | Complaints table (own / all for admin) + search | Authenticated |
| `/complaints/:id` | Single complaint detail | Authenticated |
| `/profile` | User profile | Authenticated |
| `/settings` | User settings | Authenticated |
| `/admin` | Admin panel — user search + limit management | Admin only |

### 6.4 Key UI Interactions

- **Image Upload**: Drag-and-drop or click-to-browse on the home page.
- **Draft Review Form**: Pre-filled fields with inline editing; IPC sections as removable/addable multiselect tags.
- **Search**: Single search box with an AI-toggle switch. Results populate the complaints table.
- **localStorage autosave**: In-progress review drafts are auto-saved to localStorage and restored on page revisit.
- **Toast notifications**: Via shadcn toast library for success/error feedback.

---

## 7. Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| **Auth Security** | bcrypt cost 12; httpOnly + secure cookies; no client-side token storage |
| **OTP TTL** | 5 minutes |
| **JWT Expiry** | 1 day |
| **Image Storage** | Supabase Storage; original image preserved |
| **Embedding Dimensions** | 1536 (OpenAI `text-embedding-3-small`) |
| **CORS** | Whitelisted origins only (localhost:6001, 127.0.0.1:6001, production domain) |
| **API Envelope** | Every response: `{ status: 'success'\|'fail', message, data?, error? }` |
| **No Pagination** | Complaint lists return all records (MVP scope) |

---

## 8. Deployment Targets

| Component | Platform |
|-----------|----------|
| Frontend | Vercel |
| Backend | Render or Railway |
| Database | Supabase Postgres (with pgvector) |
| File Storage | Supabase Storage |
| Email | Resend |

---

## 9. Success Criteria

1. A user can sign up, verify their email, and log in successfully.
2. A user can upload a complaint image and receive a correctly parsed FIR draft within seconds.
3. A user can review, edit IPC tags, and save a complaint that persists in the database with its embedding.
4. Keyword search returns relevant complaints by title/description match.
5. Semantic AI search returns contextually relevant complaints via vector similarity.
6. Quota limits are enforced correctly — users are blocked at cap with a clear message.
7. An admin can view all complaints, search users, and modify their quotas.
8. The application deploys successfully to the specified platforms.

---

## 10. Out of Scope (MVP)

- Pagination / infinite scroll.
- Real-time notifications or WebSockets.
- Multi-language / i18n support.
- File types beyond images (PDFs, documents).
- Refresh tokens or token rotation.
- Role management UI (admin role is set directly in DB).
- Audit logging / activity history.
- Mobile native apps.

---

*Reference: UP Integrated FIR Form (Form IF1, CrPC §154) — [police.py.gov.in](https://police.py.gov.in/Police%20manual/Forms%20pdf/FORM%20IF%201.pdf)*
