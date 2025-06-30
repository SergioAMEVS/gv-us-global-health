# US Global Health Funding Cuts - GV Frontend

This is the frontend repository for the **US Global Health Funding Cuts** project, developed with **Next.js 14.2.30 (App Router)** and optimized for Static Site Generation (SSG). This project is designed to be served by a Django backend, leveraging separation of concerns for efficient and scalable development.

---

## 🚀 Getting Started

Follow these steps to get the project up and running in your development environment.

### Prerequisites

Make sure you have the following installed:

- **Node.js** (version 18.x or higher recommended)
- **npm** (comes with Node.js) or **Yarn** / **pnpm** / **Bun**

### Installation

Clone the repository:

```bash
git clone https://github.com/Product-Engineering-Team/gv-us-global-health-funding-cuts
cd us-global-health-funding-cuts
```

Install the project dependencies:

```bash
npm install
# or
pnpm install
# or
yarn install
# or
bun install
```

This will install all dependencies listed in `package.json`, including Next.js, Material-UI, Zustand, and development tools.

#### Prepare Git Hooks (Husky):

```bash
npm run prepare
```

This command sets up the Git hooks (pre-commit and commit-msg) using Husky.

---

## 🖥 Local Development

To start the Next.js local development server:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application. Code changes will update automatically.

---

## 📂 Project Structure

The project follows the Next.js 14 App Router convention and uses a `src/` directory for better organization.

```
us-global-health-funding-cuts/
├── .husky/                  # Git hooks (pre-commit, commit-msg) to enforce standards
├── public/                  # Static assets served directly (favicon, images, etc.)
│   └── ...
├── src/                     # Main source code directory
│   ├── app/                 # Application routes and global App Router UI files
│   │   |
│   │   ├── (example)/          # Grouping folder: For authentication routes (e.g., `/login`)
│   │   │   ├── layout.tsx   # Specific layout for authentication routes
│   │   │   └── login/
│   │   │       └── page.tsx
│   │   ├── global-error.tsx # Fallback UI for errors not caught by segment-level error.tsx
│   │   ├── layout.tsx       # Root layout for the entire application (contains <html />, <body />)
│   │   ├── loading.tsx      # Global loading UI
│   │   └── not-found.tsx    # Custom 404 page
│   ├── components/          # Reusable React components
│   │   ├── ui/              # Generic UI components (Material-UI)
│   │   │   ├── theme.ts     # Material-UI theme configuration
│   │   │   └── MuiProvider.tsx # Theme provider for Material-UI
│   │   └── common/          # Project-specific components (Header, Footer, etc.)
│   ├── lib/                 # Utilities, helper functions, configurations
│   │   ├── store/           # Global state store files (Zustand)
│   │   |    └── useGlobalStore.ts # Example of a Zustand store
│   │   |
│   │   └── utils.ts         # General utility functions
│   └── styles/              # Global style files
│       └── globals.css
├── .env.local               # Environment variables (NOT versioned)
├── .eslintrc.json           # ESLint configuration (code linter)
├── .gitignore               # Files and directories ignored by Git
├── .prettierignore          # Files and directories ignored by Prettier
├── .prettierrc.json         # Prettier configuration (code formatter)
├── commitlint.config.cjs    # Conventional Commits configuration
├── next-env.d.ts            # Next.js type definitions
├── next.config.js           # Next.js configuration (SSG, images, etc.)
├── package.json             # Project dependencies and scripts
├── pnpm-lock.yaml           # Dependency lock file (if using pnpm)
├── README.md                # This file
└── tsconfig.json            # TypeScript configuration
```

---

## 🛠 Key Tools & Conventions

This boilerplate is configured with the following tools and conventions to ensure consistent and high-quality development:

### 1. Next.js 14 (App Router & SSG)

- **App Router:** New file-system based routing system.
- **Static Site Generation (SSG):** Pages are pre-rendered to HTML at build time (`npm run build`), improving performance and SEO.
- **output: 'standalone':** Facilitates deployment with external servers like Django.
- **Data Fetching for SSG:** Uses `generateStaticParams` and fetch in Server Components to get data from the Django backend at build time.

### 2. Material-UI (MUI)

- **Design System:** Prebuilt React components following Material Design.
- **Theming:** Integrated with a `ThemeProvider` in `src/components/ui/MuiProvider.tsx` and a custom theme in `src/components/ui/theme.ts`.
- **'use client':** Components using MUI hooks or requiring interactivity must be Client Components.

### 3. Zustand

- **Global State Manager:** Lightweight library for client-side global state management.
- **Usage:** Zustand stores (like `src/store/useStore.ts`) are used in Client Components to share and reactively manipulate state in the browser.

### 4. ESLint and Prettier

- **ESLint:** Linter for JavaScript/TypeScript.
- **Prettier:** Code formatter.
- **Useful commands:**
  - Lint: `npm run lint:fix`
  - Format: `npm run format`

### 5. Husky and Conventional Commits

- **Husky:** Allows running scripts on Git hooks.
- **pre-commit:** Runs lint-staged before each commit.
- **commit-msg:** Validates commit messages according to Conventional Commits.
- **Valid examples:**
  - `feat: add new user registration flow`
  - `fix(auth): correct password reset bug`
  - `docs: update README with deployment instructions`
  - `chore: update dependencies`

---

> For more details, check each tool's official documentation.
