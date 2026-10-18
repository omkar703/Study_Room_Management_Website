# Study Room Management Frontend

## Overview
A modern, responsive web frontend for managing study rooms, built with **Next.js 16**, **React 19**, **Tailwind CSS**, and **Three.js** (via `@react-three/fiber` and `@react-three/drei`). The application provides authentication flows, a dashboard with floor‑plan visualizations, and student management pages.

## Tech Stack
- **Framework**: Next.js (App Router) – `next@16.2.6`
- **Language**: TypeScript
- **Styling**: Tailwind CSS (`tailwindcss@^4`)
- **3D Rendering**: Three.js with React bindings (`@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`)
- **UI**: Tailwind‑merge, clsx, lucide‑react, framer‑motion
- **Testing / Linting**: ESLint (`eslint@^9`)

## Prerequisites
- Node.js (v20 or later)
- npm, yarn, pnpm or bun (any package manager you prefer)

## Getting Started
```bash
# Clone the repository
git clone <repository‑url>
cd Study_Room_Management_website/frontend

# Install dependencies (choose your package manager)
npm install   # or yarn, pnpm, bun
```

## Development
Run the development server:
```bash
npm run dev   # or yarn dev, pnpm dev, bun dev
```
Open `http://localhost:3000` in your browser. The server supports hot‑reloading; edit any file under `src/` and see changes instantly.

## Building for Production
```bash
npm run build   # creates an optimized production build
npm start       # starts the built app locally
```

## Deploying to Vercel
The frontend is fully compatible with Vercel's automatic Next.js deployment.
1. Push the code to a Git provider (GitHub, GitLab, Bitbucket).
2. In the Vercel dashboard, click **"New Project"** and import the repository.
3. Vercel detects the Next.js framework automatically and sets the build command to `npm run build` and the output directory to `.next`.
4. Configure any required environment variables in the Vercel project settings (e.g., API endpoints for the backend).
5. Deploy – Vercel will build and host the site on a generated URL, with preview deployments for every pull request.

## Project Structure
```
frontend/
├─ public/                # Static assets (images, favicons)
├─ src/
│  ├─ app/                # Next.js App Router pages
│  │  ├─ dashboard/       # Dashboard layout and pages
│  │  │  ├─ floorplan/    # 3D floor‑plan visualisation page
│  │  │  └─ students/     # Student management page
│  │  ├─ login/           # Login page
│  │  ├─ signup/          # Signup page
│  │  └─ layout.tsx       # Global layout component
│  ├─ components/         # Reusable UI components
│  │  ├─ AuthInput.tsx
│  │  ├─ AuthLayout.tsx
│  │  ├─ DashboardShell.tsx
│  │  ├─ RoomScene.tsx    # 3D scene wrappers
│  │  └─ Shared.tsx
│  └─ globals.css        # Tailwind base styles
├─ next.config.ts         # Image remote patterns configuration
├─ package.json           # Project metadata and scripts
└─ tailwind.config.js    # Tailwind configuration
```

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/xyz`).
3. Make your changes and ensure the code passes linting (`npm run lint`).
4. Open a pull request with a clear description of the changes.

## License
This project is licensed under the MIT License – see the `LICENSE` file for details.
