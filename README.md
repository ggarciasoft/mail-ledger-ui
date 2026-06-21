# MailLedger UI

The web frontend for **MailLedger** — a single-page application that turns email into structured financial intelligence. Users connect their Gmail or Outlook mailbox, sync and classify messages, review AI-extracted transaction candidates, and manage an immutable financial ledger. It consumes the [MailLedger API](../mail-ledger-api) backend.

## Features

- **Marketing site** — landing, features, pricing, security, API docs, about, contact, and legal pages
- **Dashboard** — overview cards plus spending-trends and top-merchants charts
- **Email management** — connect Gmail/Outlook, sync, browse, and filter synced emails
- **Extraction review** — confirm/reject AI-extracted candidates with confidence meters and bulk actions
- **Financial records** — view, filter, categorize, and export confirmed transactions
- **Processing & jobs** — trigger classification/extraction and monitor jobs in real time (SignalR)
- **Rules & workflow** — configure email filtering rules and manual vs. scheduled automation
- **Integrations** — API keys, webhooks, and email connections
- **Subscriptions** — plans, usage tracking, and Stripe checkout
- **In-app tutorials** — guided tours via react-joyride

## Tech stack

- **React 19** + **TypeScript** + **Vite 7**
- **React Router 7** for routing
- **TanStack Query** for server state; **Zustand** (with `persist`) for auth/client state
- **Axios** HTTP client with JWT + refresh interceptors
- **@microsoft/signalr** for real-time job updates
- **React Hook Form** + **Zod** for forms and validation
- **Tailwind CSS 4** for styling, **lucide-react** for icons, **Recharts** for charts
- **cronstrue** + **moment-timezone** for workflow scheduling UI

## Prerequisites

- [Node.js](https://nodejs.org/) (with npm)
- A running [MailLedger API](../mail-ledger-api) backend

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at **http://localhost:5173** (Vite default).

### Environment variables

Create a `.env` file in the project root. No secrets live in the frontend — OAuth client IDs/secrets are handled server-side; the UI only calls backend endpoints.

| Key | Used for |
|-----|----------|
| `VITE_API_URL` | Base URL of the MailLedger API (also used for the SignalR hub) |
| `VITE_GMAIL_INBOX_URL` | Deep link to open a message in the Gmail web inbox |
| `VITE_OUTLOOK_INBOX_URL` | Deep link to open a message in the Outlook web inbox |

## Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `npm run dev` | `vite` | Start the dev server (http://localhost:5173) |
| `npm run build` | `tsc -b && vite build` | Type-check and produce a production build in `dist/` |
| `npm run lint` | `eslint .` | Lint all TypeScript/TSX files |
| `npm run preview` | `vite preview` | Serve the production build locally |

## Project structure

```
src/
├── App.tsx          # Root: QueryClient, TutorialProvider, route definitions
├── main.tsx         # Entry point
├── index.css        # Tailwind import + custom animations
├── pages/           # Route-level pages (marketing, auth, and protected app)
├── components/       # Reusable UI components
├── lib/             # API modules (one per backend domain), api-client, signalr-service
├── hooks/           # React Query data hooks (use-emails, use-jobs, use-auth, ...)
├── types/           # TypeScript domain models
├── store/           # Zustand stores (auth-store)
├── contexts/        # Tutorial context (react-joyride)
└── config/          # Per-page tutorial step definitions
```

### How it talks to the backend

`src/lib/api-client.ts` configures an Axios instance using `VITE_API_URL`. A request interceptor attaches the JWT access token from `localStorage`; a response interceptor automatically refreshes the token on `401` and retries, or logs the user out. Each backend domain has a matching `*-api.ts` module in `lib/` and a `use-*.ts` hook in `hooks/` built on TanStack Query. Real-time job updates arrive through `src/lib/signalr-service.ts`, which connects to `VITE_API_URL + '/hubs/jobs'`.

### Authentication

- **Email/password** login/registration with JWT access + refresh tokens (stored via Zustand + `localStorage`)
- **Google / Microsoft SSO** — backend-mediated OAuth, completed on dedicated callback pages with CSRF state validation
- **Email provider OAuth** — separate Gmail/Outlook connections for mailbox sync (on the Integrations page)
- `ProtectedRoute` guards authenticated routes and redirects unauthenticated users to `/login`

### Styling

Tailwind CSS v4 utility classes throughout, with global styles and custom animations in `src/index.css` and PostCSS configured in `postcss.config.js`. Icons come from `lucide-react`.

## Related projects

- **`mail-ledger-api`** — the .NET 9 backend this UI consumes.
- **`azure/`** — ARM templates for deploying the frontend and backend to Azure.
