# ABHAY — Architecture Document

## 1. System Overview

ABHAY is a monorepo with two independently deployable applications — a **React + Vite frontend** and an **Express 5 backend** — connected to a **Supabase Postgres** database (with pgvector), **Supabase Storage** for images, **OpenAI** for AI capabilities, and **Resend** for transactional email.

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Client (Browser)                             │
│                                                                     │
│   React 19 + TypeScript + Vite                                      │
│   shadcn/ui (grey theme) + Tailwind v4                              │
│   Port: 6001                                                        │
└────────────────────────────┬────────────────────────────────────────┘
                             │  HTTP (cookie: authorization=<jwt>)
                             │  CORS whitelisted origins
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     Backend (Express 5)                              │
│                                                                     │
│   TypeScript + ESM, build: tsc → dist/                              │
│   Port: 7001                                                        │
│                                                                     │
│   ┌─────────┐  ┌─────────────┐  ┌───────────┐                      │
│   │  Auth   │  │ Complaints  │  │   Admin   │   ← Domain Modules   │
│   └────┬────┘  └──────┬──────┘  └─────┬─────┘                      │
│        │              │               │                             │
│        ▼              ▼               ▼                             │
│   ┌──────────────────────────────────────┐                          │
│   │     Shared: Config, DB, Utils        │                          │
│   └──────────────────────────────────────┘                          │
└────────┬──────────────┬──────────────┬──────────────────────────────┘
         │              │              │
         ▼              ▼              ▼
   ┌──────────┐  ┌───────────┐  ┌───────────┐
   │ Supabase │  │  OpenAI   │  │  Resend   │
   │ Postgres │  │  API      │  │  Email    │
   │ + Vector │  │           │  │           │
   │ + Storage│  │           │  │           │
   └──────────┘  └───────────┘  └───────────┘
```

---

## 2. Repository Structure

```
/
├── frontend/                     # React + Vite app
│   ├── public/
│   ├── src/
│   │   ├── APIs/                 # All API call functions
│   │   │   ├── auth.ts
│   │   │   ├── complaints.ts
│   │   │   └── admin.ts
│   │   ├── components/
│   │   │   ├── ui/               # Reusable UI: SearchBox, Sidebar, Table, etc.
│   │   │   └── form/             # Form primitives: Input, Button, Select, etc.
│   │   ├── constants/
│   │   │   ├── endpoints.ts      # All API endpoint paths
│   │   │   ├── roles.ts          # USER, ADMIN
│   │   │   └── enums.ts          # Shared enums
│   │   ├── context/
│   │   │   ├── auth.tsx          # AuthContext (user state, login/logout)
│   │   │   └── theme.tsx         # ThemeContext (light/dark)
│   │   ├── lib/
│   │   │   └── axios.ts          # Single axios instance (withCredentials, baseURL)
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   ├── Signup.tsx
│   │   │   ├── Verify.tsx
│   │   │   ├── ForgotPassword.tsx
│   │   │   ├── Home.tsx          # Image upload + AI parse + draft review
│   │   │   ├── Complaints.tsx    # Table view + search (keyword / AI toggle)
│   │   │   ├── ComplaintDetail.tsx
│   │   │   ├── Profile.tsx
│   │   │   ├── Settings.tsx
│   │   │   └── Admin.tsx         # User search + limit management
│   │   ├── utils/
│   │   ├── App.tsx               # Router + layout
│   │   └── main.tsx              # Entry point
│   ├── .env                      # VITE_API_BASE_URL
│   ├── .env.example
│   ├── tailwind.config.ts
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── package.json
│
├── backend/                      # Express 5 API
│   ├── src/
│   │   ├── apps/
│   │   │   ├── auth/
│   │   │   │   ├── controllers/
│   │   │   │   │   ├── signup.ts
│   │   │   │   │   ├── verifyOtp.ts
│   │   │   │   │   ├── resendOtp.ts
│   │   │   │   │   ├── login.ts
│   │   │   │   │   ├── logout.ts
│   │   │   │   │   ├── forgotPassword.ts
│   │   │   │   │   ├── resetPassword.ts
│   │   │   │   │   └── me.ts
│   │   │   │   ├── dtos/
│   │   │   │   │   ├── signup.ts
│   │   │   │   │   ├── verifyOtp.ts
│   │   │   │   │   ├── login.ts
│   │   │   │   │   ├── forgotPassword.ts
│   │   │   │   │   └── resetPassword.ts
│   │   │   │   ├── services/
│   │   │   │   │   ├── signup.ts
│   │   │   │   │   ├── verifyOtp.ts
│   │   │   │   │   ├── resendOtp.ts
│   │   │   │   │   ├── login.ts
│   │   │   │   │   ├── forgotPassword.ts
│   │   │   │   │   ├── resetPassword.ts
│   │   │   │   │   └── me.ts
│   │   │   │   └── route.ts
│   │   │   │
│   │   │   ├── complaints/
│   │   │   │   ├── controllers/
│   │   │   │   │   ├── parse.ts
│   │   │   │   │   ├── create.ts
│   │   │   │   │   ├── list.ts
│   │   │   │   │   ├── getById.ts
│   │   │   │   │   ├── update.ts
│   │   │   │   │   ├── delete.ts
│   │   │   │   │   └── search.ts
│   │   │   │   ├── dtos/
│   │   │   │   │   ├── create.ts
│   │   │   │   │   ├── update.ts
│   │   │   │   │   └── search.ts
│   │   │   │   ├── services/
│   │   │   │   │   ├── parse.ts
│   │   │   │   │   ├── create.ts
│   │   │   │   │   ├── list.ts
│   │   │   │   │   ├── getById.ts
│   │   │   │   │   ├── update.ts
│   │   │   │   │   ├── delete.ts
│   │   │   │   │   └── search.ts
│   │   │   │   └── route.ts
│   │   │   │
│   │   │   └── admin/
│   │   │       ├── controllers/
│   │   │       │   ├── searchUsers.ts
│   │   │       │   └── updateLimits.ts
│   │   │       ├── dtos/
│   │   │       │   └── updateLimits.ts
│   │   │       ├── services/
│   │   │       │   ├── searchUsers.ts
│   │   │       │   └── updateLimits.ts
│   │   │       └── route.ts
│   │   │
│   │   ├── config/
│   │   │   └── env.ts            # Loads .env once → exports typed config object
│   │   │
│   │   ├── constants/
│   │   │   ├── roles.ts          # USER, ADMIN
│   │   │   ├── limits.ts         # DEFAULT_UPLOAD_LIMIT, DEFAULT_SEARCH_LIMIT
│   │   │   └── enums.ts          # OTP purposes, etc.
│   │   │
│   │   ├── db/
│   │   │   ├── schema/
│   │   │   │   ├── users.ts
│   │   │   │   ├── otps.ts
│   │   │   │   ├── complaints.ts
│   │   │   │   └── complaintEmbeddings.ts
│   │   │   ├── migrations/       # Drizzle-generated SQL migrations
│   │   │   ├── dal/
│   │   │   │   ├── users.ts
│   │   │   │   ├── otps.ts
│   │   │   │   ├── complaints.ts
│   │   │   │   └── complaintEmbeddings.ts
│   │   │   └── drizzle.ts        # Drizzle client instance
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.ts           # JWT cookie extraction + verification
│   │   │   ├── adminOnly.ts      # Role check for ADMIN routes
│   │   │   └── errorHandler.ts   # Global error handler
│   │   │
│   │   ├── utils/
│   │   │   ├── jwt.ts            # sign / verify helpers
│   │   │   ├── hash.ts           # bcrypt wrappers (cost 12)
│   │   │   ├── envelope.ts       # Response envelope helper
│   │   │   ├── openai.ts         # OpenAI client (Responses API + Embeddings)
│   │   │   ├── supabase.ts       # Supabase client (Storage)
│   │   │   └── resend.ts         # Resend email client
│   │   │
│   │   └── app.ts                # Express app bootstrap + route mounting
│   │
│   ├── drizzle.config.ts         # Drizzle Kit configuration
│   ├── tsconfig.json
│   ├── .env
│   ├── .env.example
│   └── package.json
│
├── prompt.md
├── product.md
└── architecture.md
```

> **File naming rule**: Plain names inside typed folders (e.g., `controllers/login.ts`, not `login.controller.ts`). **No `index.ts` barrel files anywhere.**

---

## 3. Backend Architecture

### 3.1 Layered MVC Pattern

Every request flows through a strict layer chain:

```
HTTP Request
    ↓
  Route          → Maps method + path to controller
    ↓
  Controller     → Validates DTO (zod), calls service, sends envelope response
    ↓
  Service        → Business logic, orchestrates DAL calls + external APIs
    ↓
  DAL            → Drizzle queries against Supabase Postgres
    ↓
  Database       → Supabase Postgres (+ pgvector for embeddings)
```

### 3.2 Config Management

All environment variables are loaded **once** in `src/config/env.ts` using `dotenv` and exported as a single typed object. No other file reads `process.env` directly.

```typescript
// src/config/env.ts
import 'dotenv/config';

export const config = {
  port: parseInt(process.env.PORT!),
  databaseUrl: process.env.DATABASE_URL!,
  supabaseUrl: process.env.SUPABASE_URL!,
  supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY!,
  supabaseStorageBucket: process.env.SUPABASE_STORAGE_BUCKET!,
  jwtSecret: process.env.JWT_SECRET!,
  openaiApiKey: process.env.OPENAI_API_KEY!,
  resendApiKey: process.env.RESEND_API_KEY!,
  emailFrom: process.env.EMAIL_FROM!,
} as const;
```

### 3.3 CORS Configuration

Allowed origins are **hardcoded in config** (not from env):

```typescript
const allowedOrigins = [
  'http://localhost:6001',
  'http://127.0.0.1:6001',
  '<DOMAIN_PLACEHOLDER>',       // Replace with production domain
];
```

### 3.4 API Response Envelope

Every API response follows this structure:

```typescript
interface ApiResponse {
  status: 'success' | 'fail';
  message: string;
  data?: any;
  error?: any;
}
```

### 3.5 Build & Run

```bash
# Development
npm run dev          # ts-node / tsx with watch

# Production
npm run build        # tsc → compiles to dist/
npm run start        # node dist/app.js
```

- **ESM modules** — all files use `import`/`export`, `"type": "module"` in `package.json`.
- TypeScript compiles to `dist/` via `tsc`.

---

## 4. Database Architecture

### 4.1 Schema Overview

```
┌────────────┐       ┌────────────────────┐       ┌──────────────────────┐
│   users    │       │    complaints      │       │ complaint_embeddings │
├────────────┤       ├────────────────────┤       ├──────────────────────┤
│ id (PK)    │◄──┐   │ id (PK)            │◄──────│ id (PK)              │
│ name       │   │   │ user_id (FK→users) │       │ complaint_id (FK)    │
│ email (UQ) │   └───│ title              │       │ embedding vec(1536)  │
│ password   │       │ comp_name          │       │ created_at           │
│ role       │       │ comp_contact       │       │ updated_at           │
│ verified   │       │ incident_datetime  │       └──────────────────────┘
│ upload_lim │       │ incident_place     │
│ search_lim │       │ accused_details    │
│ uploads_   │       │ description        │
│   used     │       │ ipc_sections[]     │
│ searches_  │       │ image_url          │
│   used     │       │ created_at         │
│ created_at │       │ updated_at         │
│ updated_at │       └────────────────────┘
├────────────┤
│            │
│   ┌───────────┐
│   │   otps    │
│   ├───────────┤
└──►│ id (PK)   │
    │ user_id   │
    │ otp_hash  │
    │ purpose   │
    │ expires_at│
    │ created_at│
    └───────────┘
```

### 4.2 Table Definitions

#### `users`

| Column | Type | Constraints |
|--------|------|-------------|
| id | serial | PK |
| name | varchar | NOT NULL |
| email | varchar | UNIQUE, NOT NULL |
| password_hash | varchar | NOT NULL |
| role | varchar | `'USER'` \| `'ADMIN'`, DEFAULT `'USER'` |
| verified | boolean | DEFAULT `false` |
| upload_limit | integer | DEFAULT `5` |
| search_limit | integer | DEFAULT `10` |
| uploads_used | integer | DEFAULT `0` |
| searches_used | integer | DEFAULT `0` |
| created_at | timestamp | DEFAULT `now()` |
| updated_at | timestamp | DEFAULT `now()` |

#### `otps`

| Column | Type | Constraints |
|--------|------|-------------|
| id | serial | PK |
| user_id | integer | FK → `users.id` |
| otp_hash | varchar | NOT NULL |
| purpose | varchar | `'signup'` \| `'reset'` |
| expires_at | timestamp | NOT NULL |
| created_at | timestamp | DEFAULT `now()` |

#### `complaints`

| Column | Type | Constraints |
|--------|------|-------------|
| id | serial | PK |
| user_id | integer | FK → `users.id` |
| title | varchar | NOT NULL, ≤12 chars |
| complainant_name | varchar | NOT NULL |
| complainant_contact | text | NOT NULL |
| incident_datetime | timestamp | NOT NULL |
| incident_place | varchar | NOT NULL |
| accused_details | text | |
| description | text | NOT NULL |
| ipc_sections | text[] | NOT NULL |
| image_url | varchar | NOT NULL |
| created_at | timestamp | DEFAULT `now()` |
| updated_at | timestamp | DEFAULT `now()` |

#### `complaint_embeddings`

| Column | Type | Constraints |
|--------|------|-------------|
| id | serial | PK |
| complaint_id | integer | FK → `complaints.id`, UNIQUE |
| embedding | vector(1536) | NOT NULL |
| created_at | timestamp | DEFAULT `now()` |
| updated_at | timestamp | DEFAULT `now()` |

### 4.3 ORM: Drizzle

- Schema defined in `src/db/schema/*.ts`.
- Migrations generated via Drizzle Kit and stored in `src/db/migrations/`.
- Database connection via Drizzle's Postgres driver pointing at `DATABASE_URL`.

### 4.4 Vector Search (pgvector)

- **Extension**: `pgvector` enabled on Supabase Postgres.
- **Embedding model**: OpenAI `text-embedding-3-small` (1536 dimensions).
- **Stored content**: Embedding of `description + IPC sections` concatenated.
- **Similarity metric**: Cosine distance (`<=>` operator).
- **Search flow**: Query text → embed via OpenAI → `ORDER BY embedding <=> query_embedding LIMIT n`.

---

## 5. Frontend Architecture

### 5.1 Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript |
| Bundler | Vite |
| Styling | Tailwind CSS v4 (minimal `global.css`) |
| Components | shadcn/ui (grey theme) |
| HTTP Client | Axios (single instance) |
| State | React Context (auth, theme) — no external state library |
| Forms | Plain HTML forms — no form library |
| Animations | framer-motion (sparingly) |
| Toasts | shadcn toast |

### 5.2 State Management

**Global state via React Context only:**

- **AuthContext**: Current user object, loading state, `login()`, `logout()`, `refetch()` methods. Bootstrapped on mount via `GET /auth/me`.
- **ThemeContext**: Light/dark toggle. Light is default.

**Local state:**

- Component-level `useState` for form fields, UI toggles, loading states.
- localStorage autosave for in-progress complaint review drafts.

### 5.3 Routing

```
/login              → Login.tsx
/signup             → Signup.tsx
/verify             → Verify.tsx
/forgot-password    → ForgotPassword.tsx
/                   → Home.tsx         (protected)
/complaints         → Complaints.tsx   (protected)
/complaints/:id     → ComplaintDetail  (protected)
/profile            → Profile.tsx      (protected)
/settings           → Settings.tsx     (protected)
/admin              → Admin.tsx        (protected, admin only)
```

### 5.4 API Layer

- **Single axios instance** in `src/lib/axios.ts`:
  - `baseURL` from `VITE_API_BASE_URL`
  - `withCredentials: true`
- **All endpoints** defined in `src/constants/endpoints.ts`.
- **All API call functions** in `src/APIs/` — grouped by domain (`auth.ts`, `complaints.ts`, `admin.ts`).
- No direct axios calls from components; always go through `APIs/` functions.

### 5.5 Component Organization

```
components/
├── ui/                    # App-specific reusable UI
│   ├── SearchBox.tsx       # Search input with AI toggle
│   ├── Sidebar.tsx         # Navigation sidebar
│   ├── Table.tsx           # Data table for complaints
│   ├── RoleChip.tsx        # User/Admin badge
│   └── ...
├── form/                  # Form-level primitives
│   ├── Input.tsx
│   ├── Button.tsx
│   ├── Select.tsx
│   ├── MultiSelectTags.tsx # IPC section tags (add/remove)
│   └── ...
```

---

## 6. Authentication Architecture

### 6.1 Flow Diagram

```
┌──────────┐    POST /auth/signup     ┌──────────┐
│  Client  │ ──────────────────────►  │  Server  │
│          │                          │          │
│          │    Email with OTP        │          │──► Resend
│          │  ◄─────────────────────  │          │
│          │                          │          │
│          │    POST /auth/verify-otp │          │
│          │ ──────────────────────►  │          │
│          │                          │          │──► bcrypt compare OTP
│          │    { verified: true }    │          │
│          │  ◄─────────────────────  │          │
│          │                          │          │
│          │    POST /auth/login      │          │
│          │ ──────────────────────►  │          │
│          │                          │          │──► bcrypt compare password
│          │    Set-Cookie: auth=jwt  │          │──► JWT sign (userId, role)
│          │  ◄─────────────────────  │          │
│          │                          │          │
│          │    GET /auth/me          │          │
│          │    Cookie: auth=jwt      │          │
│          │ ──────────────────────►  │          │──► JWT verify
│          │    { user }              │          │
│          │  ◄─────────────────────  │          │
└──────────┘                          └──────────┘
```

### 6.2 JWT Details

| Property | Value |
|----------|-------|
| Algorithm | HS256 (default) |
| Expiry | 1 day |
| Claims | `{ userId: number, role: 'USER' \| 'ADMIN' }` |
| Cookie Name | `authorization` |
| Cookie Flags | `httpOnly: true`, `secure: true`, `sameSite: 'none'` |

### 6.3 Middleware Chain

```
Request → cookieParser → authMiddleware (extract + verify JWT) → route handler
                              ↓ (on admin routes)
                         adminOnlyMiddleware (check role === 'ADMIN')
```

---

## 7. AI Integration Architecture

### 7.1 Image Parsing Pipeline

```
User uploads image
       ↓
Multer receives multipart file
       ↓
Upload original to Supabase Storage → get image_url
       ↓
Convert image buffer to base64 data-URL
       ↓
Call OpenAI Responses API:
  ┌─────────────────────────────────────────────────────┐
  │ client.responses.create({                           │
  │   model: 'gpt-5.4-mini',                           │
  │   input: [{                                         │
  │     role: 'user',                                   │
  │     content: [                                      │
  │       { type: 'input_text', text: <system_prompt> },│
  │       { type: 'input_image',                        │
  │         image_url: 'data:<mime>;base64,<b64>' }     │
  │     ]                                               │
  │   }]                                                │
  │ })                                                  │
  │                                                     │
  │ Read: response.output_text → parse JSON             │
  └─────────────────────────────────────────────────────┘
       ↓
Extract: 7 FIR fields + IPC section numbers + title (≤12 chars)
       ↓
Return draft to frontend for review
       ↓
Deduct 1 from user's uploads_used (on success)
```

### 7.2 Embedding Pipeline

```
On complaint save/update:
       ↓
Concatenate: description + " " + ipc_sections.join(", ")
       ↓
Call OpenAI Embeddings API:
  ┌─────────────────────────────────────────────────────┐
  │ client.embeddings.create({                          │
  │   model: 'text-embedding-3-small',                  │
  │   input: concatenated_text                          │
  │ })                                                  │
  │                                                     │
  │ → 1536-dimensional float vector                     │
  └─────────────────────────────────────────────────────┘
       ↓
Upsert into complaint_embeddings table
```

### 7.3 Semantic Search Pipeline

```
User enters query + toggles AI search ON
       ↓
Check searches_used < search_limit (else 403)
       ↓
Embed query via text-embedding-3-small → query_vector
       ↓
SQL: SELECT * FROM complaints c
     JOIN complaint_embeddings ce ON c.id = ce.complaint_id
     ORDER BY ce.embedding <=> query_vector
     LIMIT n
       ↓
Increment searches_used (on success, including 0 results)
       ↓
Return results
```

---

## 8. API Design

### 8.1 Route Map

All routes prefixed with `/api`. Authentication via `authorization` cookie.

#### Auth Routes (`/api/auth`)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/signup` | — | Register new user |
| POST | `/verify-otp` | — | Verify email OTP |
| POST | `/resend-otp` | — | Resend verification OTP |
| POST | `/login` | — | Login, sets JWT cookie |
| POST | `/logout` | ✓ | Clear JWT cookie |
| POST | `/forgot-password` | — | Send password reset OTP |
| POST | `/reset-password` | — | Reset password with OTP |
| GET | `/me` | ✓ | Get current user from JWT |

#### Complaint Routes (`/api/complaints`)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/parse` | ✓ | Upload image → AI parse → return draft; deducts 1 upload |
| POST | `/` | ✓ | Save complaint + generate embedding |
| GET | `/` | ✓ | List own complaints (user) or all (admin) |
| GET | `/search` | ✓ | `?q=&ai=true\|false`; keyword or semantic search |
| GET | `/:id` | ✓ | Get single complaint |
| PATCH | `/:id` | ✓ | Update complaint (owner/admin); re-embeds |
| DELETE | `/:id` | ✓ | Delete complaint + embedding (owner/admin) |

#### Admin Routes (`/api/admin`)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/users` | Admin | `?query=` search users by email/name |
| PATCH | `/users/:id/limits` | Admin | Set absolute `uploadLimit` / `searchLimit` |

### 8.2 Error Handling

- **Validation errors**: zod parse failures → `400` with field-level messages.
- **Auth errors**: Invalid/expired JWT → `401`. Unverified user → `403`.
- **Quota exceeded**: `403` with `status: 'fail'` and descriptive message.
- **Not found**: `404` with resource identifier.
- **Global error handler**: Catches unhandled errors → `500` with generic message (no stack in production).

All errors follow the standard envelope: `{ status: 'fail', message: '...', error?: '...' }`.

---

## 9. External Services

### 9.1 Supabase

| Service | Usage |
|---------|-------|
| **Postgres** | Primary database via Drizzle ORM |
| **pgvector** | Vector similarity search for semantic queries |
| **Storage** | Original complaint image storage |

Access via `SUPABASE_URL` + `SUPABASE_SERVICE_KEY` (backend only, server-side service role).

### 9.2 OpenAI

| Model | Purpose | API |
|-------|---------|-----|
| `gpt-5.4-mini` | Image → FIR parsing, IPC suggestions, title generation | Responses API |
| `text-embedding-3-small` | 1536-dim embeddings for semantic search | Embeddings API |

### 9.3 Resend

| Purpose | Details |
|---------|---------|
| OTP delivery | 6-digit codes for signup verification and password reset |
| Sender | Configured via `EMAIL_FROM` env var |

---

## 10. Security Considerations

| Area | Approach |
|------|----------|
| **Passwords** | bcrypt, cost factor 12 |
| **OTPs** | bcrypt-hashed, 5-minute TTL |
| **JWT** | httpOnly + secure + sameSite:none cookie; 1-day expiry |
| **CORS** | Explicit origin whitelist; `credentials: true` |
| **Input Validation** | zod schemas on all request bodies |
| **Authorization** | Middleware-enforced role checks; owner-or-admin for mutations |
| **API Keys** | Server-side only; never exposed to frontend |
| **File Uploads** | Server-side validation; stored in Supabase Storage (not local filesystem) |
| **SQL Injection** | Prevented by Drizzle ORM parameterized queries |

---

## 11. Deployment Architecture

```
                    ┌─────────────┐
                    │   Vercel    │
                    │  (Frontend) │
                    │  Port: 443  │
                    └──────┬──────┘
                           │ HTTPS
                           ▼
                    ┌─────────────┐
                    │  Render /   │
                    │  Railway    │
                    │  (Backend)  │
                    │  Port: 7001 │
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
        ┌──────────┐ ┌──────────┐ ┌──────────┐
        │ Supabase │ │  OpenAI  │ │  Resend  │
        │ Postgres │ │   API    │ │  Email   │
        │ Storage  │ │          │ │          │
        └──────────┘ └──────────┘ └──────────┘
```

### Environment Variables

#### Backend (`.env`)

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (7001) |
| `DATABASE_URL` | Supabase Postgres connection string |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_KEY` | Supabase service role key |
| `SUPABASE_STORAGE_BUCKET` | Storage bucket name for complaint images |
| `JWT_SECRET` | Secret for signing JWTs |
| `OPENAI_API_KEY` | OpenAI API key |
| `RESEND_API_KEY` | Resend API key |
| `EMAIL_FROM` | Sender email address |

#### Frontend (`.env`)

| Variable | Description |
|----------|-------------|
| `VITE_API_BASE_URL` | Backend API base URL (e.g., `http://localhost:7001/api`) |

---

## 12. Development Workflow

```bash
# Clone and install
git clone <repo>

# Backend
cd backend
cp .env.example .env        # Fill in values
npm install
npm run dev                  # Development with watch mode

# Frontend
cd frontend
cp .env.example .env        # Set VITE_API_BASE_URL
npm install
npm run dev                  # Vite dev server on port 6001

# Database
cd backend
npx drizzle-kit generate    # Generate migrations from schema changes
npx drizzle-kit migrate     # Apply migrations to Supabase Postgres
```

### Ports

| Service | Port |
|---------|------|
| Frontend (Vite) | 6001 |
| Backend (Express) | 7001 |

---

## 13. Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| **No `index.ts` barrel files** | Explicit imports improve traceability and avoid circular dependencies |
| **Plain names in typed folders** | `controllers/login.ts` is clearer than `login.controller.ts` when the folder already provides context |
| **Single config entry point** | Prevents scattered `process.env` reads; single source of truth for all configuration |
| **Cookie-based JWT (no refresh)** | Simpler auth flow for MVP; httpOnly prevents XSS token theft |
| **No pagination** | Sufficient for MVP scale; can be added later without API changes |
| **React Context over Redux** | Only two global concerns (auth, theme); Context is sufficient and lighter |
| **Plain HTML forms** | Reduces bundle size and complexity; forms are simple enough to not need a library |
| **Hardcoded CORS origins** | Avoids accidental wildcard in env; production domains are known at build time |
| **Separate embeddings table** | Keeps the complaints table clean; allows independent embedding lifecycle |
| **ESM throughout** | Modern standard; aligns with ecosystem direction |
