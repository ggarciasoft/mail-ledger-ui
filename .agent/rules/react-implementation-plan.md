---
trigger: always_on
---

MailLedger UI — Unified Implementation Plan
1. Overview

MailLedger is a React-based web UI that provides a complete workflow from:
Gmail ingestion → AI extraction → user confirmation → financial records → API access.

The UI consumes 24 API endpoints and supports both individual users and developers.

2. Technology Stack
Core

React 18 + TypeScript

Vite

React Router

State Management

TanStack Query → server state (API data)

Zustand → client state (auth, UI preferences)

UI & Visualization

shadcn/ui (Radix + Tailwind)

Recharts (charts)

Lucide React (icons)

Forms & Validation

React Hook Form

Zod + @hookform/resolvers

3. Project Setup
npm create vite@latest mailledger-ui -- --template react-ts
cd mailledger-ui
npm install
npm install @tanstack/react-query zustand axios react-router-dom
npm install react-hook-form zod @hookform/resolvers
npm install recharts lucide-react
npx shadcn-ui@latest init

Environment Variables
VITE_API_URL=http://localhost:5000

4. API Coverage (24 Endpoints)
Authentication (8)

POST /api/auth/register

POST /api/auth/login

POST /api/auth/refresh

POST /api/auth/verify-email

POST /api/auth/request-password-reset

POST /api/auth/reset-password

POST /api/auth/change-password

GET /api/users/me

API Keys (3)

POST /api/api-keys

GET /api/api-keys

DELETE /api/api-keys/{id}

Dashboard (3)

GET /api/dashboard/overview

GET /api/dashboard/spending-trends

GET /api/dashboard/top-merchants

Emails (3)

GET /api/emails

GET /api/emails/{id}

GET /api/emails/statistics

Extraction Candidates (5)

GET /api/extraction-candidates

GET /api/extraction-candidates/{id}

POST /api/extraction-candidates/{id}/confirm

POST /api/extraction-candidates/{id}/reject

PUT /api/extraction-candidates/{id}

Financial Records (3)

GET /api/financial-records

GET /api/financial-records/{id}

GET /api/financial-records/statistics

Processing (2)

GET /api/processing/status

POST /api/processing/classify

POST /api/processing/extract

5. Authentication & Authorization (Phase 0)
Pages

/login

/register

/forgot-password

/reset-password?token=...

Components

LoginPage

RegisterPage

ForgotPasswordPage

ResetPasswordPage

ProtectedRoute

State (Zustand)

User profile

Access token

Refresh token

Persistent login

Token refresh logic

🔒 All non-auth routes are protected.

6. Layout & Shared Components
Layout

AppLayout

Sidebar navigation

Header (user menu, logout)

Breadcrumbs

Shared UI

DataTable (sorting, pagination, filters)

StatCard

StatusBadge

ConfidenceMeter

EmptyState

LoadingSkeleton

ErrorAlert

7. Phase 1 — Dashboard
Purpose

Main landing page showing system health and financial overview.

Components

DashboardPage

OverviewCards

SpendingTrendsChart

TopMerchantsChart

RecentActivityFeed

PeriodSelector (week/month/year)

Features

Real-time metrics

Interactive charts

Quick navigation to pending items

8. Phase 2 — Email Management
Purpose

View and inspect synced Gmail emails.

Components

EmailsPage

EmailFilters

EmailDetailModal

Features

Pagination (20/page)

Status filters (Pending, Classified, Extracted, Failed)

Search (subject, sender)

Sorting (date, status)

Classification results

Error details

9. Phase 3 — Extraction Candidates Workflow
Purpose

Human-in-the-loop confirmation of AI-extracted data.

Components

ExtractionCandidatesPage

CandidateReviewModal

ConfirmDialog

RejectDialog

Features

Side-by-side email + extracted data

Inline editing

Confidence indicators per field

Validation before confirmation

Rejection reasons

🚨 This is the trust-critical flow of the product.

10. Phase 4 — Financial Records
Purpose

Read-only source of truth for confirmed data.

Components

FinancialRecordsPage

RecordDetailModal

RecordStatisticsPanel

AdvancedFilters

Filters (8)

Date range

Amount min/max

Merchant

Currency

Source bank

Type

Sorting

Direction

Features

Immutable records

Statistics dashboard

Monthly trends

Drill-down to source email

11. Phase 5 — Processing Management
Purpose

Control and monitor batch AI jobs.

Components

ProcessingPage

TriggerJobDialog

ProgressIndicator

Features

Trigger classification

Trigger extraction

Batch size configuration

Real-time polling

Success / failure counts

12. Phase 6 — Settings
Components

SettingsPage

ProfileSection

ApiKeysSection

GmailSyncSection

GmailSyncDialog

Features

Change password

Create/revoke API keys

Manual Gmail sync

View sync history

Connection status

13. Routing Structure
/                         → Dashboard
/login                    → Login
/register                 → Register
/emails                   → Email list
/emails/:id               → Email detail (modal)
/extraction-candidates    → Candidate list
/extraction-candidates/:id→ Candidate review (modal)
/financial-records        → Records list
/financial-records/:id    → Record detail (modal)
/processing               → Processing
/settings                 → Settings

14. API Client & React Query
Axios Client

Base URL from env

Auth interceptor

Auto-refresh token handling

React Query

Caching

Background refetch

Optimistic updates

Polling for processing jobs

15. Implementation Timeline
Week 0 – Foundation

Project setup

Auth flow

Layout

API client

Week 1 – Dashboard

Metrics

Charts

Navigation

Week 2 – Emails & Extraction

Email list

Email detail

Extraction candidates

Review workflow

Week 3 – Financial Records

Records list

Filters

Statistics

Week 4 – Processing & Settings

Batch jobs

API keys

Gmail sync

Week 5 – Polish

Error handling

Loading states

Empty states

Responsive design

Testing

16. Design System (Unified)
Colors

Primary: Blue

Success: Green

Warning: Yellow

Danger: Red

Info: Purple

Typography

Inter (UI)

Fira Code (IDs, amounts)

Spacing

4px grid

Cards: 24px padding

Sections: 32px gap

17. Key Product Guarantees (UI-Enforced)

No auto-confirmation

Every financial record is user-approved

Clear confidence visualization

Full traceability to source email