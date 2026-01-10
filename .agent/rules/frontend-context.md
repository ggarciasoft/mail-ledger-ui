---
trigger: always_on
---

On each update to the API and the frontend, update the file frontend-context.md in the root of the project if necessary.

MailLedger Frontend UI - Context Documentation
Last Updated: 2026-01-10

Project Overview
MailLedger UI is a modern React-based single-page application (SPA) that provides a user interface for managing email-derived financial data. It connects to the MailLedger Backend API for all data operations.

Technology Stack
Core Framework
React 19.2.0 - UI library
TypeScript 5.9.3 - Type-safe JavaScript
Vite 7.2.4 - Build tool and dev server
Key Libraries
React Router DOM 7.12.0 - Client-side routing
TanStack React Query 5.90.16 - Server state management
Zustand 5.0.9 - Client state management
Axios 1.13.2 - HTTP client
React Hook Form 7.70.0 - Form management
Zod 4.3.5 - Schema validation
Recharts 3.6.0 - Data visualization
Lucide React 0.562.0 - Icon library
TailwindCSS 4.1.18 - Utility-first CSS framework
Project Structure
src/
├── components/              # 26 reusable UI components
│   ├── ApiKeysSection.tsx
│   ├── AppLayout.tsx
│   ├── BulkActionToolbar.tsx
│   ├── CandidateReviewModal.tsx
│   ├── ConfidenceMeter.tsx
│   ├── EmailDetailModal.tsx
│   ├── EmailFilters.tsx
│   ├── EmptyRulesState.tsx
│   ├── EmptyState.tsx
│   ├── GmailSyncSection.tsx
│   ├── OverviewCards.tsx
│   ├── Pagination.tsx
│   ├── PeriodSelector.tsx
│   ├── ProfileSection.tsx
│   ├── ProgressIndicator.tsx
│   ├── ProtectedRoute.tsx
│   ├── RecordDetailModal.tsx
│   ├── RecordFilters.tsx
│   ├── RejectDialog.tsx
│   ├── RuleCard.tsx
│   ├── RuleForm.tsx
│   ├── RulePatternInput.tsx
│   ├── SpendingTrendsChart.tsx
│   ├── StatCard.tsx
│   ├── StatusBadge.tsx
│   └── TopMerchantsChart.tsx
│
├── pages/                   # 11 page components
│   ├── DashboardPage.tsx
│   ├── EmailsPage.tsx
│   ├── ExtractionCandidatesPage.tsx
│   ├── FinancialRecordsPage.tsx
│   ├── ForgotPasswordPage.tsx
│   ├── LoginPage.tsx
│   ├── ProcessingPage.tsx
│   ├── RegisterPage.tsx
│   ├── ResetPasswordPage.tsx
│   ├── RulesPage.tsx
│   └── SettingsPage.tsx
│
├── lib/                     # 10 API service modules
│   ├── api-client.ts        # Axios instance with interceptors
│   ├── auth-api.ts          # Authentication endpoints
│   ├── dashboard-api.ts     # Dashboard statistics
│   ├── email-api.ts         # Email management
│   ├── extraction-candidate-api.ts  # Candidate operations
│   ├── financial-record-api.ts      # Financial records
│   ├── processing-api.ts    # Processing jobs
│   ├── query-client.ts      # React Query configuration
│   ├── rules-api.ts         # Rules management
│   └── settings-api.ts      # User settings & API keys
│
├── hooks/                   # 9 custom React hooks
│   ├── use-auth.ts          # Authentication mutations
│   ├── use-auto-login.ts    # Auto-login on mount
│   ├── use-dashboard.ts     # Dashboard data queries
│   ├── use-emails.ts        # Email queries
│   ├── use-extraction-candidates.ts  # Candidate queries & mutations
│   ├── use-financial-records.ts      # Financial record queries
│   ├── use-processing.ts    # Processing job mutations
│   ├── use-rules.ts         # Rules queries & mutations
│   └── use-settings.ts      # Settings queries & mutations
│
├── types/                   # 8 TypeScript type definitions
│   ├── auth.ts              # Auth types
│   ├── dashboard.ts         # Dashboard types
│   ├── email.ts             # Email types
│   ├── extraction-candidate.ts  # Candidate types
│   ├── financial-record.ts  # Financial record types
│   ├── processing.ts        # Processing types
│   ├── rule.ts              # Rule types
│   └── settings.ts          # Settings types
│
├── store/                   # Zustand state management
│   └── auth-store.ts        # Authentication state
│
├── assets/                  # Static assets
├── App.tsx                  # Root component with routing
├── main.tsx                 # Application entry point
└── index.css                # Global styles (TailwindCSS)
Application Routes
Public Routes
/login - User login
/register - User registration
/forgot-password - Password reset request
/reset-password - Password reset confirmation
Protected Routes (Require Authentication)
/ - Dashboard (overview statistics)
/emails - Email management
/extraction-candidates - Review and confirm/reject candidates
/financial-records - View confirmed financial records
/processing - Trigger batch processing jobs
/rules - Manage email filtering rules
/settings - User profile, Gmail sync, API keys
Key Features
1. Dashboard
Period-based statistics (7d, 30d, 90d, 1y, all)
Overview cards (total records, pending candidates, processed emails)
Spending trends chart (Recharts line chart)
Top merchants chart (Recharts bar chart)
2. Email Management
Paginated email list with filters (classification, date range, sender)
Email detail modal with full content view
Classification badges (Financial, Non-Financial, Unknown)
3. Extraction Candidates
Paginated candidate list with filters (status, type, date range, merchant)
Bulk selection with floating action toolbar
Bulk confirm/reject operations
Candidate review modal with editable fields
Confidence meter for AI extraction quality
Individual confirm/reject actions
4. Financial Records
Paginated record list with 8 filters:
Transaction type
Direction (in/out)
Date range
Merchant
Min/max amount
Currency
Source account
Record detail modal with source email drill-down
Immutable record badge
Sorting (date, amount, merchant)
5. Processing Management
Trigger classification job with batch size configuration
Trigger extraction job with batch size configuration
Real-time progress polling (React Query with refetch interval)
Progress indicators with success/failure counts
6. Rules Management
Rule cards with enable/disable toggle
Create/edit rule form with pattern inputs
Rule conditions (sender, subject, body, date range)
Rule actions (ignore, classify, extract, flag for review)
Empty state for first-time users
7. Settings
Profile section (view user info)
Gmail sync section (OAuth connection, manual sync)
API keys section (create, view, revoke keys)
State Management
Server State (React Query)
Automatic caching with stale-while-revalidate
Optimistic updates for mutations
Background refetching for real-time data
Query invalidation on mutations
Client State (Zustand)
Authentication state (user, tokens, login status)
Persistent storage (localStorage for tokens)
API Integration
Authentication Flow
User logs in → receives JWT access token + refresh token
Access token stored in Zustand store
Refresh token stored in localStorage
Axios interceptor adds Authorization: Bearer {token} to all requests
On 401 error → attempt token refresh → retry original request
On refresh failure → redirect to login
Request/Response Interceptors
Request: Add JWT token to headers
Response: Handle 401 errors with token refresh
Error: Transform API errors to user-friendly messages
UI/UX Patterns
Loading States
Skeleton loaders for initial data fetch
Spinner overlays for mutations
Disabled buttons during async operations
Error Handling
Toast notifications for errors (not yet implemented)
Inline error messages for form validation
Empty states for no data scenarios
Pagination
Server-side pagination with page size control
Page navigation (first, previous, next, last)
Total count display
Filtering
Client-side filter state (React Hook Form)
Server-side filter application (query params)
Clear filters button
Form Validation
Zod schemas for type-safe validation
React Hook Form for form state management
@hookform/resolvers for Zod integration
Real-time validation on blur/change
Styling Approach
TailwindCSS utility classes
Responsive design (mobile-first)
Dark mode support (not yet implemented)
Custom color palette (primary, secondary, accent)
Development Workflow
Start dev server:

npm run dev
Runs on http://localhost:5173

Build for production:

npm run build
Lint code:

npm run lint
Preview production build:

npm run preview
Environment Variables
Create a 
.env
 file in the root directory:

VITE_API_BASE_URL=http://localhost:5000/api
Recent Updates
Bulk Operations UI: Added floating toolbar for bulk confirm/reject with slide-up animation
Processing Page: Implemented batch job triggers with real-time progress tracking
Financial Records: Added 8-filter system with advanced filtering capabilities
Candidate Review: Enhanced modal with editable fields and confidence display
API Keys: Implemented API key management UI in settings
Email Verification: Added email verification flow (UI only, backend ready)
Future Enhancements
Dark mode toggle
Toast notifications for user feedback
Export functionality (CSV, PDF)
Advanced search with full-text search
Real-time updates via WebSockets
Mobile app (React Native)